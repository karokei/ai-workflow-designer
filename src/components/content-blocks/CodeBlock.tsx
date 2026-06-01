// src/components/content-blocks/CodeBlock.tsx
import { useState } from 'react';
import { Copy, Check, WrapText } from 'lucide-react';
import type { CodeBlock as CodeBlockType } from '@/types/curriculum';

interface CodeBlockProps {
  block: CodeBlockType;
}

export function CodeBlock({ block }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(12); // Default font size: 12px
  const [wordWrap, setWordWrap] = useState<boolean>(false); // Default: horizontal scroll (no wrap)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(block.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDoubleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Detect double click/tap
    if (e.detail === 2) {
      handleCopy();
    }
  };

  const fontScaleUp = () => {
    setFontSize((prev) => Math.min(prev + 1, 18));
  };

  const fontScaleDown = () => {
    setFontSize((prev) => Math.max(prev - 1, 9));
  };

  return (
    <div className="flex flex-col my-4 w-full rounded-xl overflow-hidden border border-border bg-[#0f172a] dark:bg-[#020617] shadow-lg animate-fade-in">
      {/* Code Block Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-[#334155]/60 text-xs font-mono text-slate-300">
        <span className="truncate font-semibold max-w-[70%]">
          {block.filename || `${block.language || 'code'}`}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#334155]/50 hover:bg-[#334155] border border-[#475569]/30 text-[11px] text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-mika-success" />
              <span>Đã chép</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <div
        onClick={handleDoubleTap}
        className={`p-4 font-mono select-text transition-all duration-150 overflow-x-auto ${
          wordWrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre overflow-x-auto'
        }`}
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
      >
        <code className="text-[#38bdf8] block">{block.content}</code>
      </div>

      {/* Code Quick Actions footer bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b]/70 border-t border-[#334155]/40 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={fontScaleDown}
            className="px-2 py-0.5 rounded bg-[#334155]/30 hover:bg-[#334155] active:scale-95 border border-[#475569]/20 text-[10px] font-bold text-slate-300 transition-all"
            title="Cỡ chữ nhỏ hơn"
          >
            A-
          </button>
          <span className="text-[10px] font-mono text-slate-400 min-w-[28px] text-center">
            {fontSize}px
          </span>
          <button
            onClick={fontScaleUp}
            className="px-2 py-0.5 rounded bg-[#334155]/30 hover:bg-[#334155] active:scale-95 border border-[#475569]/20 text-[10px] font-bold text-slate-300 transition-all"
            title="Cỡ chữ lớn hơn"
          >
            A+
          </button>
        </div>

        <button
          onClick={() => setWordWrap(!wordWrap)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all active:scale-95 ${
            wordWrap
              ? 'bg-accent/20 text-accent border border-accent/40 font-semibold'
              : 'bg-[#334155]/30 text-slate-300 border border-[#475569]/20 hover:bg-[#334155]'
          }`}
          title="Bật/Tắt Tự động xuống dòng"
        >
          <WrapText className="w-3 h-3" />
          <span className="text-[10px]">{wordWrap ? 'Đóng dòng' : 'Tự xuống dòng'}</span>
        </button>
      </div>

      {/* Caption description */}
      {block.caption && (
        <div className="p-2.5 bg-[#0f172a]/40 border-t border-[#334155]/20 text-[11px] text-text-sec italic text-center">
          {block.caption}
        </div>
      )}
    </div>
  );
}
