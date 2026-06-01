import { X, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface MikaDialogProps {
  isOpen: boolean;
  type: 'alert' | 'confirm';
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MikaDialog({
  isOpen,
  type,
  title,
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy bỏ',
  onConfirm,
  onCancel,
}: MikaDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dynamic blurred backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onCancel}
      />

      {/* Cyberpunk dialog frame box */}
      <div className="relative w-full max-w-md bg-slate-950/95 border border-accent rounded-2xl p-5 shadow-[0_0_25px_rgba(0,212,255,0.25)] flex flex-col gap-4.5 z-10 animate-scale-up select-none">
        
        {/* Holographic glowing top lines */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* Dialog Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border-light pb-3">
          <div className="flex items-center gap-2.5">
            {type === 'confirm' ? (
              <HelpCircle className="w-5 h-5 text-accent animate-pulse" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-mika-warning" />
            )}
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary">
              {title}
            </h3>
          </div>
          <button 
            onClick={onCancel}
            className="p-1 rounded-lg hover:bg-slate-900 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dialog Message Content */}
        <div className="text-xs leading-relaxed text-text-secondary select-text font-sans py-1">
          {message}
        </div>

        {/* Dialog Actions Panel */}
        <div className="flex items-center justify-end gap-3 mt-1.5">
          {type === 'confirm' && (
            <button
              onClick={onCancel}
              className="px-4.5 py-2.5 text-[11px] font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              {cancelLabel}
            </button>
          )}
          
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-accent hover:bg-accent-hover text-black font-extrabold text-[11px] rounded-xl shadow-glow-cyan transition-all active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MikaDialog;
