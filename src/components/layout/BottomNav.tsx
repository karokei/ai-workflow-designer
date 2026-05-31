// src/components/layout/BottomNav.tsx
import { Compass, BookOpen, Search, User, Zap } from 'lucide-react';

interface BottomNavProps {
  currentView: 'curriculum' | 'overview' | 'search' | 'profile' | 'sandbox';
  setCurrentView: (view: 'curriculum' | 'overview' | 'search' | 'profile' | 'sandbox') => void;
}

export function BottomNav({ currentView, setCurrentView }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-14 bg-bg-card/75 backdrop-blur-md border-t border-border flex items-center justify-around px-2 shadow-lg transition-colors duration-300">
      {/* Tab: Lộ trình */}
      <button
        onClick={() => setCurrentView('overview')}
        className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-center relative transition-all duration-200"
      >
        <Compass
          className={`w-5 h-5 transition-transform duration-200 ${
            currentView === 'overview'
              ? 'text-mika-p500 scale-110 filter drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        />
        <span
          className={`text-[9px] font-semibold tracking-tight transition-colors duration-200 ${
            currentView === 'overview' ? 'text-mika-p500 font-bold' : 'text-text-muted'
          }`}
        >
          Lộ trình
        </span>
        {currentView === 'overview' && (
          <div className="absolute bottom-0 w-8 h-[2px] bg-mika-p500 rounded-full shadow-[0_0_8px_#6366f1]" />
        )}
      </button>

      {/* Tab: Học */}
      <button
        onClick={() => setCurrentView('curriculum')}
        className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-center relative transition-all duration-200"
      >
        <BookOpen
          className={`w-5 h-5 transition-transform duration-200 ${
            currentView === 'curriculum'
              ? 'text-mika-p500 scale-110 filter drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        />
        <span
          className={`text-[9px] font-semibold tracking-tight transition-colors duration-200 ${
            currentView === 'curriculum' ? 'text-mika-p500 font-bold' : 'text-text-muted'
          }`}
        >
          Học tập
        </span>
        {currentView === 'curriculum' && (
          <div className="absolute bottom-0 w-8 h-[2px] bg-mika-p500 rounded-full shadow-[0_0_8px_#6366f1]" />
        )}
      </button>

      {/* Tab: Tìm kiếm */}
      <button
        onClick={() => setCurrentView('search')}
        className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-center relative transition-all duration-200"
      >
        <Search
          className={`w-5 h-5 transition-transform duration-200 ${
            currentView === 'search'
              ? 'text-mika-p500 scale-110 filter drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        />
        <span
          className={`text-[9px] font-semibold tracking-tight transition-colors duration-200 ${
            currentView === 'search' ? 'text-mika-p500 font-bold' : 'text-text-muted'
          }`}
        >
          Tìm kiếm
        </span>
        {currentView === 'search' && (
          <div className="absolute bottom-0 w-8 h-[2px] bg-mika-p500 rounded-full shadow-[0_0_8px_#6366f1]" />
        )}
      </button>

      {/* Tab: Giả lập */}
      <button
        onClick={() => setCurrentView('sandbox')}
        className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-center relative transition-all duration-200"
      >
        <Zap
          className={`w-5 h-5 transition-transform duration-200 ${
            currentView === 'sandbox'
              ? 'text-mika-p500 scale-110 filter drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        />
        <span
          className={`text-[9px] font-semibold tracking-tight transition-colors duration-200 ${
            currentView === 'sandbox' ? 'text-mika-p500 font-bold' : 'text-text-muted'
          }`}
        >
          Giả lập
        </span>
        {currentView === 'sandbox' && (
          <div className="absolute bottom-0 w-8 h-[2px] bg-mika-p500 rounded-full shadow-[0_0_8px_#6366f1]" />
        )}
      </button>

      {/* Tab: Cá nhân */}
      <button
        onClick={() => setCurrentView('profile')}
        className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-center relative transition-all duration-200"
      >
        <User
          className={`w-5 h-5 transition-transform duration-200 ${
            currentView === 'profile'
              ? 'text-mika-p500 scale-110 filter drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        />
        <span
          className={`text-[9px] font-semibold tracking-tight transition-colors duration-200 ${
            currentView === 'profile' ? 'text-mika-p500 font-bold' : 'text-text-muted'
          }`}
        >
          Cá nhân
        </span>
        {currentView === 'profile' && (
          <div className="absolute bottom-0 w-8 h-[2px] bg-mika-p500 rounded-full shadow-[0_0_8px_#6366f1]" />
        )}
      </button>
    </nav>
  );
}
