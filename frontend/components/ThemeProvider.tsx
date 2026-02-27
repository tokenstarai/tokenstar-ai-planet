'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

/**
 * 主题切换规则：
 * - 初次访问：根据当前时间决定（06:00-18:00 浅色，18:00-06:00 深色）
 * - 手动切换：立即生效，保存到 localStorage（key: tokenstar_theme）
 *   手动切换后，保持该主题直到下一个定时切换点（06:00 或 18:00）
 *   到达定时切换点后，恢复自动时间规则
 * - 自动切换：每天 06:00 切浅色，18:00 切深色
 */
function getAutoTheme(): Theme {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
}

function getNextSwitchTime(): Date {
  const now = new Date()
  const hour = now.getHours()
  const next = new Date(now)
  if (hour >= 6 && hour < 18) {
    // 当前是白天，下次切换是今天 18:00
    next.setHours(18, 0, 0, 0)
  } else {
    // 当前是夜晚，下次切换是明天 06:00
    if (hour >= 18) {
      next.setDate(next.getDate() + 1)
    }
    next.setHours(6, 0, 0, 0)
  }
  return next
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  const manualOverrideRef = useRef<boolean>(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const applyTheme = useCallback((t: Theme) => {
    setThemeState(t)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      if (t === 'dark') {
        root.classList.add('dark')
        root.classList.remove('light')
      } else {
        root.classList.remove('dark')
        root.classList.add('light')
      }
    }
  }, [])

  const scheduleNextAutoSwitch = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const nextTime = getNextSwitchTime()
    const delay = nextTime.getTime() - Date.now()
    timerRef.current = setTimeout(() => {
      // 到达定时切换点，清除手动覆盖，恢复自动规则
      manualOverrideRef.current = false
      localStorage.removeItem('tokenstar_theme_manual')
      const autoTheme = getAutoTheme()
      applyTheme(autoTheme)
      localStorage.setItem('tokenstar_theme', autoTheme)
      scheduleNextAutoSwitch()
    }, delay)
  }, [applyTheme])

  useEffect(() => {
    // 初始化主题
    const saved = localStorage.getItem('tokenstar_theme') as Theme | null
    const isManual = localStorage.getItem('tokenstar_theme_manual') === 'true'

    let initialTheme: Theme
    if (saved && isManual) {
      // 有手动设置的主题
      initialTheme = saved
      manualOverrideRef.current = true
    } else {
      // 按时间自动决定
      initialTheme = getAutoTheme()
      localStorage.setItem('tokenstar_theme', initialTheme)
    }

    applyTheme(initialTheme)
    setMounted(true)
    scheduleNextAutoSwitch()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [applyTheme, scheduleNextAutoSwitch])

  const setTheme = useCallback((t: Theme) => {
    manualOverrideRef.current = true
    localStorage.setItem('tokenstar_theme', t)
    localStorage.setItem('tokenstar_theme_manual', 'true')
    applyTheme(t)
    scheduleNextAutoSwitch()
  }, [applyTheme, scheduleNextAutoSwitch])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  // 防止 SSR 闪烁：在 hydration 完成前隐藏
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme, setTheme }}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
