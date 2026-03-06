'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   类型定义
───────────────────────────────────────────── */
type AnimationType = 'typewriter' | 'fly-in-left' | 'fly-in-bottom';

interface SlideConfig {
  key: string;
  darkSrc: string;
  lightSrc: string;
  tag: string;
  title: string[];
  subtitle: string;
  animation: AnimationType;
  accentColor: string;
}

/* ─────────────────────────────────────────────
   幻灯片内容配置
───────────────────────────────────────────── */
const SLIDES: SlideConfig[] = [
  {
    key: 'agent',
    darkSrc: '/banners/hero/agent-dark.webp',
    lightSrc: '/banners/hero/agent-light.webp',
    tag: 'ENTERPRISE AI PLATFORM',
    title: ['让 AI 成为每个部门的', '超级管理 Agent'],
    subtitle: '覆盖销售、财务、HR、运营等全部门管理场景',
    animation: 'typewriter',
    accentColor: '#38bdf8',
  },
  {
    key: 'flow',
    darkSrc: '/banners/hero/flow-dark.webp',
    lightSrc: '/banners/hero/flow-light.webp',
    tag: 'INTELLIGENT WORKFLOW',
    title: ['从销售到供应链，从财务到 HR，全覆盖'],
    subtitle: '一个平台连接企业所有业务流，数据驱动每个决策',
    animation: 'fly-in-left',
    accentColor: '#a78bfa',
  },
  {
    key: 'path',
    darkSrc: '/banners/hero/path-dark.webp',
    lightSrc: '/banners/hero/path-light.webp',
    tag: 'MEASURABLE TRANSFORMATION',
    title: ['可落地·可量化，可持续的 AI 转型路径'],
    subtitle: '从 PoC 试点到规模化部署，每一步都有数据支撑',
    animation: 'fly-in-bottom',
    accentColor: '#34d399',
  },
];

/* ─────────────────────────────────────────────
   Hooks
───────────────────────────────────────────── */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function useIsDark(): boolean | null {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setIsDark(el.classList.contains('dark'));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return isDark;
}

/* ─────────────────────────────────────────────
   打字机动效组件（Frame 1 专用）
   效果：标签淡入 → 第一行逐字打出 → 第二行逐字打出（带光标）
         → 光扫描线从左到右扫过标题 → 副标题淡入上移
───────────────────────────────────────────── */
interface TypewriterTextProps {
  slide: SlideConfig;
  active: boolean;
  isDark: boolean;
  animKey: number;
}

function TypewriterText({ slide, active, isDark, animKey }: TypewriterTextProps) {
  const fullText = slide.title.join(''); // 合并两行用于计算总字数
  const line1 = slide.title[0];
  const line2 = slide.title[1];
  const totalChars = line1.length + line2.length;

  const [charCount, setCharCount] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [scanPhase, setScanPhase] = useState<'idle' | 'scanning' | 'done'>('idle');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAll = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!active) {
      clearAll();
      setCharCount(0);
      setShowCursor(false);
      setShowSubtitle(false);
      setShowTag(false);
      setScanPhase('idle');
      return;
    }

    // 重置
    setCharCount(0);
    setShowCursor(false);
    setShowSubtitle(false);
    setShowTag(false);
    setScanPhase('idle');

    // 1. 标签淡入
    timerRef.current = setTimeout(() => {
      setShowTag(true);

      // 2. 光标出现
      timerRef.current = setTimeout(() => {
        setShowCursor(true);

        // 3. 逐字打出（每字约 55ms，中文字符）
        let count = 0;
        intervalRef.current = setInterval(() => {
          count++;
          setCharCount(count);
          if (count >= totalChars) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;

            // 4. 打完后光标再闪烁 0.8s，然后消失，触发扫光
            timerRef.current = setTimeout(() => {
              setShowCursor(false);
              setScanPhase('scanning');

              // 5. 扫光结束后副标题淡入
              timerRef.current = setTimeout(() => {
                setScanPhase('done');
                setShowSubtitle(true);
              }, 900);
            }, 800);
          }
        }, 55);
      }, 300);
    }, 150);

    return clearAll;
  }, [active, animKey, totalChars, clearAll]);

  // 计算当前显示的文字
  const displayLine1 = line1.slice(0, Math.min(charCount, line1.length));
  const displayLine2 = charCount > line1.length ? line2.slice(0, charCount - line1.length) : '';
  const cursorOnLine = charCount <= line1.length ? 1 : 2;

  const tagColor = isDark ? 'text-sky-400' : 'text-blue-600';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const subtitleColor = isDark ? 'text-slate-300' : 'text-gray-600';
  const accentStyle: React.CSSProperties = {
    color: slide.accentColor,
    textShadow: isDark ? `0 0 24px ${slide.accentColor}80, 0 0 8px ${slide.accentColor}40` : 'none',
    background: isDark ? `linear-gradient(to right, ${slide.accentColor}, #fff)` : `linear-gradient(to right, ${slide.accentColor}, #000)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // 扫光线样式
  const scanLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-4px',
    bottom: '-4px',
    width: '3px',
    background: `linear-gradient(to bottom, transparent 0%, ${slide.accentColor} 40%, #ffffff 50%, ${slide.accentColor} 60%, transparent 100%)`,
    boxShadow: `0 0 16px 4px ${slide.accentColor}80`,
    borderRadius: '2px',
    pointerEvents: 'none',
    zIndex: 20,
    left: scanPhase === 'idle' ? '-6px' : scanPhase === 'scanning' ? 'calc(100% + 6px)' : 'calc(100% + 6px)',
    opacity: scanPhase === 'scanning' ? 1 : 0,
    transition: scanPhase === 'scanning'
      ? 'left 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.15s ease 0ms'
      : scanPhase === 'done'
      ? 'opacity 0.3s ease 0ms'
      : 'none',
  };

  // 光标样式（闪烁）
  const cursorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '3px',
    height: '1em',
    backgroundColor: slide.accentColor,
    boxShadow: `0 0 8px ${slide.accentColor}`,
    marginLeft: '2px',
    verticalAlign: 'text-bottom',
    opacity: showCursor ? 1 : 0,
    transition: 'opacity 0.1s',
    animation: showCursor ? 'cursor-blink 0.7s step-end infinite' : 'none',
  };

  return (
    <div className="relative" style={{ zIndex: 10 }}>
      {/* 内嵌光标闪烁动画 */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* 标签行 */}
      <div
        className={`text-[10px] sm:text-sm font-mono tracking-[0.3em] mb-2 sm:mb-4 uppercase ${tagColor}`}
        style={{
          opacity: showTag ? 1 : 0,
          transform: showTag ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {slide.tag}
      </div>

      {/* 主标题区域（含扫光线） */}
      <div className="relative" style={{ overflow: 'visible' }}>
        {/* 扫光线 */}
        <div style={scanLineStyle} />

        {/* 第一行 */}
        <div
          className={`font-extrabold tracking-tight leading-[1.1] mb-1 sm:mb-2 ${titleColor}`}
          style={{ fontSize: 'clamp(28px, 8vw, 48px)', minHeight: '1.1em' }}
        >
          {displayLine1}
          {cursorOnLine === 1 && showCursor && <span style={cursorStyle} />}
        </div>

        {/* 第二行（强调色） */}
        <div
          className="font-extrabold tracking-tight leading-[1.1] mb-1 sm:mb-2"
          style={{
            fontSize: 'clamp(32px, 9vw, 54px)',
            minHeight: '1.1em',
            ...accentStyle,
          }}
        >
          {displayLine2}
          {cursorOnLine === 2 && showCursor && <span style={cursorStyle} />}
        </div>
      </div>

      {/* 副标题 */}
      <p
        className={`mt-4 sm:mt-6 text-sm sm:text-lg leading-relaxed max-w-[280px] sm:max-w-md font-medium ${subtitleColor}`}
        style={{
          opacity: showSubtitle ? 1 : 0,
          transform: showSubtitle ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {slide.subtitle}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CSS 动效文字组件（Frame 2 & 3）
───────────────────────────────────────────── */
interface AnimatedTextProps {
  slide: SlideConfig;
  active: boolean;
  isDark: boolean;
}

function AnimatedText({ slide, active, isDark }: AnimatedTextProps) {
  const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible'>('hidden');

  useEffect(() => {
    if (!active) {
      setPhase('hidden');
      return;
    }
    const t1 = setTimeout(() => setPhase('entering'), 80);
    const t2 = setTimeout(() => setPhase('visible'), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  const tagColor = isDark ? 'text-sky-400' : 'text-blue-600';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const subtitleColor = isDark ? 'text-slate-300' : 'text-gray-600';
  const accentStyle: React.CSSProperties = {
    color: slide.accentColor,
    textShadow: isDark ? `0 0 20px ${slide.accentColor}60` : 'none',
  };

  const getLineStyle = (lineIdx: number): React.CSSProperties => {
    const delay = lineIdx * 130;
    if (slide.animation === 'fly-in-left') {
      return {
        display: 'block',
        opacity: phase === 'hidden' ? 0 : 1,
        transform: phase === 'hidden' ? 'translateX(-40px)' : 'translateX(0)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      };
    }
    if (slide.animation === 'fly-in-bottom') {
      return {
        display: 'block',
        opacity: phase === 'hidden' ? 0 : 1,
        transform: phase === 'hidden' ? 'translateY(30px)' : 'translateY(0)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      };
    }
    return {};
  };

  const tagStyle: React.CSSProperties = {
    opacity: phase === 'hidden' ? 0 : 1,
    transform: phase === 'hidden' ? 'translateY(-12px)' : 'translateY(0)',
    transition: 'opacity 0.5s ease 0ms, transform 0.5s ease 0ms',
  };

  const subtitleStyle: React.CSSProperties = {
    opacity: phase === 'hidden' ? 0 : 1,
    transform: phase === 'hidden' ? 'translateY(16px)' : 'translateY(0)',
    transition: 'opacity 0.6s ease 520ms, transform 0.6s ease 520ms',
  };

  // 扫光线（fly-in-left 专用）
  const scanLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0, bottom: 0,
    width: '2px',
    background: `linear-gradient(to bottom, transparent, ${slide.accentColor}, transparent)`,
    boxShadow: `0 0 12px ${slide.accentColor}`,
    opacity: phase === 'hidden' ? 0 : 1,
    left: phase === 'hidden' ? '-4px' : 'calc(100% + 4px)',
    transition: phase === 'hidden'
      ? 'none'
      : 'left 0.9s cubic-bezier(0.4,0,0.2,1) 0ms, opacity 0.2s ease 0ms',
  };

  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <div className={`text-[10px] sm:text-sm font-mono tracking-[0.3em] mb-2 sm:mb-4 uppercase ${tagColor}`} style={tagStyle}>
        {slide.tag}
      </div>

      <div className="relative overflow-visible mb-4 sm:mb-8">
        {slide.animation === 'fly-in-left' && (
          <div style={scanLineStyle} />
        )}
        {slide.title.map((line, li) => (
          <div
            key={li}
            className={`font-extrabold tracking-tight leading-[1.1] mb-1 sm:mb-2 ${titleColor}`}
            style={{
              fontSize: 'clamp(28px, 8vw, 48px)',
              minHeight: '1.1em',
              ...getLineStyle(li),
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div
        className={`mt-4 sm:mt-6 text-sm sm:text-lg leading-relaxed max-w-[280px] sm:max-w-md font-medium ${subtitleColor}`}
        style={subtitleStyle}
      >
        {slide.subtitle}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   主组件
───────────────────────────────────────────── */
export default function HeroBannerCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDarkRaw = useIsDark();
  const isDark = isDarkRaw ?? true;
  const hydrated = isDarkRaw !== null;

  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const INTERVAL = 10000;

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const start = () => {
      if (timerRef.current) return;
      timerRef.current = setInterval(() => {
        setIndex(i => {
          const next = (i + 1) % SLIDES.length;
          setAnimKey(k => k + 1);
          return next;
        });
      }, INTERVAL);
    };
    const stop = () => {
      if (!timerRef.current) return;
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
    const onVis = () => document.visibilityState === 'visible' ? start() : stop();
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => { stop(); document.removeEventListener('visibilitychange', onVis); };
  }, [prefersReducedMotion]);

  const stats = [
    { value: '8+', label: '行业覆盖' },
    { value: '6', label: '部门场景' },
    { value: '24+', label: '落地案例' },
  ];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 'calc(100vh - var(--header-height, 64px))',
        minHeight: '520px',
        maxHeight: '900px',
      }}
    >
      {/* ── 背景图片轮播层 ── */}
      {hydrated && SLIDES.map((slide, i) => {
        const src = isDark ? slide.darkSrc : slide.lightSrc;
        const isActive = i === index;
        return (
          <div
            key={slide.key}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              willChange: 'opacity',
            }}
          >
            <Image
              src={src}
              alt={slide.tag}
              fill
              priority={i === 0}
              sizes="100vw"
              // 背景图片焦点 60% 偏左，让球体/视觉主体更靠近屏幕中央
              className="object-cover"
              style={{
                objectPosition: 'center center',
                transform: isActive && !prefersReducedMotion ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 12s ease-out',
                willChange: 'transform',
              }}
            />
          </div>
        );
      })}

      {/* ── 左侧渐变遮罩（文字区域清晰可读，向中心过渡） ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(100deg, rgba(5,13,26,0.96) 0%, rgba(5,13,26,0.90) 30%, rgba(5,13,26,0.65) 50%, rgba(5,13,26,0.20) 68%, transparent 85%)'
            : 'linear-gradient(100deg, rgba(248,250,255,0.97) 0%, rgba(248,250,255,0.92) 30%, rgba(248,250,255,0.60) 50%, rgba(248,250,255,0.15) 68%, transparent 85%)',
        }}
      />

      {/* ── 底部渐变遮罩（按钮区域） ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(5,13,26,0.92) 0%, rgba(5,13,26,0.50) 25%, transparent 50%)'
            : 'linear-gradient(to top, rgba(248,250,255,0.95) 0%, rgba(248,250,255,0.50) 25%, transparent 50%)',
        }}
      />

      {/* ── 背景装饰：微光效果 ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px] opacity-20 ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} />
        <div className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-10 ${isDark ? 'bg-purple-500' : 'bg-purple-300'}`} />
      </div>

      {/* ── 主内容层（居中布局，文字在左半区，背景视觉在右半区） ── */}
      <div className="absolute inset-0 flex flex-col justify-between py-8 sm:py-14">
        {/* 使用 max-w-7xl 居中容器，让内容不贴边 */}
        <div className="flex-1 flex items-center w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* 文字区域：占左侧约 50%，右侧留给背景图视觉元素 */}
          <div className="w-full sm:w-3/5 lg:w-5/12">
            {hydrated && SLIDES.map((slide, i) => {
              const isActive = i === index;
              if (!isActive && !prefersReducedMotion) return null;

              if (slide.animation === 'typewriter') {
                return (
                  <TypewriterText
                    key={`${slide.key}-${animKey}`}
                    slide={slide}
                    active={isActive}
                    isDark={isDark}
                    animKey={animKey}
                  />
                );
              }
              return (
                <AnimatedText
                  key={`${slide.key}-${animKey}`}
                  slide={slide}
                  active={isActive}
                  isDark={isDark}
                />
              );
            })}
          </div>
        </div>

        {/* 按钮 + 统计（底部，同样居中对齐） */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* 按钮组：移动端优化为 1 主 + 2 次布局 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* 主按钮：移动端全宽 */}
            <Link
              href="/scenarios"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-blue-600 text-white font-bold text-base sm:text-lg transition-all overflow-hidden shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.6)] active:scale-95"
            >
              <span className="relative z-10">查看解决方案</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-100 group-hover:opacity-90 transition-opacity" />
            </Link>

            {/* 次要按钮：移动端并排显示以节省空间 */}
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/cases"
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all border backdrop-blur-md ${
                  isDark
                    ? 'border-white/10 text-white hover:bg-white/10 bg-white/5'
                    : 'border-gray-200 text-gray-800 hover:bg-gray-50 bg-white/80'
                } hover:shadow-lg active:scale-95`}
              >
                成功案例
              </Link>
              <Link
                href="/training"
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-7 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all border backdrop-blur-md ${
                  isDark
                    ? 'border-amber-400/20 text-amber-300 hover:bg-amber-400/10 bg-amber-400/5'
                    : 'border-amber-200 text-amber-700 hover:bg-amber-50 bg-amber-50/50'
                } hover:shadow-lg active:scale-95`}
              >
                领航计划
              </Link>
            </div>
          </div>

          {/* 统计数字 + 进度点 */}
          <div className="flex items-end justify-between border-t border-black/5 dark:border-white/5 pt-6 sm:pt-0 sm:border-none">
            <div className="flex gap-6 sm:gap-12">
              {stats.map((s) => (
                <div key={s.label} className="relative">
                  <div className={`text-2xl sm:text-3xl font-black tracking-tighter mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {s.value}
                  </div>
                  <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* 进度指示点（可点击） */}
            <div className="flex gap-2 items-center pb-1">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.key}
                  onClick={() => goTo(i)}
                  aria-label={`切换到第 ${i + 1} 帧`}
                  className="rounded-full transition-all duration-500 focus:outline-none"
                  style={{
                    width: i === index ? '24px' : '6px',
                    height: '5px',
                    backgroundColor:
                      i === index
                        ? isDark ? 'rgba(255,255,255,0.85)' : 'rgba(37,99,235,0.75)'
                        : isDark ? 'rgba(255,255,255,0.25)' : 'rgba(37,99,235,0.25)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
