'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   类型定义
───────────────────────────────────────────── */
type AnimationType = 'particle-assemble' | 'fly-in-left' | 'fly-in-bottom';

interface SlideConfig {
  key: string;
  darkSrc: string;
  lightSrc: string;
  tag: string;
  title: string[];          // 每行一个元素
  subtitle: string;
  animation: AnimationType;
  accentColor: string;      // CSS color for glow/highlight
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
    animation: 'particle-assemble',
    accentColor: '#38bdf8',
  },
  {
    key: 'flow',
    darkSrc: '/banners/hero/flow-dark.webp',
    lightSrc: '/banners/hero/flow-light.webp',
    tag: 'INTELLIGENT WORKFLOW',
    title: ['从销售到供应链', '从财务到 HR，全覆盖'],
    subtitle: '一个平台连接企业所有业务流，数据驱动每个决策',
    animation: 'fly-in-left',
    accentColor: '#a78bfa',
  },
  {
    key: 'path',
    darkSrc: '/banners/hero/path-dark.webp',
    lightSrc: '/banners/hero/path-light.webp',
    tag: 'MEASURABLE TRANSFORMATION',
    title: ['可落地·可量化', '可持续的 AI 转型路径'],
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
   粒子聚合 Canvas 组件（Frame 1 专用）
───────────────────────────────────────────── */
interface ParticleCanvasProps {
  text: string[];
  active: boolean;
  isDark: boolean;
  accentColor: string;
}

function ParticleCanvas({ text, active, isDark, accentColor }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; tx: number; ty: number;
    vx: number; vy: number; size: number; alpha: number; color: string;
  }>>([]);
  const phaseRef = useRef<'idle' | 'assemble' | 'hold' | 'disperse'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initParticles = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const W = canvas.width;
    const H = canvas.height;
    const isMobile = W < 640;
    const fontSize1 = isMobile ? 28 : 52;
    const fontSize2 = isMobile ? 22 : 42;
    const lineH = isMobile ? 40 : 72;
    const startY = H * 0.38;

    ctx.clearRect(0, 0, W, H);

    // 采样文字像素
    const targets: Array<{ x: number; y: number }> = [];
    text.forEach((line, li) => {
      const fs = li === 0 ? fontSize1 : fontSize2;
      ctx.font = `bold ${fs}px "PingFang SC", "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#ffffff';
      const tw = ctx.measureText(line).width;
      const tx = isMobile ? 16 : Math.min(W * 0.05, 60);
      const ty = startY + li * lineH;
      ctx.fillText(line, tx, ty);

      const imgData = ctx.getImageData(tx, ty - fs, Math.min(tw + 20, W - tx), fs + 10);
      for (let py = 0; py < imgData.height; py += 3) {
        for (let px = 0; px < imgData.width; px += 3) {
          const idx = (py * imgData.width + px) * 4;
          if (imgData.data[idx + 3] > 120) {
            targets.push({ x: tx + px, y: ty - fs + py });
          }
        }
      }
    });
    ctx.clearRect(0, 0, W, H);

    // 限制粒子数量（移动端减半）
    const maxParticles = isMobile ? 600 : 1400;
    const step = Math.max(1, Math.floor(targets.length / maxParticles));
    const sampled = targets.filter((_, i) => i % step === 0);

    const colors = [accentColor, '#ffffff', '#93c5fd', '#e0f2fe'];
    particlesRef.current = sampled.map(t => ({
      tx: t.x, ty: t.y,
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0, vy: 0,
      size: Math.random() * 2 + 1,
      alpha: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [text, accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (active) {
        initParticles(canvas, ctx);
        phaseRef.current = 'assemble';
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [active, initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!active) {
      cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phaseRef.current = 'idle';
      particlesRef.current = [];
      return;
    }

    initParticles(canvas, ctx);
    phaseRef.current = 'assemble';

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const phase = phaseRef.current;
      let allArrived = true;

      particlesRef.current.forEach(p => {
        if (phase === 'assemble') {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.vx = p.vx * 0.8 + dx * 0.12;
          p.vy = p.vy * 0.8 + dy * 0.12;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = Math.min(1, p.alpha + 0.04);
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) allArrived = false;
        } else if (phase === 'disperse') {
          p.vx += (Math.random() - 0.5) * 3;
          p.vy += (Math.random() - 0.5) * 3 - 0.5;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = Math.max(0, p.alpha - 0.03);
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (phase === 'assemble' && allArrived && particlesRef.current.length > 0) {
        phaseRef.current = 'hold';
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
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
  const accentStyle = { color: slide.accentColor, textShadow: isDark ? `0 0 20px ${slide.accentColor}60` : 'none' };

  const getLineStyle = (lineIdx: number, charIdx?: number): React.CSSProperties => {
    const delay = lineIdx * 120 + (charIdx ?? 0) * 30;
    if (slide.animation === 'fly-in-left') {
      return {
        display: 'inline-block',
        opacity: phase === 'hidden' ? 0 : 1,
        transform: phase === 'hidden' ? 'translateX(-60px)' : 'translateX(0)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      };
    }
    if (slide.animation === 'fly-in-bottom') {
      return {
        display: 'inline-block',
        opacity: phase === 'hidden' ? 0 : 1,
        transform: phase === 'hidden' ? 'translateY(40px)' : 'translateY(0)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
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
    transition: 'opacity 0.6s ease 500ms, transform 0.6s ease 500ms',
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
      {/* 标签行 */}
      <div className={`text-xs sm:text-sm font-mono tracking-[0.2em] mb-3 sm:mb-4 ${tagColor}`} style={tagStyle}>
        {slide.tag}
      </div>

      {/* 主标题 */}
      <div className="relative overflow-visible">
        {slide.animation === 'fly-in-left' && (
          <div style={scanLineStyle} />
        )}
        {slide.title.map((line, li) => (
          <div
            key={li}
            className={`font-bold leading-tight mb-1 sm:mb-2 ${titleColor}`}
            style={{
              fontSize: li === 0
                ? 'clamp(22px, 4vw, 48px)'
                : 'clamp(26px, 4.5vw, 56px)',
              ...(li === 1 ? accentStyle : {}),
            }}
          >
            <span style={getLineStyle(li)}>
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* 副标题 */}
      <p
        className={`mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-md ${subtitleColor}`}
        style={subtitleStyle}
      >
        {slide.subtitle}
      </p>
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
  const [animKey, setAnimKey] = useState(0); // 强制重新触发动效
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const INTERVAL = 9000;

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

  const activeSlide = SLIDES[index];
  const stats = [
    { value: '8+', label: '行业覆盖' },
    { value: '6', label: '部门场景' },
    { value: '24+', label: '落地案例' },
  ];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - var(--header-height, 64px))', minHeight: '520px', maxHeight: '900px' }}>

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
              className="object-cover object-right sm:object-center"
              style={{
                transform: isActive && !prefersReducedMotion ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 10s ease-out',
                willChange: 'transform',
              }}
            />
          </div>
        );
      })}

      {/* ── 左侧渐变遮罩（确保文字区域清晰可读） ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(105deg, rgba(5,13,26,0.95) 0%, rgba(5,13,26,0.88) 38%, rgba(5,13,26,0.55) 58%, rgba(5,13,26,0.1) 75%, transparent 100%)'
            : 'linear-gradient(105deg, rgba(248,250,255,0.97) 0%, rgba(248,250,255,0.90) 38%, rgba(248,250,255,0.55) 58%, rgba(248,250,255,0.1) 75%, transparent 100%)',
        }}
      />

      {/* ── 底部渐变遮罩（按钮区域） ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(5,13,26,0.92) 0%, rgba(5,13,26,0.55) 28%, transparent 52%)'
            : 'linear-gradient(to top, rgba(248,250,255,0.95) 0%, rgba(248,250,255,0.55) 28%, transparent 52%)',
        }}
      />

      {/* ── 粒子 Canvas（Frame 1 专用） ── */}
      {hydrated && !prefersReducedMotion && (
        <ParticleCanvas
          key={`particle-${animKey}`}
          text={activeSlide.animation === 'particle-assemble' ? activeSlide.title : []}
          active={activeSlide.animation === 'particle-assemble'}
          isDark={isDark}
          accentColor={activeSlide.accentColor}
        />
      )}

      {/* ── 主内容层 ── */}
      <div className="absolute inset-0 flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-8 lg:px-16">

        {/* 文字区域（左上） */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-xl lg:max-w-2xl">
            {hydrated && SLIDES.map((slide, i) => {
              const isActive = i === index;
              if (!isActive && !prefersReducedMotion) return null;
              if (slide.animation === 'particle-assemble') {
                // Frame 1：粒子动效，这里只渲染 tag 和 subtitle（标题由 Canvas 渲染）
                return (
                  <div key={`${slide.key}-${animKey}`} style={{ zIndex: 10, position: 'relative' }}>
                    <ParticleTextFallback slide={slide} isDark={isDark} active={isActive} prefersReducedMotion={prefersReducedMotion} />
                  </div>
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

        {/* 按钮 + 统计（底部） */}
        <div>
          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Link
              href="/scenarios"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 backdrop-blur-sm"
            >
              查看解决方案 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cases"
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all border backdrop-blur-sm ${
                isDark
                  ? 'border-white/20 text-white hover:bg-white/10 bg-black/20'
                  : 'border-gray-400/40 text-gray-800 hover:bg-white/70 bg-white/50'
              }`}
            >
              查看成功案例 <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/training"
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all border backdrop-blur-sm ${
                isDark
                  ? 'border-amber-400/40 text-amber-300 hover:bg-amber-400/15 bg-black/20'
                  : 'border-amber-500/50 text-amber-700 hover:bg-amber-50/80 bg-white/50'
              }`}
            >
              AI 领航计划 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 统计数字 + 进度点 */}
          <div className="flex items-end justify-between">
            <div className="flex gap-6 sm:gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className={`text-xl sm:text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {s.value}
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
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

/* ─────────────────────────────────────────────
   Frame 1 的 tag + subtitle（粒子动效时标题由 Canvas 渲染）
   在 reduced-motion 或 Canvas 不可用时降级为普通文字
───────────────────────────────────────────── */
function ParticleTextFallback({
  slide, isDark, active, prefersReducedMotion
}: { slide: SlideConfig; isDark: boolean; active: boolean; prefersReducedMotion: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) { setShow(false); return; }
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, [active]);

  const tagColor = isDark ? 'text-sky-400' : 'text-blue-600';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const subtitleColor = isDark ? 'text-slate-300' : 'text-gray-600';
  const accentStyle = { color: slide.accentColor, textShadow: isDark ? `0 0 20px ${slide.accentColor}60` : 'none' };

  return (
    <div>
      <div
        className={`text-xs sm:text-sm font-mono tracking-[0.2em] mb-3 sm:mb-4 ${tagColor}`}
        style={{ opacity: show ? 1 : 0, transition: 'opacity 0.5s ease' }}
      >
        {slide.tag}
      </div>

      {/* 粒子动效时，标题由 Canvas 渲染；reduced-motion 时降级为普通文字 */}
      {prefersReducedMotion && slide.title.map((line, li) => (
        <div
          key={li}
          className={`font-bold leading-tight mb-1 sm:mb-2 ${titleColor}`}
          style={{
            fontSize: li === 0 ? 'clamp(22px, 4vw, 48px)' : 'clamp(26px, 4.5vw, 56px)',
            ...(li === 1 ? accentStyle : {}),
            opacity: show ? 1 : 0,
            transition: `opacity 0.5s ease ${li * 150}ms`,
          }}
        >
          {line}
        </div>
      ))}

      <p
        className={`mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-md ${subtitleColor}`}
        style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease 600ms, transform 0.6s ease 600ms',
        }}
      >
        {slide.subtitle}
      </p>
    </div>
  );
}
