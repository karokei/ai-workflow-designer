// src/data/curriculum.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from './themes';

export const CURRICULUM: Phase[] = [
  {
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
            content: []
          },
          {
            id: "l0-1-2",
            title: "Phân biệt với các vai trò AI khác",
            duration: "45 phút",
            type: "theory",
            summary: "So sánh sự khác biệt lớn giữa AI Workflow Designer, Prompt Engineer và AI Developer.",
            content: []
          },
          {
            id: "l0-1-3",
            title: "Thị trường và Cơ hội nghề nghiệp",
            duration: "45 phút",
            type: "theory",
            summary: "Khảo sát thị trường việc làm, các dạng mô hình dịch vụ và mức thu nhập hấp dẫn.",
            content: []
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
            content: []
          },
          {
            id: "l0-2-2",
            title: "Lab 0.2: Tự đánh giá Bản thân",
            duration: "2 giờ",
            type: "exercise",
            summary: "Tạo ma trận đánh giá kỹ năng cá nhân ban đầu để đo lường khoảng cách năng lực.",
            content: []
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
            content: []
          }
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Nền tảng AI & Kỹ thuật Prompt",
    subtitle: "Hiểu sâu cơ chế LLM, làm chủ prompt engineering nâng cao và gọi API",
    duration: "4-6 tuần",
    pace: "10 giờ/tuần",
    totalHours: 50,
    icon: "🧠",
    theme: phaseThemes[1],
    milestone: "Gọi thành công API & thiết lập 5 Prompt Templates thực chiến",
    outcome: "Làm chủ các mô hình suy luận, thiết lập cấu trúc Prompts tối ưu hóa và xuất bản dữ liệu dạng JSON",
    tools: ["OpenAI API", "Claude API", "Postman", "Playground"],
    modules: [
      {
        id: "m1-1",
        title: "Cơ Chế Hoạt Động Của LLM",
        type: "concept",
        estimatedHours: 12,
        description: "Thấu hiểu Token, Context Window và các siêu tham số điều khiển AI",
        lessons: [
          {
            id: "l1-1-1",
            title: "LLM Hoạt động Như Thế Nào? (Token, Context, Temp)",
            duration: "1 giờ",
            type: "theory",
            summary: "Tìm hiểu nguyên lý dự đoán token tiếp theo, khái niệm context window và siêu tham số Temperature.",
            content: []
          },
          {
            id: "l1-1-2",
            title: "Các model phổ biến và khi nào dùng",
            duration: "1 giờ",
            type: "theory",
            summary: "Phân loại các mô hình AI lớn hiện nay và tiêu chí lựa chọn cho từng quy trình công việc.",
            content: []
          }
        ]
      },
      {
        id: "m1-2",
        title: "Kỹ Thuật Prompt Engineering Chuyên Sâu",
        type: "concept",
        estimatedHours: 18,
        description: "Thực hành Few-shot, System Prompts, Structured Output và Chain of Thought",
        lessons: [
          {
            id: "l1-2-1",
            title: "Prompt Engineering - Từ Cơ bản đến Nâng cao",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Làm chủ từ Zero-shot đến Few-shot prompting giúp AI trả lời chính xác theo khuôn mẫu.",
            content: []
          },
          {
            id: "l1-2-2",
            title: "Few-shot Prompting & System Prompts",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Cấu trúc thiết lập System Prompts quy định vai trò, giới hạn hoạt động và hành vi cho AI.",
            content: []
          },
          {
            id: "l1-2-3",
            title: "Structured Output JSON",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Hướng dẫn ép AI trả về dữ liệu chuẩn JSON để kết nối mượt mà với các API và Databases khác.",
            content: []
          },
          {
            id: "l1-2-4",
            title: "Chain of Thought & Suy luận",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Tận dụng kỹ thuật kích thích AI suy luận từng bước (Chain of Thought) để giải bài toán phức tạp.",
            content: []
          }
        ]
      },
      {
        id: "m1-3",
        title: "API & Thực Hành Nền Tảng",
        type: "practical",
        estimatedHours: 20,
        description: "Thực hành gọi API, so sánh tham số, đếm tokens và xây dựng trợ lý AI đầu tiên",
        lessons: [
          {
            id: "l1-3-1",
            title: "REST API & Webhooks Cơ bản",
            duration: "1 giờ",
            type: "theory",
            summary: "Hiểu cách thức các ứng dụng phần mềm trò chuyện với nhau qua môi trường Internet.",
            content: []
          },
          {
            id: "l1-3-2",
            title: "Lab 1.1: Đếm Token và Ước tính Chi phí",
            duration: "2 giờ",
            type: "exercise",
            summary: "Sử dụng công cụ Tokenizer để tính toán số lượng tokens và quy đổi chi phí API thực tế.",
            content: []
          },
          {
            id: "l1-3-3",
            title: "Lab 1.2: So sánh Temperature",
            duration: "2 giờ",
            type: "exercise",
            summary: "Thực hành thay đổi tham số Temperature trong OpenAI Playground và phân tích kết quả.",
            content: []
          },
          {
            id: "l1-3-4",
            title: "Lab 1.3: Viết Prompt phân loại Email",
            duration: "3 giờ",
            type: "exercise",
            summary: "Xây dựng prompt few-shot phân loại các email gửi đến của khách hàng vào các hòm thư chuyên trách.",
            content: []
          },
          {
            id: "l1-3-5",
            title: "Lab 1.4: Structured Output JSON thực tế",
            duration: "3 giờ",
            type: "exercise",
            summary: "Thiết kế prompt trích xuất thông tin liên hệ từ cuộc hội thoại thô xuất ra định dạng JSON hợp lệ.",
            content: []
          },
          {
            id: "l1-3-6",
            title: "Lab 1.5: Gọi API lần đầu (curl / Postman)",
            duration: "3 giờ",
            type: "exercise",
            summary: "Thực hành gọi API OpenAI trực tiếp từ Command Line bằng curl hoặc công cụ Postman.",
            content: []
          },
          {
            id: "l1-3-7",
            title: "Checkpoint Phase 1: AI Trợ lý Phân tích Đơn hàng",
            duration: "4 giờ",
            type: "project",
            summary: "Xây dựng hệ thống prompts chuyên nghiệp trích xuất dữ liệu đơn hàng phức tạp ra định dạng JSON.",
            content: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Làm chủ Công cụ No-code n8n & Make",
    subtitle: "Xây dựng các hệ thống tự động hóa luồng dữ liệu (workflows) cấp doanh nghiệp",
    duration: "6-8 tuần",
    pace: "10 giờ/tuần",
    totalHours: 80,
    icon: "⚡",
    theme: phaseThemes[2],
    milestone: "Triển khai thành công 3 hệ thống tự động hóa vận hành thực tế",
    outcome: "Làm chủ Make.com và n8n chuyên sâu, kết nối Webhooks, cơ sở dữ liệu và AI thành chuỗi tự động",
    tools: ["n8n", "Make.com", "Airtable", "Telegram API", "Google Sheets"],
    modules: [
      {
        id: "m2-1",
        title: "Nguyên Lý Tự Động Hóa & Make.com",
        type: "concept",
        estimatedHours: 25,
        description: "Làm quen với khái niệm tự động hóa và nền tảng đám mây Make.com",
        lessons: [
          {
            id: "l2-1-1",
            title: "Workflow Automation là gì?",
            duration: "1 giờ",
            type: "theory",
            summary: "Tìm hiểu kiến trúc một luồng tự động hóa bao gồm Trigger, Action và các Router rẽ nhánh.",
            content: []
          },
          {
            id: "l2-1-2",
            title: "Make.com từ Zero đến Proficient",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Làm chủ nền tảng tự động hóa đám mây Make.com, Scenarios và Connections.",
            content: []
          },
          {
            id: "l2-1-3",
            title: "Lab 2.1: Cài đặt Môi trường & Khởi động",
            duration: "2 giờ",
            type: "exercise",
            summary: "Khởi tạo tài khoản Make.com và thiết lập môi trường n8n chạy local phục vụ thực hành.",
            content: []
          },
          {
            id: "l2-1-4",
            title: "Lab 2.2: Scenario 'Hello World' trên Make",
            duration: "2.5 giờ",
            type: "exercise",
            summary: "Xây dựng kịch bản tự động đầu tiên trên Make sử dụng Webhooks và HTTP requests.",
            content: []
          }
        ]
      },
      {
        id: "m2-2",
        title: "Làm Chủ n8n - Trái Tim Của Workflow",
        type: "practical",
        estimatedHours: 35,
        description: "Làm chủ n8n chuyên sâu, routers, iterators, và xử lý lỗi dữ liệu phức tạp",
        lessons: [
          {
            id: "l2-2-1",
            title: "n8n: Self-hosted Automation Powerhouse",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Tìm hiểu tại sao n8n là công cụ tự động hóa mã nguồn mở mạnh mẽ nhất hiện nay.",
            content: []
          },
          {
            id: "l2-2-2",
            title: "n8n Core Nodes & Giao diện",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Làm chủ các node xử lý logic quan trọng trong n8n: IF, Switch, Merge, Set.",
            content: []
          },
          {
            id: "l2-2-3",
            title: "Lab 2.3: Workflow n8n đầu tiên (Joke API)",
            duration: "3 giờ",
            type: "exercise",
            summary: "Tự dựng luồng n8n tự động lấy truyện cười từ API công cộng và xuất bản kết quả.",
            content: []
          },
          {
            id: "l2-2-4",
            title: "Lab 2.4: Router & Điều kiện rẽ nhánh",
            duration: "4 giờ",
            type: "exercise",
            summary: "Thực hành thiết lập điều kiện so sánh rẽ nhánh phức tạp trong luồng dữ liệu n8n.",
            content: []
          },
          {
            id: "l2-2-5",
            title: "Lab 2.5: Iterator & Lặp danh sách",
            duration: "4 giờ",
            type: "exercise",
            summary: "Thực hành kỹ năng duyệt danh sách (Iterator/Loop) nâng cao để xử lý nhiều bản ghi dữ liệu cùng lúc.",
            content: []
          },
          {
            id: "l2-2-6",
            title: "Lab 2.6: Error Handling & Retry Logic",
            duration: "4 giờ",
            type: "exercise",
            summary: "Thiết lập cơ chế tự động thử lại (Retry) và xử lý lỗi khi gọi các API bên ngoài không ổn định.",
            content: []
          }
        ]
      },
      {
        id: "m2-3",
        title: "Tích Hợp AI Thực Chiến",
        type: "practical",
        estimatedHours: 20,
        description: "Ứng dụng các mô hình tích hợp AI kết nối tự động vào luồng quy trình vận hành thực tế",
        lessons: [
          {
            id: "l2-3-1",
            title: "5 AI Integration Patterns",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Khám phá 5 mô hình tích hợp AI cốt lõi: Phân loại, Trích xuất, Sinh nội dung, QC, và Điều hướng.",
            content: []
          },
          {
            id: "l2-3-2",
            title: "Lab 2.7: Tích hợp AI Email Classifier",
            duration: "4 giờ",
            type: "exercise",
            summary: "Xây dựng hệ thống tự động nhận email, gọi OpenAI phân loại độ khẩn cấp và sắc thái email.",
            content: []
          },
          {
            id: "l2-3-3",
            title: "Checkpoint Phase 2: Workflow 'Daily News Digest' tự động",
            duration: "5 giờ",
            type: "project",
            summary: "Dự án lớn tổng kết Phase 2: xây dựng hệ thống tự động thu thập tin tức, gọi AI tóm tắt thông tin hằng ngày.",
            content: []
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Kỹ năng Kỹ thuật Bổ trợ",
    subtitle: "Trang bị kỹ năng lập trình kịch bản Python/JS, Webhooks nâng cao và cơ sở dữ liệu SQL",
    duration: "6-8 tuần",
    pace: "10 giờ/tuần",
    totalHours: 45,
    icon: "🔧",
    theme: phaseThemes[3],
    milestone: "Xây dựng thành công đường ống dẫn dữ liệu (Data Pipeline) tự động qua Python & Supabase",
    outcome: "Viết được script Python xử lý dữ liệu lớn, làm chủ JavaScript n8n Code Node và truy vấn SQL thuần thục",
    tools: ["Python", "JavaScript", "SQL", "Supabase", "pgvector"],
    modules: [
      {
        id: "m3-1",
        title: "Python Thực Dụng Cho AI Workflow",
        type: "concept",
        estimatedHours: 15,
        description: "Học lập trình Python thực dụng phục vụ làm sạch văn bản và gọi API nâng cao",
        lessons: [
          {
            id: "l3-1-1",
            title: "Python cho AI Workflow",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Tìm hiểu tại sao Python cần thiết cho tự động hóa và các thư viện cốt lõi json, requests, pandas.",
            content: []
          },
          {
            id: "l3-1-2",
            title: "Lab 3.1: Python - Text Cleaner Script",
            duration: "3 giờ",
            type: "exercise",
            summary: "Viết kịch bản Python lọc bỏ mã HTML, khoảng trắng thừa và ký tự đặc biệt ra khỏi văn bản thô.",
            content: []
          },
          {
            id: "l3-1-3",
            title: "Lab 3.2: Python - API Caller",
            duration: "3.5 giờ",
            type: "exercise",
            summary: "Viết script Python đọc tệp tin prompt cục bộ, gọi API OpenAI và xuất kết quả phản hồi ra tệp JSON.",
            content: []
          }
        ]
      },
      {
        id: "m3-2",
        title: "JavaScript/TypeScript trong n8n",
        type: "practical",
        estimatedHours: 12,
        description: "Thao tác biến đổi mảng, chuẩn hóa dữ liệu phức tạp trong n8n Code Node",
        lessons: [
          {
            id: "l3-2-1",
            title: "JavaScript/TypeScript trong n8n",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Tìm hiểu cách sử dụng Code Node trong n8n để tùy biến xử lý mảng và biến đổi JSON dữ liệu.",
            content: []
          },
          {
            id: "l3-2-2",
            title: "Lab 3.3: JavaScript - n8n Code Node thực hành",
            duration: "3.5 giờ",
            type: "exercise",
            summary: "Thực hành viết các kịch bản JS xử lý mảng, biến đổi định dạng ngày tháng và lọc dữ liệu đơn hàng.",
            content: []
          }
        ]
      },
      {
        id: "m3-3",
        title: "Nghiệp Vụ API, Webhooks & SQL",
        type: "assessment",
        estimatedHours: 18,
        description: "Thực hành thiết kế REST API, Webhooks và lưu trữ cơ sở dữ liệu quan hệ SQL",
        lessons: [
          {
            id: "l3-3-1",
            title: "REST API & Webhooks nâng cao",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Hiểu sâu kiến trúc Webhook Trigger và cơ chế bảo mật xác thực (API Keys, Bearer Tokens).",
            content: []
          },
          {
            id: "l3-3-2",
            title: "SQL cơ bản cho Workflow",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Làm chủ các câu lệnh truy vấn quan hệ PostgreSQL cốt lõi phục vụ lưu trữ.",
            content: []
          },
          {
            id: "l3-3-3",
            title: "Lab 3.4: Webhook Trigger thực hành",
            duration: "3 giờ",
            type: "exercise",
            summary: "Xây dựng luồng tự động hóa n8n sử dụng Webhook Trigger nhận dữ liệu từ script Python gửi tới.",
            content: []
          },
          {
            id: "l3-3-4",
            title: "Lab 3.5: SQL - Supabase thực hành",
            duration: "3 giờ",
            type: "exercise",
            summary: "Tạo dự án đám mây Supabase, thực hành viết lệnh tạo bảng và kết nối đọc/ghi từ n8n.",
            content: []
          },
          {
            id: "l3-3-5",
            title: "Checkpoint Phase 3: Data Pipeline hoàn chỉnh",
            duration: "5 giờ",
            type: "project",
            summary: "Xây dựng đường ống dẫn dữ liệu tích hợp Python, Webhook, n8n Code Node, OpenAI và Supabase SQL.",
            content: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "AI Agent & Advanced Workflow",
    subtitle: "Xây dựng các hệ thống tác tử AI thông minh (AI Agents) tự động suy luận và sử dụng công cụ",
    duration: "8-10 tuần",
    pace: "12 giờ/tuần",
    totalHours: 120,
    icon: "🤖",
    theme: phaseThemes[4],
    milestone: "Triển khai thành công hệ thống RAG Chatbot doanh nghiệp đưa vào hoạt động thực tế",
    outcome: "Làm chủ cơ chế suy luận ReAct, kỹ thuật Function Calling, thiết lập hệ thống RAG và làm việc với Vector Databases",
    tools: ["n8n Agent Node", "OpenAI Tool Calling", "Flowise", "Dify", "Pinecone", "ChromaDB"],
    modules: [
      {
        id: "m4-1",
        title: "Kiến Trúc AI Agent",
        type: "concept",
        estimatedHours: 40,
        description: "Thấu hiểu sự khác biệt của AI Agent, mô hình suy luận ReAct và gọi công cụ thông minh",
        lessons: [
          {
            id: "l4-1-1",
            title: "AI Agent là gì?",
            duration: "2 giờ",
            type: "theory",
            summary: "Phân biệt Chatbot thông thường và AI Agent dựa trên khả năng chủ động lập kế hoạch và sử dụng công cụ.",
            content: []
          },
          {
            id: "l4-1-2",
            title: "ReAct Pattern (Reasoning + Acting)",
            duration: "2 giờ",
            type: "theory",
            summary: "Tìm hiểu vòng lặp suy luận ReAct nổi tiếng giúp AI tự động rẽ nhánh hành vi xử lý.",
            content: []
          },
          {
            id: "l4-1-3",
            title: "Tool Calling / Function Calling",
            duration: "2 giờ",
            type: "theory",
            summary: "Định cấu hình định nghĩa Tools dưới dạng JSON Schema hướng dẫn AI gọi hàm chính xác.",
            content: []
          }
        ]
      },
      {
        id: "m4-2",
        title: "RAG & Vector Database",
        type: "concept",
        estimatedHours: 40,
        description: "Làm chủ mô hình truy xuất thông tin RAG và làm việc với các cơ sở dữ liệu Vector nâng cao",
        lessons: [
          {
            id: "l4-2-1",
            title: "RAG - Retrieval Augmented Generation",
            duration: "2 giờ",
            type: "theory",
            summary: "Tìm hiểu kiến trúc nạp tri thức ngoài RAG giúp AI trả lời dựa trên dữ liệu riêng của công ty.",
            content: []
          },
          {
            id: "l4-2-2",
            title: "Chiến lược chia nhỏ dữ liệu (Chunking Strategy)",
            duration: "2 giờ",
            type: "theory",
            summary: "Tìm hiểu các kỹ thuật chia nhỏ tài liệu (Fixed-size, Sentence, Semantic) để tối ưu hóa context.",
            content: []
          },
          {
            id: "l4-2-3",
            title: "Vector Database",
            duration: "2 giờ",
            type: "theory",
            summary: "Hiểu khái niệm biểu diễn văn bản thành số (Embeddings) và các cơ sở dữ liệu Vector phổ biến.",
            content: []
          }
        ]
      },
      {
        id: "m4-3",
        title: "Thực Hành Xây Trợ Lý Thông Minh",
        type: "practical",
        estimatedHours: 40,
        description: "Thực hành xây dựng RAG pipeline, tool calling và AI Agent hoàn chỉnh trên n8n, Dify và Flowise",
        lessons: [
          {
            id: "l4-3-1",
            title: "Lab 4.1: Tool Calling cơ bản",
            duration: "3 giờ",
            type: "exercise",
            summary: "Viết kịch bản Python khai báo tools và gọi OpenAI API trích xuất câu hỏi chọn tool.",
            content: []
          },
          {
            id: "l4-3-2",
            title: "Lab 4.2: RAG đơn giản với Supabase",
            duration: "4 giờ",
            type: "exercise",
            summary: "Xây dựng quy trình RAG cơ bản: tạo embeddings và lưu trữ, truy vấn tương đồng trên Supabase pgvector.",
            content: []
          },
          {
            id: "l4-3-3",
            title: "Lab 4.3: AI Agent trong n8n",
            duration: "4 giờ",
            type: "exercise",
            summary: "Tạo tác tử AI hoàn chỉnh trong n8n sử dụng n8n Agent Node và cấu hình 3 công cụ tích hợp.",
            content: []
          },
          {
            id: "l4-3-4",
            title: "Lab 4.4: Chatbot RAG với Flowise/Dify",
            duration: "4 giờ",
            type: "exercise",
            summary: "Thiết lập chatbot RAG không code cực nhanh sử dụng nền tảng Flowise hoặc Dify kéo thả.",
            content: []
          },
          {
            id: "l4-3-5",
            title: "Checkpoint Phase 4: AI Knowledge Assistant",
            duration: "5 giờ",
            type: "project",
            summary: "Xây dựng hệ thống tác tử AI thông minh hoàn chỉnh tự động tra cứu dữ liệu (RAG) kết hợp tìm kiếm web.",
            content: []
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Portfolio & Kỹ năng Nghề nghiệp",
    subtitle: "Đóng gói 5 dự án thực chiến lớn, làm chủ kỹ năng phân tích nghiệp vụ BA và thương mại hóa năng lực",
    duration: "6-8 tuần",
    pace: "10 giờ/tuần",
    totalHours: 60,
    icon: "💼",
    theme: phaseThemes[5],
    milestone: "Hoàn thiện Website Portfolio và hồ sơ năng lực Upwork đạt chuẩn chuyên gia",
    outcome: "Hoàn thành 5 dự án lớn, biết phân tích quy trình nghiệp vụ doanh nghiệp và định giá dịch vụ tự động hóa",
    tools: ["Notion Portfolio", "Upwork Profile", "Airtable CRM", "OpenAI Vision", "Whisper API"],
    modules: [
      {
        id: "m5-1",
        title: "Phân Tích Nghiệp Vụ BA & Thương Mại Hóa",
        type: "concept",
        estimatedHours: 20,
        description: "Học kỹ năng phân tích quy trình vận hành và đóng gói dịch vụ bán cho doanh nghiệp",
        lessons: [
          {
            id: "l5-1-1",
            title: "Business Analysis cho AI Workflow",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Cách thức tìm kiếm nỗi đau vận hành của doanh nghiệp và tính toán chỉ số ROI tự động hóa.",
            content: []
          },
          {
            id: "l5-1-2",
            title: "Cách Trình bày Dự án trong Portfolio",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Cấu trúc kể chuyện kỹ thuật (Problem-to-Solution) thuyết phục khách hàng ra quyết định ký hợp đồng.",
            content: []
          },
          {
            id: "l5-1-3",
            title: "Thương Mại Hóa Kỹ Năng & Phát Triển Sự Nghiệp",
            duration: "1.5 giờ",
            type: "theory",
            summary: "Định hình dịch vụ Freelancer chuyên nghiệp, Agency tự động hóa và các gói phí bảo trì hằng tháng.",
            content: []
          }
        ]
      },
      {
        id: "m5-2",
        title: "Thực Hành Xây Dựng 5 Dự Án Thực Chiến",
        type: "practical",
        estimatedHours: 35,
        description: "Thực hành xây dựng và đóng gói 5 siêu dự án tự động hóa thực tế cho Portfolio cá nhân",
        lessons: [
          {
            id: "l5-2-1",
            title: "Project 1: AI Customer Support Bot",
            duration: "7 giờ",
            type: "project",
            summary: "Thiết kế và triển khai chatbot đa kênh tích hợp cơ sở tri thức FAQ tự động trả lời khách hàng.",
            content: []
          },
          {
            id: "l5-2-2",
            title: "Project 2: Content Repurposing Pipeline",
            duration: "7 giờ",
            type: "project",
            summary: "Xây dựng hệ thống tự động nhận bài blog/video transcript, dùng AI biên dịch thành 5 tweet threads và LinkedIn post.",
            content: []
          },
          {
            id: "l5-2-3",
            title: "Project 3: Invoice Processing Automation",
            duration: "7 giờ",
            type: "project",
            summary: "Xây dựng luồng tự động hóa OCR/Vision trích xuất hóa đơn đầu vào và ghi tự động vào database kế toán.",
            content: []
          },
          {
            id: "l5-2-4",
            title: "Project 4: AI Meeting Note Taker",
            duration: "7 giờ",
            type: "project",
            summary: "Xây dựng luồng tự động nhận audio ghi âm cuộc họp, transcribe thành text, và AI summarize xuất action items.",
            content: []
          },
          {
            id: "l5-2-5",
            title: "Project 5: AI-Powered Lead Scoring",
            duration: "7 giờ",
            type: "project",
            summary: "Thiết kế luồng nhận thông tin khách đăng ký, gọi AI phân tích quy mô doanh nghiệp và tự chấm điểm chất lượng lead.",
            content: []
          }
        ]
      },
      {
        id: "m5-3",
        title: "Nghiệm Thu Portfolio",
        type: "assessment",
        estimatedHours: 5,
        description: "Thực hiện bài kiểm tra đóng gói và nghiệm thu toàn bộ danh mục 5 dự án thực chiến lớn",
        lessons: [
          {
            id: "l5-3-1",
            title: "Checkpoint Phase 5: Portfolio hoàn thiện",
            duration: "5 giờ",
            type: "project",
            summary: "Bài kiểm tra tổng kết: xuất bản website portfolio cá nhân chứa đầy đủ tài liệu và demo của 5 dự án thực chiến.",
            content: []
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Chuyên sâu & Chuyên biệt hóa",
    subtitle: "Tìm kiếm ngách dịch vụ độc quyền, tối ưu hóa chi phí vận hành và đóng gói sản phẩm thương mại hóa chuyên nghiệp",
    duration: "8-12 tuần",
    pace: "10 giờ/tuần",
    totalHours: 80,
    icon: "⭐",
    theme: phaseThemes[6],
    milestone: "Đóng gói thành công 1 sản phẩm tự động hóa thương mại và thực hiện demo thuyết trình cho 3 khách hàng thực tế",
    outcome: "Làm chủ kỹ năng Fine-tuning, xây dựng hệ thống đánh giá AI tự động (Evaluation System), thiết kế pricing model chuyên nghiệp",
    tools: ["LLM Evaluation Pipeline", "Redis Caching", "Cost Optimization Router", "Pitch Deck Template"],
    modules: [
      {
        id: "m6-1",
        title: "Chọn Ngách & Tối Ưu Nâng Cao",
        type: "concept",
        estimatedHours: 30,
        description: "Định hình ngách dịch vụ độc quyền và áp dụng các kỹ thuật bảo mật, nén chi phí vận hành AI",
        lessons: [
          {
            id: "l6-1-1",
            title: "Chọn ngách Chuyên biệt",
            duration: "2 giờ",
            type: "theory",
            summary: "Tìm hiểu tại sao định vị ngách chuyên sâu (Niche Selection) giúp tăng giá trị dịch vụ lên gấp 5 lần.",
            content: []
          },
          {
            id: "l6-1-2",
            title: "Chủ đề Nâng cao (Fine-tuning, Evaluation, Cost Optimization, Security)",
            duration: "2.5 giờ",
            type: "theory",
            summary: "Làm chủ kỹ thuật nén chi phí gọi mô hình, bảo mật thông tin nhạy cảm và đánh giá sai số của AI.",
            content: []
          },
          {
            id: "l6-1-3",
            title: "Xây Dựng Thương Hiệu Cá Nhân trong Lĩnh Vực AI Automation",
            duration: "2 giờ",
            type: "theory",
            summary: "Cách thức viết case study xuất sắc thu hút inbound leads chất lượng cao trên LinkedIn.",
            content: []
          }
        ]
      },
      {
        id: "m6-2",
        title: "Thực Hành Đóng Gói & Đánh Giá",
        type: "practical",
        estimatedHours: 35,
        description: "Thực hành thương mại hóa sản phẩm tự động và xây dựng quy trình tự động đánh giá AI",
        lessons: [
          {
            id: "l6-2-1",
            title: "Lab 6.1: Đóng gói Workflow thành Sản phẩm (Productization)",
            duration: "4 giờ",
            type: "exercise",
            summary: "Đóng gói giải pháp tự động hóa thành sản phẩm thương mại đi kèm tài liệu hướng dẫn và bảng giá.",
            content: []
          },
          {
            id: "l6-2-2",
            title: "Lab 6.2: Hệ thống đánh giá tự động (Evaluation System)",
            duration: "4 giờ",
            type: "exercise",
            summary: "Xây dựng chương trình Python đánh giá chất lượng câu trả lời của AI dựa trên bộ câu hỏi chuẩn.",
            content: []
          }
        ]
      },
      {
        id: "m6-3",
        title: "Checkpoint Tốt Nghiệp",
        type: "assessment",
        estimatedHours: 15,
        description: "Thực hiện dự án thực tế tốt nghiệp, thuyết demo và chuyển giao công nghệ thực tế",
        lessons: [
          {
            id: "l6-3-1",
            title: "Checkpoint Phase 6: Sẵn sàng thực chiến doanh nghiệp",
            duration: "15 giờ",
            type: "project",
            summary: "Bài kiểm tra tốt nghiệp cuối khóa: thực hiện demo pitching giải pháp tự động hóa cho ít nhất 3 khách hàng thực tế.",
            content: []
          }
        ]
      }
    ]
  }
];
