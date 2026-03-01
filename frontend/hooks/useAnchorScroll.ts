'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * useAnchorScroll
 *
 * 解决 Next.js App Router 下跨页锚点跳转定位不准的问题：
 * 1. 路由切换后浏览器 hash 滚动往往在页面渲染前触发，导致定位到顶部
 * 2. fixed navbar（64px）会遮挡锚点内容
 *
 * 方案：监听 pathname 变化，延迟执行手动滚动，补偿 navbar 高度
 */
const NAVBAR_HEIGHT = 80 // px，与 globals.css scroll-padding-top 保持一致

export function useAnchorScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // 只在有 hash 时处理
    const hash = window.location.hash
    if (!hash) return

    const id = hash.replace('#', '')

    // 尝试多次，等待目标元素渲染完成（最多重试 10 次，每次间隔 100ms）
    let attempts = 0
    const maxAttempts = 10

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
        window.scrollTo({ top, behavior: 'smooth' })
        return true
      }
      return false
    }

    // 首次立即尝试（同页内锚点）
    if (tryScroll()) return

    // 跨页跳转：等待渲染后重试
    const interval = setInterval(() => {
      attempts++
      if (tryScroll() || attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [pathname])
}
