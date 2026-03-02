'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type BannerFrame = {
  key: string;
  darkSrc: string;
  lightSrc: string;
  alt: string;
  label?: string;
};

const DEFAULT_FRAMES: BannerFrame[] = [
  {
    key: 'agent',
    darkSrc: '/banners/hero/agent-dark.webp',
    lightSrc: '/banners/hero/agent-light.webp',
    alt: '超级管理 Agent 覆盖全部门的科技背景',
    label: 'Super Agent',
  },
  {
    key: 'flow',
    darkSrc: '/banners/hero/flow-dark.webp',
    lightSrc: '/banners/hero/flow-light.webp',
    alt: '业务链路贯通的数据流科技背景',
    label: 'Business Flow',
  },
  {
    key: 'path',
    darkSrc: '/banners/hero/path-dark.webp',
    lightSrc: '/banners/hero/path-light.webp',
    alt: '可落地可量化可持续的转型路径科技背景',
    label: 'Measurable Path',
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

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(true);
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
  className?: string;
  intervalMs?: number;
  fadeMs?: number;
  frames?: BannerFrame[];
  showLabel?: boolean;
}

export default function HeroBannerCarousel({
  className,
  intervalMs = 7000,
  fadeMs = 1000,
  frames = DEFAULT_FRAMES,
  showLabel = true,
}: HeroBannerCarouselProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDark = useIsDark();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 轮播逻辑：页面不可见时暂停
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

  // prefers-reduced-motion：固定第一帧
  const activeIndex = prefersReducedMotion ? 0 : index;

  return (
    <div
      className={['absolute inset-0 z-0 overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {/* 图片轮播层：pointer-events:none 确保不阻挡按钮点击 */}
      <div className="absolute inset-0 pointer-events-none">
        {frames.map((frame, i) => {
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
              {/* 图片：object-cover 居中裁切，适配 PC 和手机 */}
              <Image
                src={src}
                alt={frame.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
                style={{
                  transform: isActive && !prefersReducedMotion ? 'scale(1.03)' : 'scale(1)',
                  transition: `transform ${fadeMs + 1200}ms ease-out`,
                  willChange: 'transform',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 遮罩层：保证文字可读性 + 高级暗角效果 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 主遮罩：深色模式更深，浅色模式更轻 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/30 dark:from-black/40 dark:via-black/10 dark:to-black/50" />
        {/* 左右暗角：让中间内容更突出 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.15)_100%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.30)_100%)]" />
        {/* 浅色模式额外白色遮罩：防止图片太抢眼 */}
        <div className="absolute inset-0 bg-white/30 dark:bg-transparent" />
      </div>

      {/* 帧标签（可选）：左上角极小英文标签，增强轮播感 */}
      {showLabel && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none">
          {frames.map((frame, i) => (
            <div
              key={frame.key}
              className="absolute top-0 left-0"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transition: `opacity ${fadeMs}ms ease-in-out`,
              }}
            >
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase px-2 py-1 rounded border border-white/20 text-white/40 dark:text-white/30 bg-black/10 dark:bg-black/20 backdrop-blur-sm select-none">
                {frame.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 底部进度指示点 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
        {frames.map((frame, i) => (
          <div
            key={frame.key}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '4px',
              backgroundColor:
                i === activeIndex
                  ? 'rgba(255,255,255,0.7)'
                  : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
