'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

type BannerFrame = {
  key: string;
  darkSrc: string;
  lightSrc: string;
  alt: string;
};

const DEFAULT_FRAMES: BannerFrame[] = [
  {
    key: 'agent',
    darkSrc: '/banners/hero/agent-dark.webp',
    lightSrc: '/banners/hero/agent-light.webp',
    alt: '让 AI 成为每个部门的超级管理 Agent',
  },
  {
    key: 'flow',
    darkSrc: '/banners/hero/flow-dark.webp',
    lightSrc: '/banners/hero/flow-light.webp',
    alt: '从销售到供应链，从财务到 HR，OpenClaw 企业智能体覆盖全部门',
  },
  {
    key: 'path',
    darkSrc: '/banners/hero/path-dark.webp',
    lightSrc: '/banners/hero/path-light.webp',
    alt: '可落地、可量化、可持续的 AI 转型路径',
  },
];

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

/**
 * 读取 <html> 上的 .dark class，初始值用 null 表示"尚未水合"，
 * 避免 SSR/CSR 不一致导致图片闪烁。
 */
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

interface HeroBannerCarouselProps {
  frames?: BannerFrame[];
  intervalMs?: number;
  fadeMs?: number;
  stats?: { value: string; label: string }[];
}

export default function HeroBannerCarousel({
  frames = DEFAULT_FRAMES,
  intervalMs = 7000,
  fadeMs = 1000,
  stats = [
    { value: '8+', label: '行业覆盖' },
    { value: '6', label: '部门场景' },
    { value: '24+', label: '落地案例' },
  ],
}: HeroBannerCarouselProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDarkRaw = useIsDark();
  // 水合前用 null，水合后才渲染图片，避免主题闪烁
  const isDark = isDarkRaw ?? true;
  const hydrated = isDarkRaw !== null;

  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const start = () => {
      if (timerRef.current) return;
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % frames.length);
      }, intervalMs);
    };

    const stop = () => {
      if (!timerRef.current) return;
      clearInterval(timerRef.current);
      timerRef.current = null;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') start();
      else stop();
    };

    start();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [frames.length, intervalMs, prefersReducedMotion]);

  const activeIndex = prefersReducedMotion ? 0 : index;

  return (
    /* 全屏容器：图片 + 交互层 */
    <div className="relative w-full h-full min-h-[calc(100vh-var(--header-height))] overflow-hidden">

      {/* ── 图片轮播层（水合后才渲染，防止主题闪烁） ── */}
      {hydrated && frames.map((frame, i) => {
        const src = isDark ? frame.darkSrc : frame.lightSrc;
        const isActive = i === activeIndex;
        return (
          <div
            key={frame.key}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${fadeMs}ms ease-in-out`,
              willChange: 'opacity',
            }}
          >
            <Image
              src={src}
              alt={frame.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-left-top sm:object-center"
              style={{
                transform: isActive && !prefersReducedMotion ? 'scale(1.025)' : 'scale(1)',
                transition: `transform ${fadeMs + 1500}ms ease-out`,
                willChange: 'transform',
              }}
            />
          </div>
        );
      })}

      {/* ── 底部渐变遮罩：让按钮区域有足够对比度 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 45%, rgba(11,18,32,0.82) 100%)'
            : 'linear-gradient(to bottom, transparent 45%, rgba(244,246,250,0.88) 100%)',
        }}
      />

      {/* ── 交互层：按钮 + 统计数字（居底部） ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-14 pointer-events-none">
        <div className="max-w-5xl mx-auto w-full px-4 pointer-events-auto">

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start mb-8 sm:mb-10">
            <Link
              href="/scenarios"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 backdrop-blur-sm"
            >
              查看解决方案 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cases"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all border backdrop-blur-sm ${
                isDark
                  ? 'border-white/25 text-white hover:bg-white/10 bg-black/20'
                  : 'border-gray-400/50 text-gray-800 hover:bg-white/60 bg-white/40'
              }`}
            >
              查看成功案例 <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/training"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all border backdrop-blur-sm ${
                isDark
                  ? 'border-amber-500/40 text-amber-300 hover:bg-amber-500/15 bg-black/20'
                  : 'border-amber-500/60 text-amber-700 hover:bg-amber-50/80 bg-white/40'
              }`}
            >
              AI领航计划 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 统计数字 */}
          <div className="flex gap-8 sm:gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className={`text-xl sm:text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {s.value}
                </div>
                <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 进度指示点 ── */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-1.5 pointer-events-none">
        {frames.map((frame, i) => (
          <div
            key={frame.key}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '4px',
              backgroundColor:
                i === activeIndex
                  ? isDark ? 'rgba(255,255,255,0.75)' : 'rgba(30,64,175,0.65)'
                  : isDark ? 'rgba(255,255,255,0.25)' : 'rgba(30,64,175,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
