// src/data/phases/phase-0.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase0: Phase = {
  id: 0,
  title: "Hiểu Nghề & Định Hướng",
  subtitle: "Khám phá thế giới AI Workflow và xây dựng định hướng cá nhân",
  duration: "2 tuần",
  pace: "10 giờ/tuần",
  totalHours: 20,
  icon: "🧭",
  theme: phaseThemes[0],
  milestone: "Tạo lập bản Tuyên bố AI Designer cá nhân",
  outcome: "Hiểu rõ lộ trình học, cơ hội nghề nghiệp và công việc của AI Workflow Designer",
  tools: ["ChatGPT", "Notion", "Google Sheets"],
  modules: [
    {
      id: "m0-1",
      title: "Khám Phá Nghề AI Workflow Designer",
      type: "concept",
      estimatedHours: 6,
      description: "Hiểu rõ vai trò, trách nhiệm và cơ hội thị trường",
      lessons: [
        {
          id: "l0-1-1",
          title: "AI Workflow Designer là gì?",
          duration: "45 phút",
          type: "theory",
          summary: "Tìm hiểu vai trò, trách nhiệm hằng ngày và định vị của một AI Workflow Designer.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "1. AI Workflow Designer là gì?"
            },
            {
              type: "text",
              content: "AI Workflow Designer là người chuyên **thiết kế, xây dựng và tối ưu hoá các luồng công việc tự động** kết hợp trí tuệ nhân tạo (AI) để giải quyết các bài toán vận hành doanh nghiệp thực tế. Bạn là kiến trúc sư kết nối các công cụ no-code/low-code với sức mạnh tư duy của các mô hình ngôn ngữ lớn (LLM)."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Tóm gọn trong 1 câu",
              content: "AI Workflow Designer = Người kết nối AI + Công cụ tự động hóa + Quy trình kinh doanh thành hệ thống tự động sinh giá trị thực tế."
            },
            {
              type: "heading",
              level: 3,
              content: "Trách nhiệm chính hằng ngày"
            },
            {
              type: "bullets",
              items: [
                "**Phân tích quy trình (Process Audit)**: Tìm kiếm các công việc lặp đi lặp lại thủ công trong doanh nghiệp.",
                "**Thiết kế luồng tự động (Workflow Design)**: Vẽ sơ đồ logic chuyển đổi dữ liệu và rẽ nhánh.",
                "**Tích hợp hệ sinh thái (System Integration)**: Kết nối các phần mềm (Gmail, Sheets, CRMs) qua Webhooks và APIs.",
                "**Tối ưu hóa Prompts (AI Injection)**: Viết các prompt system thông minh trích xuất dữ liệu có cấu trúc JSON.",
                "**Giám sát & Bảo trì (Monitoring)**: Xử lý các lỗi bất thường khi API bên thứ ba thay đổi cấu trúc."
              ]
            }
          ],
          resources: [
            {
              title: "Tài liệu giới thiệu nghề nghiệp",
              url: "https://example.com/ai-career",
              kind: "free"
            }
          ]
        },
        {
          id: "l0-1-2",
          title: "Phân biệt với các vai trò AI khác",
          duration: "45 phút",
          type: "theory",
          summary: "So sánh sự khác biệt lớn giữa AI Workflow Designer, Prompt Engineer và AI Developer.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "So sánh với các nghề liên quan"
            },
            {
              type: "text",
              content: "Trong làn sóng phát triển trí tuệ nhân tạo, có nhiều vị trí công việc khác nhau. Việc hiểu rõ ranh giới kỹ năng giúp bạn định hình đúng lộ trình học tập."
            },
            {
              type: "table",
              headers: ["Tiêu chí", "AI Workflow Designer", "Prompt Engineer", "AI Developer"],
              rows: [
                ["Làm gì chính", "Thiết kế hệ thống tự động end-to-end", "Viết prompt tối ưu cho AI", "Lập trình thuật toán & model AI"],
                ["Công cụ cốt lõi", "n8n, Make.com, APIs, Scripting", "Giao diện chat, Prompt Libraries", "Python, PyTorch, TensorFlow"],
                ["Độ khó kỹ thuật", "Trung bình (No-code + Low-code)", "Thấp (Tư duy ngôn ngữ)", "Rất cao (Lập trình chuyên sâu)"],
                ["Focus chính", "Hiệu suất quy trình & Giá trị kinh doanh", "Chất lượng câu trả lời của AI", "Tốc độ và độ chính xác của model"],
                ["Sản phẩm đầu ra", "Hệ thống tự động hóa đơn hoàn chỉnh", "Prompts template hỗ trợ viết email", "Fine-tune model nhận diện hóa đơn"]
              ]
            },
            {
              type: "callout",
              variant: "info",
              title: "Lời khuyên định hướng",
              content: "Bạn không cần biết lập trình chuyên sâu như AI Developer để bắt đầu. Kỹ năng quan trọng nhất của bạn là **Tư duy logic quy trình** và **kết nối công nghệ**."
            }
          ]
        },
        {
          id: "l0-1-3",
          title: "Thị trường và Cơ hội nghề nghiệp",
          duration: "45 phút",
          type: "theory",
          summary: "Khảo sát thị trường việc làm, các dạng mô hình dịch vụ và mức thu nhập hấp dẫn.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Bốn mô hình hoạt động kinh doanh tự động hóa"
            },
            {
              type: "text",
              content: "Khi sở hữu kỹ năng AI Workflow Design, bạn có thể tự do lựa chọn 4 con đường sự nghiệp chính:"
            },
            {
              type: "bullets",
              items: [
                "**Freelancer chuyên nghiệp**: Nhận các dự án thiết kế tự động hóa trên Upwork, Fiverr với mức rate từ $30 - $100/giờ.",
                "**In-house Engineer**: Xây dựng hệ thống tự động hóa nội bộ cho các tập đoàn hoặc công ty công nghệ vừa và nhỏ.",
                "**AI Automation Agency (AAA)**: Thành lập đội nhóm cung cấp giải pháp tự động hóa trọn gói, thu phí thiết lập và phí bảo trì hằng tháng (retainer fee).",
                "**SaaS Builder**: Tự đóng gói một luồng workflow xuất sắc thành sản phẩm phần mềm dạng dịch vụ để bán định kỳ."
              ]
            },
            {
              type: "callout",
              variant: "example",
              title: "Mức thu nhập tham khảo",
              content: "Mức thu nhập của AI Workflow Designer tại thị trường Việt Nam dao động từ 15 - 35 triệu/tháng cho Junior/Mid. Trên thị trường quốc tế (Remote), con số này thường từ $3,000 - $8,000/tháng."
            }
          ]
        }
      ]
    },
    {
      id: "m0-2",
      title: "Kế Hoạch Định Hướng Cá Nhân",
      type: "practical",
      estimatedHours: 8,
      description: "Thực hành nghiên cứu thị trường và tự đánh giá năng lực hiện tại",
      lessons: [
        {
          id: "l0-2-1",
          title: "Lab 0.1: Nghiên cứu Job Description",
          duration: "2 giờ",
          type: "exercise",
          summary: "Tìm hiểu và phân tích các yêu cầu tuyển dụng thực tế trên thị trường toàn cầu.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Giúp bạn cọ xát trực tiếp với nhu cầu tuyển dụng thực tế từ thị trường, từ đó hiểu rõ những công cụ và kỹ năng nào đang được săn đón nhiều nhất."
            },
            {
              type: "steps",
              title: "Các bước thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Tìm kiếm cơ hội",
                  description: "Vào LinkedIn Jobs hoặc Upwork, gõ các từ khóa: 'AI Automation Specialist', 'n8n Developer', 'Make.com Automation'."
                },
                {
                  number: 2,
                  title: "Phân tích 5 tin tuyển dụng",
                  description: "Chọn ra 5 bài viết tuyển dụng/dự án thực tế. Sao chép các phần yêu cầu kỹ năng và công cụ."
                },
                {
                  number: 3,
                  title: "Lập bảng phân tích tổng hợp",
                  description: "Tổng hợp xem công cụ nào (ví dụ: Make, n8n, OpenAI, Airtable, Zapier) xuất hiện với tần suất cao nhất."
                }
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Sản phẩm cần nộp",
              content: "Bạn cần lưu kết quả phân tích này vào file `phase-0/jd-analysis.md` trong thư mục bài tập của mình."
            }
          ]
        },
        {
          id: "l0-2-2",
          title: "Lab 0.2: Tự đánh giá Bản thân",
          duration: "2 giờ",
          type: "exercise",
          summary: "Tạo ma trận đánh giá kỹ năng cá nhân ban đầu để đo lường khoảng cách năng lực.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Xác định rõ khoảng cách (gap) giữa năng lực hiện tại của bạn và các mục tiêu cần đạt để trở thành chuyên gia tự động hóa."
            },
            {
              type: "table",
              headers: ["Kỹ năng", "Mức hiện tại (1-5)", "Mức tiêu chuẩn cần đạt", "Khoảng cách cần bù đắp"],
              rows: [
                ["Tư duy quy trình logic", "Chưa đánh giá", "5", "Cần học sâu"],
                ["Làm chủ n8n/Make.com", "Chưa đánh giá", "5", "Cần thực hành lab"],
                ["Kỹ thuật Prompt Engineering", "Chưa đánh giá", "4", "Cần tối ưu prompts"],
                ["API & Webhooks", "Chưa đánh giá", "4", "Cần hiểu HTTP requests"],
                ["Lập trình bổ trợ (JS/Python)", "Chưa đánh giá", "3", "Cần viết script ngắn"]
              ]
            },
            {
              type: "checklist",
              title: "Checklist hoàn thành tự đánh giá:",
              items: [
                "Copy cấu trúc bảng ma trận kỹ năng vào file cá nhân.",
                "Thành thật điền điểm số hiện tại của bạn từ 1 đến 5.",
                "Ghi chép 3 hành động cụ thể bạn sẽ làm để thu hẹp khoảng cách này.",
                "Lưu tệp tin vào thư mục bài tập dưới tên `phase-0/self-assessment.md`."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m0-3",
      title: "Đánh Giá & Tuyên Bố Cá Nhân",
      type: "assessment",
      estimatedHours: 6,
      description: "Thực hiện bài kiểm tra cột mốc đầu tiên của khóa học",
      lessons: [
        {
          id: "l0-3-1",
          title: "Checkpoint Phase 0: Bản Tuyên bố AI Designer",
          duration: "3 giờ",
          type: "project",
          summary: "Xây dựng Tuyên ngôn AI Designer cá nhân mô tả mục tiêu học tập và cam kết hành động.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Bài kiểm tra tổng kết Phase 0"
            },
            {
              type: "text",
              content: "Bản tuyên bố cá nhân (Personal Statement) là cột mốc khẳng định sự nghiêm túc và mục tiêu định hướng của bạn trong suốt chặng đường 12 - 18 tháng tiếp theo."
            },
            {
              type: "steps",
              title: "Hướng dẫn thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Viết bài luận ngắn",
                  description: "Soạn thảo bài luận dài 200 - 300 từ mô tả: Lý do bạn chọn nghề, ngách thị trường bạn mong muốn phục vụ, và cam kết kỷ luật học tập."
                },
                {
                  number: 2,
                  title: "Gom toàn bộ sản phẩm",
                  description: "Gom cả 3 file: jd-analysis.md, self-assessment.md, và statement bài luận vào thư mục cục bộ `phase-0/`."
                },
                {
                  number: 3,
                  title: "Tích hợp và kiểm tra",
                  description: "Đảm bảo toàn bộ các tệp lưu trữ chuẩn chỉnh, không chứa liên kết lỗi."
                }
              ]
            },
            {
              type: "checklist",
              title: "Tiêu chí đánh giá vượt qua:",
              items: [
                "Nộp đủ 3/3 tệp tin bài tập quy định.",
                "Bản tuyên bố cá nhân thể hiện rõ nét cam kết và mục tiêu thực tế.",
                "Cấu trúc thư mục phase-0 được phân tách đúng chuẩn quy định."
              ]
            }
          ]
        }
      ]
    }
  ]
};
