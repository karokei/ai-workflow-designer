// ─── PWA Install Banner — Mika Design System ───
// A sleek, animated bottom banner prompting mobile users to install the app.
// Styled with Cyberpunk/Mika aesthetics: glassmorphism, neon glow, smooth animations.

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Zap } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function PWAInstallBanner() {
  const { canInstall, isInstalled, isDismissed, promptInstall, dismissPrompt } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Show banner with delay after mount for smooth entrance
  useEffect(() => {
    if (!canInstall || isInstalled || isDismissed) {
      setIsVisible(false);
      return;
    }

    // Delay showing the banner by 5 seconds for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [canInstall, isInstalled, isDismissed]);

  // Show iOS Safari instructions if not Chrome-based
  const [isIOSSafari, setIsIOSSafari] = useState(false);
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|Chrome/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isIOS && isSafari && !isStandalone) {
      setIsIOSSafari(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      dismissPrompt();
    }, 300);
  };

  const handleInstall = async () => {
    await promptInstall();
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
    }, 300);
  };

  // For iOS Safari — show manual install instructions
  if (isIOSSafari && !isInstalled && !isDismissed) {
    return <IOSInstallBanner onDismiss={handleDismiss} />;
  }

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-20 lg:bottom-4 left-4 right-4 z-[60] mx-auto max-w-md transition-all duration-300 ${
        isExiting
          ? 'translate-y-full opacity-0'
          : 'translate-y-0 opacity-100 animate-slide-up'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-slate-950/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.2),0_-4px_20px_rgba(0,0,0,0.5)]">
        {/* Holographic top accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* Animated scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-scan-line" />
        </div>

        <div className="relative p-4 flex items-center gap-3.5">
          {/* App Icon with glow */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-accent flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)]">
              <Zap className="w-6 h-6 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
            </div>
            {/* Pulsing ring */}
            <div className="absolute -inset-1 rounded-xl border border-accent/20 animate-pulse" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Smartphone className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                Cài đặt ứng dụng
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-snug">
              Thêm <span className="font-semibold text-text-primary">AI Workflow</span> vào
              màn hình chính để trải nghiệm nhanh hơn.
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-800/60 transition-colors cursor-pointer"
            aria-label="Đóng thông báo cài đặt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="px-4 pb-4 flex items-center gap-2.5">
          <button
            onClick={handleDismiss}
            className="flex-1 px-3 py-2.5 text-[11px] font-bold text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 active:scale-[0.97] transition-all cursor-pointer"
          >
            Để sau
          </button>
          <button
            onClick={() => void handleInstall()}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-accent hover:bg-accent-hover text-black font-extrabold text-[11px] rounded-xl shadow-glow-cyan active:scale-[0.97] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Cài đặt ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── iOS Safari Install Instructions Banner ───
function IOSInstallBanner({ onDismiss }: { onDismiss: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onDismiss();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-20 lg:bottom-4 left-4 right-4 z-[60] mx-auto max-w-md transition-all duration-300 ${
        isExiting
          ? 'translate-y-full opacity-0'
          : 'translate-y-0 opacity-100 animate-slide-up'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-slate-950/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.2),0_-4px_20px_rgba(0,0,0,0.5)]">
        {/* Top glow line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-accent flex items-center justify-center shadow-[0_0_12px_rgba(0,212,255,0.25)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <Smartphone className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    Cài đặt trên iOS
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Steps */}
          <div className="space-y-2.5 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-[9px] font-bold text-accent flex-shrink-0">
                1
              </div>
              <p className="text-xs text-text-secondary">
                Nhấn vào nút{' '}
                <span className="inline-flex items-center align-middle px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-text-primary font-mono text-[10px]">
                  ⎙ Chia sẻ
                </span>{' '}
                ở thanh dưới
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-[9px] font-bold text-accent flex-shrink-0">
                2
              </div>
              <p className="text-xs text-text-secondary">
                Chọn{' '}
                <span className="inline-flex items-center align-middle px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-text-primary font-mono text-[10px]">
                  ➕ Thêm vào MH chính
                </span>
              </p>
            </div>
          </div>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="w-full px-3 py-2.5 text-[11px] font-bold text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 active:scale-[0.97] transition-all cursor-pointer"
          >
            Đã hiểu, đóng thông báo
          </button>
        </div>
      </div>
    </div>
  );
}

export default PWAInstallBanner;
