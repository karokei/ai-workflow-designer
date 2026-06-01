import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 my-6 w-full rounded-2xl border border-[#ef4444]/30 bg-slate-950 text-text-primary shadow-xl animate-fade-in max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-red-950/20 border border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] mb-4 select-none animate-pulse">
            <AlertOctagon className="w-7 h-7" />
          </div>
          
          <h3 className="text-base font-bold text-text-primary tracking-tight">Hệ thống phát hiện sự cố (Runtime Error)</h3>
          
          <p className="text-xs text-text-secondary mt-1.5 text-center leading-relaxed max-w-md">
            Một thành phần giao diện đã xảy ra lỗi trong quá trình thực thi. Sự cố này đã được cách ly thành công để bảo vệ tiến trình học tập của bạn.
          </p>

          {this.state.error && (
            <div className="w-full mt-4 p-3.5 bg-slate-900 border border-slate-800 rounded-lg text-left select-text">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono block mb-1">Chi tiết lỗi:</span>
              <code className="text-[11px] font-mono text-red-400 break-all leading-normal">
                {this.state.error.toString()}
              </code>
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 mt-5 px-5 py-2.5 bg-accent hover:bg-accent-hover text-black font-bold text-xs rounded-xl shadow-glow-cyan transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử tải lại thành phần</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
