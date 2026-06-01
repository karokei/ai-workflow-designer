// src/services/ai.ts
import type { ChallengeBlock } from '@/types/curriculum';
import type { ChallengeResult } from '@/types/progress';

const STORAGE_SESSION_KEY = 'aiwfd:ai-calls-count';
const DEFAULT_MAX_CALLS = 10;

/**
 * Lấy giới hạn lượt gọi AI tối đa trong session từ biến môi trường
 */
export function getMaxCallsLimit(): number {
  const envVal = import.meta.env.VITE_AI_JUDGE_MAX_CALLS;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    return isNaN(parsed) ? DEFAULT_MAX_CALLS : parsed;
  }
  return DEFAULT_MAX_CALLS;
}

/**
 * Lấy số lần đã gọi AI trong session hiện tại
 */
export function getSessionCallCount(): number {
  try {
    const saved = sessionStorage.getItem(STORAGE_SESSION_KEY);
    return saved ? parseInt(saved, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Tăng số lần gọi AI trong session hiện tại thêm 1
 */
function incrementSessionCallCount(): void {
  try {
    const current = getSessionCallCount();
    sessionStorage.setItem(STORAGE_SESSION_KEY, (current + 1).toString());
  } catch (err) {
    console.warn('Failed to update session storage for rate limit count:', err);
  }
}

/**
 * Kiểm tra xem session hiện tại đã vượt quá giới hạn gọi AI chưa
 */
export function checkRateLimit(): { allowed: boolean; count: number; limit: number } {
  const count = getSessionCallCount();
  const limit = getMaxCallsLimit();
  return {
    allowed: count < limit,
    count,
    limit,
  };
}

/**
 * Chấm điểm ngoại tuyến dựa trên từ khóa mong đợi (Offline Fallback)
 */
export function gradeChallengeOffline(code: string, block: ChallengeBlock): ChallengeResult {
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

  // Công thức tính điểm đơn giản dựa trên từ khóa
  const score = block.expectedKeywords.length > 0
    ? Math.round((matchedKeywords.length / block.expectedKeywords.length) * 100)
    : 100;

  const status = score >= 80 ? 'pass' : 'fail';

  // Biên soạn phản hồi tiếng Việt chi tiết
  let critiqueText = `### 🤖 Phản hồi từ AI Judge (Chế độ Offline)

`;

  if (block.language === 'prompt') {
    critiqueText += `Bạn đã xây dựng System Prompt có ý thức thiết lập bối cảnh rõ ràng cho AI. `;
    if (score === 100) {
      critiqueText += `Thiết kế prompt của bạn rất xuất sắc, đáp ứng đầy đủ yêu cầu cấu trúc, xác định rõ **Vai trò (Role)**, **Giới hạn (Constraints)** và đặc biệt là ép cấu trúc đầu ra ở định dạng **JSON** có cấu trúc giúp an toàn khi tích hợp hệ thống.`;
    } else if (score >= 60) {
      critiqueText += `Cấu trúc cơ bản tương đối tốt. Tuy nhiên, hãy chú ý cấu hình chặt chẽ hơn. `;
      if (missingKeywords.includes('JSON') || missingKeywords.includes('cấu trúc')) {
        critiqueText += `\n\n⚠️ **Điểm cần cải thiện**: Thiếu chỉ thị ràng buộc định dạng **JSON**. Một AI Workflow Designer luôn cần ép dữ liệu đầu ra về dạng có cấu trúc để các node sau trong n8n/Make có thể đọc được dữ liệu.`;
      }
      if (missingKeywords.includes('System') || missingKeywords.includes('Constraints')) {
        critiqueText += `\n\n⚠️ **Mẹo bảo mật**: Bạn nên tăng cường thêm chỉ dẫn bảo mật hệ thống để tránh tình trạng Prompt Injection hoặc AI bị nói sảng (Hallucination).`;
      }
    } else {
      critiqueText += `Prompt của bạn còn sơ sài và mang tính chất đối thoại tự do giống Zero-shot hơn là System Prompt chuyên dụng. Bạn cần áp dụng mô hình Few-shot prompting hoặc định rõ vai trò và định dạng JSON đầu ra.`;
    }
  } else if (block.language === 'javascript') {
    critiqueText += `Mã nguồn JavaScript xử lý trong n8n Code Node của bạn cho thấy tư duy logic tốt. `;
    if (score === 100) {
      critiqueText += `Bạn đã sử dụng chuẩn các hàm duyệt mảng tối ưu (như \`map\` hoặc \`filter\`), đảm bảo trả về đúng định dạng chuẩn n8n cấu trúc \`{ json: { ... } }\`.`;
    } else {
      critiqueText += `Logic xử lý cơ bản khả thi nhưng chưa tối ưu hoặc thiếu cấu trúc chuẩn của n8n. `;
      if (missingKeywords.includes('json')) {
        critiqueText += `\n\n⚠️ **Lỗi cấu trúc n8n**: Trong n8n Code Node, mọi đối tượng trả về bắt buộc phải nằm trong thuộc tính \`json\` (ví dụ: \`return [{ json: { data } }]\`). Nếu thiếu, n8n sẽ báo lỗi và không thể truyền dữ liệu sang node kế tiếp.`;
      }
      if (missingKeywords.includes('map') && missingKeywords.includes('filter')) {
        critiqueText += `\n\n💡 **Khuyên dùng**: Nên tận dụng các phương thức xử lý mảng ES6 như \`.map()\` hoặc \`.filter()\` thay vì vòng lặp \`for\` cổ điển để giữ mã nguồn ngắn gọn và tối ưu.`;
      }
    }
  } else if (block.language === 'python') {
    critiqueText += `Kịch bản Python dọn dẹp dữ liệu của bạn có cấu trúc hàm rõ ràng. `;
    if (score === 100) {
      critiqueText += `Việc ứng dụng thư viện biểu thức chính quy \`re\` để xử lý khoảng trắng thừa và dọn dẹp thẻ HTML là giải pháp rất chuyên nghiệp và hiệu năng cao.`;
    } else {
      if (missingKeywords.includes('re') || missingKeywords.includes('sub')) {
        critiqueText += `\n\n⚠️ **Điểm cần cải thiện**: Bạn nên import thư viện \`re\` và dùng phương thức \`re.sub(pattern, replacement, text)\` để dọn dẹp thẻ HTML và khoảng trắng thừa một cách triệt để thay vì dùng các hàm thay thế chuỗi thô sơ.`;
      }
    }
  } else {
    critiqueText += `Lời giải của bạn đã đáp ứng được một phần yêu cầu của bài tập thực tế. Hãy rà soát lại các từ khóa và đáp án tham khảo để tối ưu hóa thêm kịch bản.`;
  }

  if (score < 100 && missingKeywords.length > 0) {
    critiqueText += `\n\n📋 **Từ khóa bị thiếu**: \`${missingKeywords.join(', ')}\``;
  }

  critiqueText += `\n\n💡 *Học viện đã sử dụng mô hình đối sánh từ khóa ngoại tuyến để chấm bài cho bạn nhanh chóng.*`;

  return {
    codeAnswer: code,
    score,
    feedback: critiqueText,
    status,
    gradedAt: new Date().toISOString(),
  };
}

/**
 * Gọi API chấm điểm bằng Trí Tuệ Nhân Tạo (AI-as-a-judge)
 */
export async function gradeChallenge(code: string, block: ChallengeBlock): Promise<ChallengeResult> {
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    throw new Error(`Đã vượt quá giới hạn gọi AI trong phiên này (${rateLimit.count}/${rateLimit.limit} lần). Vui lòng tải lại trang hoặc thử lại sau.`);
  }

  incrementSessionCallCount();

  const apiKey = import.meta.env.VITE_API_KEY;

  // Nếu không có API Key, tự động chuyển sang offline fallback
  if (!apiKey || apiKey === 'your_api_key_here') {
    // Giả lập độ trễ mạng nhẹ (600ms) cho cảm giác premium
    await new Promise((resolve) => setTimeout(resolve, 600));
    return gradeChallengeOffline(code, block);
  }

  // Nếu có API Key, chúng ta thực hiện gọi Google Gemini API
  try {
    const prompt = `Bạn là một AI Judge chuyên gia chấm điểm bài tập cho học viên học thiết kế AI Workflow (n8n/Make.com).
Hãy chấm điểm bài tập sau của học viên.

[Tên bài tập]: ${block.title}
[Yêu cầu đề bài]:
${block.question}

[Ngôn ngữ yêu cầu]: ${block.language}
[Đáp án tham khảo của chuyên gia]:
${block.referenceAnswer}

[Từ khóa bắt buộc có]: ${block.expectedKeywords.join(', ')}

[Bài làm của học viên]:
\`\`\`${block.language}
${code}
\`\`\`

Yêu cầu chấm điểm nghiêm ngặt:
1. Đánh giá xem bài làm có chạy được không, có đúng logic nghiệp vụ của đề bài không.
2. Kiểm tra xem có chứa các từ khóa bắt buộc không.
3. Cho điểm từ 0 đến 100.
4. Trả về phản hồi chi tiết bằng TIẾNG VIỆT dưới định dạng JSON sau (không chứa markdown wrapper bên ngoài JSON):
{
  "score": number,
  "status": "pass" | "fail",
  "feedback": "Phản hồi chi tiết dạng markdown tiếng Việt của bạn ở đây. Hãy chỉ rõ ưu điểm, nhược điểm, lỗi cú pháp hoặc cấu trúc n8n/Make nếu có, kèm hướng dẫn sửa lỗi chuyên sâu. Tránh khen ngợi sáo rỗng."
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google API returned status ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      throw new Error('Empty response from Google AI API');
    }

    const resultJson = JSON.parse(responseText.trim()) as {
      score: number;
      status: 'pass' | 'fail';
      feedback: string;
    };

    return {
      codeAnswer: code,
      score: typeof resultJson.score === 'number' ? resultJson.score : 0,
      feedback: resultJson.feedback || 'Không có phản hồi từ AI.',
      status: resultJson.status === 'pass' ? 'pass' : 'fail',
      gradedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Gemini AI-as-a-judge failed, fallback to offline grading:', err);
    // Fallback sang offline grading nếu gọi API lỗi
    return gradeChallengeOffline(code, block);
  }
}
