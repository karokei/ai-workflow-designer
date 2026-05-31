// src/data/phases/phase-4.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase4: Phase = {
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
          content: [
            {
              type: "heading",
              level: 2,
              content: "Khái niệm AI Agent"
            },
            {
              type: "text",
              content: "AI Agent (Tác tử AI) là một hệ thống phần mềm trí tuệ nhân tạo **không chỉ trò chuyện đơn thuần**, mà có khả năng tự nhận thức mục tiêu, tự lập kế hoạch hành động, chủ động lựa chọn và sử dụng các công cụ bên ngoài (APIs, search web, database) để giải quyết nhiệm vụ phức tạp."
            },
            {
              type: "callout",
              variant: "important",
              title: "Sự khác biệt cốt lõi",
              content: "**Chatbot**: Hỏi ➔ Trả lời (Dựa trên tri thức sẵn có trong đầu).\n\n**AI Agent**: Hỏi ➔ Suy nghĩ (Lên kế hoạch) ➔ Gọi công cụ ➔ Nhận kết quả ➔ Đánh giá kết quả ➔ Trả lời."
            }
          ]
        },
        {
          id: "l4-1-2",
          title: "ReAct Pattern (Reasoning + Acting)",
          duration: "2 giờ",
          type: "theory",
          summary: "Tìm hiểu vòng lặp suy luận ReAct nổi tiếng giúp AI tự động rẽ nhánh hành vi xử lý.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Vòng lặp ReAct là gì?"
            },
            {
              type: "text",
              content: "ReAct là từ ghép của **Reasoning (Suy luận)** và **Acting (Hành động)**. Đây là pattern thiết kế AI Agent phổ biến nhất giúp AI giải bài toán theo chu kỳ khép kín:"
            },
            {
              type: "numbered",
              items: [
                "**Thought (Suy nghĩ)**: Phân tích xem bước tiếp theo cần làm gì? Cần thông tin gì?",
                "**Action (Hành động)**: Chọn và gọi một công cụ phù hợp (ví dụ: gọi API thời tiết).",
                "**Observation (Quan sát)**: Đọc kết quả trả về từ công cụ.",
                "**Thought (Suy nghĩ tiếp)**: Đánh giá xem thông tin đã đủ để trả lời khách hàng chưa? Nếu chưa, quay lại bước 2."
              ]
            }
          ]
        },
        {
          id: "l4-1-3",
          title: "Tool Calling / Function Calling",
          duration: "2 giờ",
          type: "theory",
          summary: "Định cấu hình định nghĩa Tools dưới dạng JSON Schema hướng dẫn AI gọi hàm chính xác.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Function Calling hoạt động ra sao?"
            },
            {
              type: "text",
              content: "Function Calling cho phép các nhà phát triển mô tả các hàm code của mình dưới dạng cấu trúc JSON Schema gửi lên OpenAI/Claude. AI sẽ tự động phân tích câu hỏi của user và xuất ra một đối tượng JSON chứa các tham số tương ứng để gọi hàm đó."
            },
            {
              type: "code",
              language: "json",
              filename: "Mẫu schema định nghĩa tool cho AI",
              content: `{
  "type": "function",
  "function": {
    "name": "get_user_info",
    "description": "Lấy thông tin người dùng từ database",
    "parameters": {
      "type": "object",
      "properties": {
        "user_id": { "type": "string", "description": "Mã số định danh" }
      },
      "required": ["user_id"]
    }
  }
}`
            }
          ]
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
          content: [
            {
              type: "heading",
              level: 2,
              content: "Tại sao cần kiến trúc RAG?"
            },
            {
              type: "text",
              content: "RAG (Retrieval-Augmented Generation) giải quyết triệt để 2 điểm yếu lớn nhất của LLMs: (1) Nói sảng (hallucination) và (2) Thiếu cập nhật kiến thức mới.\n\nKhi người dùng hỏi, thay vì để AI tự sinh chữ, hệ thống sẽ thực hiện truy vấn các văn bản liên quan nhất từ cơ sở dữ liệu tri thức của bạn, nhét các văn bản đó vào prompt làm ngữ cảnh (context) và bắt AI trả lời dựa trên đó."
            }
          ]
        },
        {
          id: "l4-2-2",
          title: "Chiến lược chia nhỏ dữ liệu (Chunking Strategy)",
          duration: "2 giờ",
          type: "theory",
          summary: "Tìm hiểu các kỹ thuật chia nhỏ tài liệu (Fixed-size, Sentence, Semantic) để tối ưu hóa context.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Các kỹ thuật Chunking"
            },
            {
              type: "text",
              content: "Tài liệu của bạn có thể dài hàng trăm trang, không thể đưa toàn bộ vào prompt. Bạn bắt buộc phải chia nhỏ tài liệu thành các phân đoạn (Chunks):"
            },
            {
              type: "table",
              headers: ["Chiến lược", "Cách phân đoạn", "Trường hợp áp dụng phù hợp"],
              rows: [
                ["Fixed-size Chunking", "Cắt cố định 500 ký tự một chunk", "Tài liệu đơn giản, xử lý nhanh"],
                ["Sentence Chunking", "Ngắt theo dấu chấm kết thúc câu", "Văn bản tự nhiên, giữ nguyên câu"],
                ["Paragraph Chunking", "Ngắt theo các đoạn xuống dòng", "Bài viết blog, tài liệu hướng dẫn kỹ thuật"],
                ["Semantic Chunking", "Sử dụng AI phân tích ngắt theo ý nghĩa", "Cần độ chính xác tối đa, tài liệu phức tạp"]
              ]
            }
          ]
        },
        {
          id: "l4-2-3",
          title: "Vector Database",
          duration: "2 giờ",
          type: "theory",
          summary: "Hiểu khái niệm biểu diễn văn bản thành số (Embeddings) và các cơ sở dữ liệu Vector phổ biến.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Tìm kiếm ngữ nghĩa bằng Vector"
            },
            {
              type: "text",
              content: "Vector Database lưu trữ dữ liệu dưới dạng các dãy số nhiều chiều (Embeddings) đại diện cho ý nghĩa ngữ nghĩa của từ. Nhờ đó, hệ thống có thể tìm kiếm thông tin liên quan nhất ngay cả khi người dùng gõ sai chính tả hoặc dùng từ đồng nghĩa."
            }
          ]
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
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Định nghĩa 2 tools: `get_weather(city)` và `search_product(query)`. Gửi prompt hỏi AI 'Thời tiết Hà Nội hôm nay thế nào?' ➔ Đảm bảo AI trả ra đúng cấu trúc gọi hàm get_weather."
            },
            {
              type: "checklist",
              title: "Các tiêu chí hoàn thành bài Lab:",
              items: [
                "Sử dụng đúng schema OpenAI Tools.",
                "AI tự động nhận dạng và trích xuất đúng tham số 'Hà Nội'.",
                "Lưu mã nguồn Python vào tệp phase-4/tool-calling-basic.py."
              ]
            }
          ]
        },
        {
          id: "l4-3-2",
          title: "Lab 4.2: RAG đơn giản với Supabase",
          duration: "4 giờ",
          type: "exercise",
          summary: "Xây dựng quy trình RAG cơ bản: tạo embeddings và lưu trữ, truy vấn tương đồng trên Supabase pgvector.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Thực hiện chia nhỏ 5 bài viết ➔ gọi OpenAI Embedding API ➔ lưu vào bảng Supabase pgvector ➔ viết câu lệnh SQL so sánh tương đồng cosine."
            },
            {
              type: "checklist",
              title: "Các tiêu chí hoàn thành bài Lab:",
              items: [
                "Tạo bảng cơ sở dữ liệu lưu trữ vector thành công.",
                "Thực hiện tìm kiếm ngữ nghĩa (semantic search) trả ra kết quả chính xác.",
                "Lưu mã nguồn vào tệp phase-4/rag-supabase.py."
              ]
            }
          ]
        },
        {
          id: "l4-3-3",
          title: "Lab 4.3: AI Agent trong n8n",
          duration: "4 giờ",
          type: "exercise",
          summary: "Tạo tác tử AI hoàn chỉnh trong n8n sử dụng n8n Agent Node và cấu hình 3 công cụ tích hợp.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Dựng luồng n8n AI Agent có 3 công cụ: tìm kiếm web, truy cập database, và tự động gửi email. Chạy thử nghiệm các câu hỏi cần phối hợp nhiều bước."
            },
            {
              type: "checklist",
              title: "Các công việc cần hoàn thành:",
              items: [
                "Sử dụng node 'AI Agent' cốt lõi của n8n.",
                "Kết nối thành công các Tool Nodes bổ trợ.",
                "Export tệp JSON workflow lưu vào phase-4/n8n_agent_flow.json."
              ]
            }
          ]
        },
        {
          id: "l4-3-4",
          title: "Lab 4.4: Chatbot RAG với Flowise/Dify",
          duration: "4 giờ",
          type: "exercise",
          summary: "Thiết lập chatbot RAG không code cực nhanh sử dụng nền tảng Flowise hoặc Dify kéo thả.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Triển khai Flowise hoặc Dify bằng Docker ➔ tải lên 1 tệp tài liệu PDF hướng dẫn nội bộ ➔ dựng giao diện chat trả lời dựa trên tài liệu đó."
            },
            {
              type: "checklist",
              title: "Các tiêu chí nghiệm thu bài Lab:",
              items: [
                "Chatbot phản hồi đúng thông tin từ tài liệu PDF.",
                "Có cơ chế chống nói sảng (system constraints) hoạt động tốt.",
                "Chụp ảnh màn hình hoạt động lưu vào thư mục phase-4/."
              ]
            }
          ]
        },
        {
          id: "l4-3-5",
          title: "Checkpoint Phase 4: AI Knowledge Assistant",
          duration: "5 giờ",
          type: "project",
          summary: "Xây dựng hệ thống tác tử AI thông minh hoàn chỉnh tự động tra cứu dữ liệu (RAG) kết hợp tìm kiếm web.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Bài kiểm tra tổng kết Phase 4"
            },
            {
              type: "text",
              content: "Bạn cần thiết kế một Trợ lý tri thức thông minh: Khi nhận câu hỏi của người dùng ➔ tự động tìm câu trả lời trong Vector DB (RAG) ➔ nếu độ tương đồng thấp (không có dữ liệu) ➔ tự động kích hoạt công cụ tìm kiếm web (Google/Tavily) để cập nhật thông tin mới nhất ➔ trả lời thân thiện kèm trích nguồn cụ thể."
            },
            {
              type: "checklist",
              title: "Tiêu chí vượt qua bài kiểm tra:",
              items: [
                "Nộp đủ 4 tệp tin bài tập Lab tương ứng trong phase-4/.",
                "AI Agent tự động rẽ nhánh suy luận mượt mà.",
                "Thời gian phản hồi (response time) toàn quy trình dưới 15 giây.",
                "Hoạt động an toàn, không có hiện tượng hallucination dữ liệu."
              ]
            }
          ]
        }
      ]
    }
  ]
};
