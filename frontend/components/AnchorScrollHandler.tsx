'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * AnchorScrollHandler
 *
 * 全局锚点跳转修复组件，挂载在 layout.tsx 中。
 *
 * 解决问题：
 * 1. Next.js App Router 跨页跳转时，hash 滚动在页面渲染前触发 → 定位到顶部
 * 2. fixed navbar（64px）遮挡锚点内容
 *
 * 方案：pathname 变化后延迟重试，等目标元素渲染完成再精确滚动
 */
const NAVBAR_HEIGHT = 80 // 与 globals.css scroll-padding-top 保持一致

export function AnchorScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.replace('#', '')
    let attempts = 0
    const maxAttempts = 15 // 最多等 1.5 秒

    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (!el) return false

      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      return true
    }

    // 首次立即尝试（同页内锚点场景）
    if (scrollToTarget()) return

    // 跨页跳转：轮询等待目标元素出现
    const timer = setInterval(() => {
      attempts++
      if (scrollToTarget() || attempts >= maxAttempts) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [pathname])

  return null
}
