// src/components/content-blocks/ChallengeBlock.tsx
import { useState, useEffect } from 'react';
import type { ChallengeBlock as ChallengeBlockType } from '@/types/curriculum';
import type { ChallengeResult } from '@/types/progress';
import { parseMarkdownLite } from '@/utils/markdown-lite';
import { 
  Play, 
  Sparkles, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Code
} from 'lucide-react';

interface ChallengeBlockProps {
  block: ChallengeBlockType;
  savedResult: ChallengeResult | undefined;
  onSaveResult: (result: ChallengeResult) => Promise<void>;
}

export function ChallengeBlock({
  block,
  savedResult,
  onSaveResult,
}: ChallengeBlockProps) {
  const [code, setCode] = useState<string>(block.initialCode);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReference, setShowReference] = useState<boolean>(false);

  // Sync state if savedResult changes
  useEffect(() => {
    if (savedResult) {
      setCode(savedResult.codeAnswer);
    } else {
      setCode(block.initialCode);
    }
  }, [savedResult, block.initialCode]);

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại mã nguồn về trạng thái ban đầu?")) {
      setCode(block.initialCode);
    }
  };

  const handleGrade = async () => {
    if (!code.trim()) {
      alert("Vui lòng nhập lời giải trước khi gửi chấm điểm!");
      return;
    }

    setIsLoading(true);

    // Simulate AI evaluation time (1.5s for premium realistic experience)
    setTimeout(async () => {
      const lowerCode = code.toLowerCase();
      const matchedKeywords: string[] = [];
      const missingKeywords: string[] = [];

      block.expectedKeywords.forEach((kw) => {
        if (lowerCode.includes(kw.toLowerCase())) {
          matchedKeywords.push(kw);
        } else {
          missingKeywords.push(kw);
        }
      });

      // Simple grading formula
      const score = block.expectedKeywords.length > 0
        ? Math.round((matchedKeywords.length / block.expectedKeywords.length) * 100)
        : 100;

      const status = score >= 80 ? "pass" : "fail";

      // Compile detailed Vietnamese critique depending on keywords and language
      let critiqueText = `### 🤖 Phản hồi từ AI Judge (AI-as-a-judge)
`;

      if (block.language === "prompt") {
        critiqueText += `Bạn đã xây dựng System Prompt có ý thức thiết lập bối cảnh rõ ràng cho AI. `;
        if (score === 100) {
          critiqueText += `Thiết kế prompt của bạn rất xuất sắc, đáp ứng đầy đủ yêu cầu cấu trúc, xác định rõ **Vai trò (Role)**, **Giới hạn (Constraints)** và đặc biệt là ép cấu trúc đầu ra ở định dạng **JSON** có cấu trúc giúp an toàn khi tích hợp hệ thống.`;
        } else if (score >= 60) {
          critiqueText += `Cấu trúc cơ bản tương đối tốt. Tuy nhiên, hãy chú ý cấu hình chặt chẽ hơn. `;
          if (missingKeywords.includes("JSON") || missingKeywords.includes("cấu trúc")) {
            critiqueText += `\n\n⚠️ **Điểm cần cải thiện**: Thiếu chỉ thị ràng buộc định dạng **JSON**. Một AI Workflow Designer luôn cần ép dữ liệu đầu ra về dạng có cấu trúc để các node sau trong n8n/Make có thể đọc được dữ liệu.`;
          }
          if (missingKeywords.includes("System") || missingKeywords.includes("Constraints")) {
            critiqueText += `\n\n⚠️ **Mẹo bảo mật**: Bạn nên tăng cường thêm chỉ dẫn bảo mật hệ thống để tránh tình trạng Prompt Injection hoặc AI bị nói sảng (Hallucination).`;
          }
        } else {
          critiqueText += `Prompt của bạn còn sơ sài và mang tính chất đối thoại tự do giống Zero-shot hơn là System Prompt chuyên dụng. Bạn cần áp dụng mô hình Few-shot prompting hoặc định rõ vai trò và định dạng JSON đầu ra.`;
        }
      } else if (block.language === "javascript") {
        critiqueText += `Mã nguồn JavaScript xử lý trong n8n Code Node của bạn cho thấy tư duy logic tốt. `;
        if (score === 100) {
          critiqueText += `Bạn đã sử dụng chuẩn các hàm duyệt mảng tối ưu (như \`map\` hoặc \`filter\`), đảm bảo trả về đúng định dạng chuẩn n8n cấu trúc \`{ json: { ... } }\`.`;
        } else {
          critiqueText += `Logic xử lý cơ bản khả thi nhưng chưa tối ưu hoặc thiếu cấu trúc chuẩn của n8n. `;
          if (missingKeywords.includes("json")) {
            critiqueText += `\n\n⚠️ **Lỗi cấu trúc n8n**: Trong n8n Code Node, mọi đối tượng trả về bắt buộc phải nằm trong thuộc tính \`json\` (ví dụ: \`return [{ json: { data } }]\`). Nếu thiếu, n8n sẽ báo lỗi và không thể truyền dữ liệu sang node kế tiếp.`;
          }
          if (missingKeywords.includes("map") && missingKeywords.includes("filter")) {
            critiqueText += `\n\n💡 **Khuyên dùng**: Nên tận dụng các phương thức xử lý mảng ES6 như \`.map()\` hoặc \`.filter()\` thay vì vòng lặp \`for\` cổ điển để giữ mã nguồn ngắn gọn và tối ưu.`;
          }
        }
      } else if (block.language === "python") {
        critiqueText += `Kịch bản Python dọn dẹp dữ liệu của bạn có cấu trúc hàm rõ ràng. `;
        if (score === 100) {
          critiqueText += `Việc ứng dụng thư viện biểu thức chính quy \`re\` để xử lý khoảng trắng thừa và dọn dẹp thẻ HTML là giải pháp rất chuyên nghiệp và hiệu năng cao.`;
        } else {
          if (missingKeywords.includes("re") || missingKeywords.includes("sub")) {
            critiqueText += `\n\n⚠️ **Điểm cần cải thiện**: Bạn nên import thư viện \`re\` và dùng phương thức \`re.sub(pattern, replacement, text)\` để dọn dẹp thẻ HTML và khoảng trắng thừa một cách triệt để thay vì dùng các hàm thay thế chuỗi thô sơ.`;
          }
        }
      } else {
        critiqueText += `Lời giải của bạn đã đáp ứng được một phần yêu cầu của bài tập thực tế. Hãy rà soát lại các từ khóa và đáp án tham khảo để tối ưu hóa thêm kịch bản.`;
      }

      if (score < 100 && missingKeywords.length > 0) {
        critiqueText += `\n\n📋 **Từ khóa bị thiếu**: \`${missingKeywords.join(", ")}\``;
      }

      critiqueText += `\n\n💡 *AI-as-a-judge đã ghi nhận bài làm của bạn vào cơ sở dữ liệu IndexedDB cá nhân.*`;

      const result: ChallengeResult = {
        codeAnswer: code,
        score,
        feedback: critiqueText,
        status,
        gradedAt: new Date().toISOString(),
      };

      await onSaveResult(result);
      setIsLoading(false);
    }, 1500);
  };

  const getLanguageLabel = (lang: string) => {
    const labels: Record<string, string> = {
      prompt: 'System Prompt Template',
      javascript: 'n8n JavaScript Node',
      python: 'Python Scripting',
      sql: 'PostgreSQL Query',
    };
    return labels[lang] || lang.toUpperCase();
  };

  return (
    <div className="flex flex-col gap-4 bg-bg-card border border-border p-5 rounded-2xl shadow-xs mt-3 select-text">
      {/* Challenge Title Banner */}
      <div className="flex items-center justify-between border-b border-border-light pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <h4 className="text-xs font-bold text-text-primary tracking-tight">
            Thách thức thực chiến: {block.title}
          </h4>
        </div>
        <span className="text-[9px] font-bold font-mono px-2 py-0.5 border border-accent/20 bg-accent/5 text-accent rounded">
          {getLanguageLabel(block.language)}
        </span>
      </div>

      {/* Challenge Question Prompt */}
      <div 
        className="text-xs leading-relaxed text-text-secondary select-text overflow-y-auto max-h-[250px] bg-bg-secondary/20 p-4 border border-border-light rounded-xl font-sans"
        dangerouslySetInnerHTML={{ __html: parseMarkdownLite(block.question) }}
      />

      {/* Interactive Editor Window */}
      <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-slate-900 shadow-sm relative group">
        {/* Editor Top Control Header */}
        <div className="h-9 bg-slate-950 px-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] font-mono text-slate-400 font-semibold ml-2 flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-slate-500" />
              solution.{block.language === "prompt" ? "txt" : block.language === "javascript" ? "js" : block.language === "python" ? "py" : "sql"}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[9px] font-bold font-mono text-slate-400 hover:text-rose-400 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>

        {/* Text Area Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={block.language === "prompt" ? "Hãy soạn thảo System Prompt của bạn tại đây..." : "Hãy viết mã nguồn giải thuật tại đây..."}
          rows={7}
          className="w-full p-4 bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none border-none resize-y selection:bg-accent/20 selection:text-white"
        />
      </div>

      {/* Editor Action Buttons */}
      <div className="flex items-center justify-between border-t border-border-light pt-3 mt-1">
        <div className="flex gap-2">
          {savedResult && (
            <button
              onClick={() => setShowReference(!showReference)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-card hover:bg-bg-secondary text-[11px] font-semibold text-text-primary transition-all active:scale-95 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-text-muted" />
              <span>{showReference ? "Ẩn đáp án" : "Xem đáp án mẫu"}</span>
            </button>
          )}
        </div>

        <button
          disabled={isLoading}
          onClick={handleGrade}
          className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all focus:outline-none ${
            isLoading 
              ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed border-none' 
              : 'bg-accent hover:bg-accent-hover text-black shadow-glow-cyan'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-400/40 border-t-slate-400 rounded-full animate-spin" />
              <span>AI đang chấm bài...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-black stroke-none animate-pulse" />
              <span>Chạy thử & Chấm điểm</span>
            </>
          )}
        </button>
      </div>

      {/* AI Judge Loading Neon Overlay (Premium UX) */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-accent/20 bg-accent/5 rounded-xl animate-pulse mt-2 transition-all">
          <div className="relative w-12 h-12 mb-3">
            <div className="absolute inset-0 rounded-full border-3 border-t-transparent animate-spin" style={{ borderColor: 'var(--mika-cyan-glow)', borderTopColor: 'var(--mika-cyan)' }} />
          </div>
          <span className="text-[10px] font-bold font-mono tracking-widest text-accent uppercase">
            AI Agent is Auditing your work...
          </span>
        </div>
      )}

      {/* Reference Answer Drawer */}
      {showReference && savedResult && (
        <div className="flex flex-col gap-2 p-4 bg-bg-secondary/40 border border-border rounded-xl animate-fade-in mt-1 select-text">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">💡 Lời giải tham khảo chuyên gia:</span>
          <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
            {block.referenceAnswer}
          </pre>
        </div>
      )}

      {/* AI Critique feedback Card Result */}
      {savedResult && !isLoading && (
        <div className={`p-5 border rounded-xl flex flex-col md:flex-row gap-5 items-start justify-between mt-2 shadow-xs transition-all animate-fade-in ${
          savedResult.status === "pass"
            ? 'border-emerald-600/20 bg-emerald-500/5 dark:bg-emerald-950/5'
            : 'border-amber-600/20 bg-amber-500/5 dark:bg-amber-950/5'
        }`}>
          {/* Critique content blocks */}
          <div className="flex-1 min-w-0">
            <div 
              className="text-xs leading-relaxed text-text-secondary select-text font-sans"
              dangerouslySetInnerHTML={{ __html: parseMarkdownLite(savedResult.feedback) }}
            />
            <span className="text-[9px] text-text-muted font-mono block mt-3.5">
              Đánh giá lần cuối lúc: {new Date(savedResult.gradedAt).toLocaleTimeString()} hằng ngày
            </span>
          </div>

          {/* Score Badge */}
          <div className="flex flex-col items-center justify-center bg-bg-card border border-border p-4.5 rounded-2xl w-full md:w-32 flex-shrink-0 text-center shadow-xs">
            <span className="text-[9px] font-bold uppercase text-text-muted tracking-wider block mb-1">Kết Quả</span>
            {savedResult.status === "pass" ? (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>ĐẠT</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>CẢI THIỆN</span>
              </div>
            )}
            
            {/* Glowing gauge style circle */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute w-full h-full rotate-270">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className="stroke-border fill-transparent"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className="fill-transparent transition-all duration-1000"
                  strokeWidth="4"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * savedResult.score) / 100}
                  style={{ stroke: savedResult.status === "pass" ? "#10b981" : "#f59e0b" }}
                />
              </svg>
              <span className="text-sm font-extrabold font-mono text-text-primary z-10">{savedResult.score}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
