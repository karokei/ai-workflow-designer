// src/components/views/SandboxView.tsx
import { useState, useEffect, useRef } from 'react';
import { 
  Webhook, 
  BrainCircuit, 
  GitBranch, 
  Sliders, 
  Send, 
  Table, 
  Clock, 
  Play, 
  RotateCcw, 
  SlidersHorizontal,
  ChevronRight,
  Terminal,
  Activity,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface NodeInstance {
  id: string;
  type: 'webhook' | 'openai' | 'if' | 'set' | 'telegram' | 'sheets' | 'cron';
  name: string;
  x: number;
  y: number;
  config: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'error';
}

interface Connection {
  id: string;
  from: string;
  to: string;
  port?: 'true' | 'false' | 'output';
}

interface PredefinedTemplate {
  name: string;
  description: string;
  nodes: NodeInstance[];
  connections: Connection[];
  runs: Array<{
    timestamp: string;
    status: 'success' | 'error';
    details: string;
    logs: any[];
  }>;
}

const TEMPLATES: Record<string, PredefinedTemplate> = {
  leadClassifier: {
    name: "Phân loại & Cảnh báo Hot Lead",
    description: "Nhận data khách hàng qua Webhook -> Dùng GPT-4o phân loại tiềm năng -> Tách nhánh IF -> Báo Telegram cho Sale hoặc Lưu Google Sheets",
    nodes: [
      {
        id: "node-webhook",
        type: "webhook",
        name: "Webhook Lead Trigger",
        x: 40,
        y: 150,
        config: { url: "https://hook.karo.academy/v1/leads", method: "POST" },
        status: "idle"
      },
      {
        id: "node-openai",
        type: "openai",
        name: "AI Lead Classifier",
        x: 250,
        y: 150,
        config: { 
          prompt: "Hãy phân tích thông tin lead: {body.name}, doanh thu {body.revenue}. Nếu doanh thu > 10 triệu, trả về { status: 'HOT', priority: 'HIGH' } dưới dạng JSON.", 
          temperature: 0.2, 
          model: "gpt-4o-mini" 
        },
        status: "idle"
      },
      {
        id: "node-if",
        type: "if",
        name: "IF condition: HOT Lead?",
        x: 460,
        y: 150,
        config: { field: "ai_analysis.status", operator: "equal", value: "HOT" },
        status: "idle"
      },
      {
        id: "node-telegram",
        type: "telegram",
        name: "Gửi Telegram VIP Alert",
        x: 680,
        y: 50,
        config: { botToken: "tlg_bot_xxxxxx", chatId: "-1002938475", template: "🔥 HOT LEAD PHÁT HIỆN!\n- Tên: {body.name}\n- Doanh thu: {body.revenue}\n- Phân tích AI: {ai_analysis.priority}" },
        status: "idle"
      },
      {
        id: "node-sheets",
        type: "sheets",
        name: "Ghi Google Sheets Archive",
        x: 680,
        y: 280,
        config: { spreadsheetId: "1sh2_xxxx_yyyy", sheetName: "Leads_Cold", columns: "Tên,Doanh Thu,Trạng Thái" },
        status: "idle"
      }
    ],
    connections: [
      { id: "c1", from: "node-webhook", to: "node-openai", port: "output" },
      { id: "c2", from: "node-openai", to: "node-if", port: "output" },
      { id: "c3", from: "node-if", to: "node-telegram", port: "true" },
      { id: "c4", from: "node-if", to: "node-sheets", port: "false" }
    ],
    runs: [
      {
        timestamp: "10:42:01",
        status: "success",
        details: "Chạy thành công. Phát hiện HOT Lead (Revenue 15,000,000đ). Đã gửi Telegram VIP Alert.",
        logs: [
          { node: "Webhook Lead Trigger", input: {}, output: { body: { name: "Nguyễn Văn A", revenue: 15000000, email: "vana@gmail.com" } } },
          { node: "AI Lead Classifier", input: { body: { name: "Nguyễn Văn A", revenue: 15000000 } }, output: { ai_analysis: { status: "HOT", priority: "HIGH" } } },
          { node: "IF condition: HOT Lead?", input: { "ai_analysis.status": "HOT" }, output: { branch: "true" } },
          { node: "Gửi Telegram VIP Alert", input: { chatId: "-1002938475", text: "🔥 HOT LEAD PHÁT HIỆN!\n- Tên: Nguyễn Văn A..." }, output: { sent: true, messageId: 88293 } }
        ]
      },
      {
        timestamp: "10:45:32",
        status: "success",
        details: "Chạy thành công. COLD Lead (Revenue 3,500,000đ). Đã ghi nhận Google Sheets Archive.",
        logs: [
          { node: "Webhook Lead Trigger", input: {}, output: { body: { name: "Trần Thị B", revenue: 3500000, email: "thib@gmail.com" } } },
          { node: "AI Lead Classifier", input: { body: { name: "Trần Thị B", revenue: 3500000 } }, output: { ai_analysis: { status: "COLD", priority: "LOW" } } },
          { node: "IF condition: HOT Lead?", input: { "ai_analysis.status": "COLD" }, output: { branch: "false" } },
          { node: "Ghi Google Sheets Archive", input: { sheetName: "Leads_Cold", row: ["Trần Thị B", 3500000, "COLD"] }, output: { spreadsheetId: "1sh2_xxxx_yyyy", rowInserted: 12 } }
        ]
      }
    ]
  },
  dailyNews: {
    name: "Tóm tắt & Bản tin Tin tức Hằng ngày",
    description: "Kích hoạt theo giờ (Cron) -> Tự động cào dữ liệu RSS tin tức -> OpenAI tóm tắt và dịch thuật -> Lưu vào Google Sheets làm bản tin",
    nodes: [
      {
        id: "node-cron",
        type: "cron",
        name: "Cron Trigger (07:00 AM)",
        x: 40,
        y: 150,
        config: { schedule: "0 7 * * *" },
        status: "idle"
      },
      {
        id: "node-openai-news",
        type: "openai",
        name: "AI Translator & Summarizer",
        x: 250,
        y: 150,
        config: { 
          prompt: "Hãy đọc bản tin công nghệ hôm nay, tóm tắt lại 3 ý chính và dịch sang tiếng Việt ở cấu trúc JSON ngắn gọn.", 
          temperature: 0.5, 
          model: "gpt-4o" 
        },
        status: "idle"
      },
      {
        id: "node-sheets-news",
        type: "sheets",
        name: "Lưu Bản Tin Google Sheets",
        x: 480,
        y: 150,
        config: { spreadsheetId: "1sh2_news_xxxx", sheetName: "Bản_tin_hàng_ngày", columns: "Ngày,Tiêu đề,Tóm tắt AI" },
        status: "idle"
      }
    ],
    connections: [
      { id: "c1", from: "node-cron", to: "node-openai-news", port: "output" },
      { id: "c2", from: "node-openai-news", to: "node-sheets-news", port: "output" }
    ],
    runs: [
      {
        timestamp: "07:00:02",
        status: "success",
        details: "Chạy tự động thành công. Đã tóm tắt RSS feed và đẩy 3 tin tiêu điểm vào Google Sheets.",
        logs: [
          { node: "Cron Trigger (07:00 AM)", input: {}, output: { triggered: true, time: "2026-05-31T07:00:00Z" } },
          { node: "AI Translator & Summarizer", input: { rawNews: "Apple announced new M5 chips, Google releases Gemini 2.0 Ultra, OpenAI expands Advanced Voice Mode..." }, output: { news_digest: { date: "2026-05-31", highlights: ["Apple ra mắt chip M5 hiệu năng cao", "Google trình làng Gemini 2.0 Ultra", "OpenAI mở rộng Voice Mode nâng cao"] } } },
          { node: "Lưu Bản Tin Google Sheets", input: { row: ["2026-05-31", "Tin tức công nghệ 31/05", "1. Apple M5... 2. Gemini 2.0... 3. OpenAI Voice..."] }, output: { spreadsheetId: "1sh2_news_xxxx", rowInserted: 140 } }
        ]
      }
    ]
  },
  ocrInvoice: {
    name: "Duyệt Đơn Hàng Tự động qua OCR",
    description: "Nhận hóa đơn PDF qua Webhook -> Trích xuất dữ liệu bằng OpenAI Vision -> IF chi phí hợp lệ -> Tự động duyệt chi hoặc báo cáo Trưởng phòng phê duyệt thủ công",
    nodes: [
      {
        id: "node-webhook-ocr",
        type: "webhook",
        name: "Webhook PDF Receipt",
        x: 40,
        y: 150,
        config: { url: "https://hook.karo.academy/v1/receipts", method: "POST" },
        status: "idle"
      },
      {
        id: "node-openai-ocr",
        type: "openai",
        name: "AI OCR Reader (Vision)",
        x: 250,
        y: 150,
        config: { 
          prompt: "Đọc ảnh hóa đơn này, trích xuất: merchant, total_amount, tax_code dưới dạng JSON.", 
          temperature: 0.1, 
          model: "gpt-4o" 
        },
        status: "idle"
      },
      {
        id: "node-if-budget",
        type: "if",
        name: "IF amount <= 5,000,000đ",
        x: 460,
        y: 150,
        config: { field: "ocr_result.total_amount", operator: "less_equal", value: "5000000" },
        status: "idle"
      },
      {
        id: "node-telegram-approve",
        type: "telegram",
        name: "Auto-Approve Notify",
        x: 680,
        y: 50,
        config: { chatId: "-1002938475", template: "✅ HÓA ĐƠN ĐÃ TỰ ĐỘNG DUYỆT\n- Nhà cung cấp: {ocr_result.merchant}\n- Số tiền: {ocr_result.total_amount}đ\n- Ngân sách tự động: Hợp lệ" },
        status: "idle"
      },
      {
        id: "node-telegram-manual",
        type: "telegram",
        name: "Báo Manager duyệt thủ công",
        x: 680,
        y: 280,
        config: { chatId: "-992837482", template: "⚠️ YÊU CẦU PHÊ DUYỆT HÓA ĐƠN VƯỢT HẠN MỨC\n- Nhà cung cấp: {ocr_result.merchant}\n- Số tiền: {ocr_result.total_amount}đ\n- Người nộp: {body.uploader}" },
        status: "idle"
      }
    ],
    connections: [
      { id: "c1", from: "node-webhook-ocr", to: "node-openai-ocr", port: "output" },
      { id: "c2", from: "node-openai-ocr", to: "node-if-budget", port: "output" },
      { id: "c3", from: "node-if-budget", to: "node-telegram-approve", port: "true" },
      { id: "c4", from: "node-if-budget", to: "node-telegram-manual", port: "false" }
    ],
    runs: [
      {
        timestamp: "18:20:15",
        status: "success",
        details: "Hóa đơn GrabCar 280,000đ nằm trong hạn mức. Đã tự động duyệt và báo cáo Telegram.",
        logs: [
          { node: "Webhook PDF Receipt", input: {}, output: { body: { uploader: "Lê Văn C" } } },
          { node: "AI OCR Reader (Vision)", input: {}, output: { ocr_result: { merchant: "Grab Vietnam", total_amount: 280000, tax_code: "0312345678" } } },
          { node: "IF amount <= 5,000,000đ", input: { "ocr_result.total_amount": 280000 }, output: { branch: "true" } },
          { node: "Auto-Approve Notify", input: {}, output: { sent: true } }
        ]
      },
      {
        timestamp: "19:01:44",
        status: "success",
        details: "Hóa đơn tiếp khách 6,500,000đ vượt hạn mức tự động. Đã chuyển phê duyệt thủ công tới Manager.",
        logs: [
          { node: "Webhook PDF Receipt", input: {}, output: { body: { uploader: "Trần Văn D" } } },
          { node: "AI OCR Reader (Vision)", input: {}, output: { ocr_result: { merchant: "Nhà hàng Sen Tây Hồ", total_amount: 6500000, tax_code: "0109283746" } } },
          { node: "IF amount <= 5,000,000đ", input: { "ocr_result.total_amount": 6500000 }, output: { branch: "false" } },
          { node: "Báo Manager duyệt thủ công", input: {}, output: { sent: true } }
        ]
      }
    ]
  }
};

export function SandboxView() {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>("leadClassifier");
  const [nodes, setNodes] = useState<NodeInstance[]>(TEMPLATES.leadClassifier.nodes);
  const [connections, setConnections] = useState<Connection[]>(TEMPLATES.leadClassifier.connections);
  const [runs, setRuns] = useState(TEMPLATES.leadClassifier.runs);
  
  const [activeRunIndex, setActiveRunIndex] = useState<number | null>(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("node-webhook");
  const [isRunningScenario, setIsRunningScenario] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Drag state
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync templates
  const handleSelectTemplate = (key: string) => {
    setSelectedTemplateKey(key);
    setNodes(TEMPLATES[key].nodes);
    setConnections(TEMPLATES[key].connections);
    setRuns(TEMPLATES[key].runs);
    setActiveRunIndex(TEMPLATES[key].runs.length > 0 ? 0 : null);
    setSelectedNodeId(TEMPLATES[key].nodes[0]?.id || null);
    setIsRunningScenario(false);
  };

  // Drag handlers
  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    if (isRunningScenario) return;
    
    // Select the node
    setSelectedNodeId(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggedNodeId(nodeId);
    
    // Calculate difference between mouse click inside the node and node origin
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setDragOffset({
        x: clickX - node.x,
        y: clickY - node.y
      });
    }

    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedNodeId || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let newX = Math.round(mouseX - dragOffset.x);
      let newY = Math.round(mouseY - dragOffset.y);

      // Bounds check within canvas
      newX = Math.max(10, Math.min(rect.width - 210, newX));
      newY = Math.max(10, Math.min(rect.height - 110, newY));

      setNodes(prev => prev.map(n => {
        if (n.id === draggedNodeId) {
          return { ...n, x: newX, y: newY };
        }
        return n;
      }));
    };

    const handleMouseUp = () => {
      setDraggedNodeId(null);
    };

    if (draggedNodeId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedNodeId, dragOffset]);

  // Execute scenario flow visual simulation
  const handleRunScenario = () => {
    if (isRunningScenario) return;

    setIsRunningScenario(true);
    
    // Reset all status to idle
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));

    // Sequential simulation logic (0.8s per node logic hop)
    const sortedNodeSequence = [...nodes];
    
    // Simple sort based on x coordinate as automated workflow runs left to right
    sortedNodeSequence.sort((a, b) => a.x - b.x);

    let index = 0;
    
    const runNextNode = () => {
      if (index >= sortedNodeSequence.length) {
        // Complete running
        setIsRunningScenario(false);
        
        // Add a new mock execution run based on template selected
        const timestamp = new Date().toTimeString().split(' ')[0];
        const newRun = {
          timestamp,
          status: 'success' as const,
          details: `Chạy thủ công lúc ${timestamp} thành công. Kịch bản chạy qua ${nodes.length} nodes hoàn chỉnh.`,
          logs: nodes.map(n => ({
            node: n.name,
            input: n.config,
            output: { status: "success", executedAt: timestamp }
          }))
        };

        setRuns(prev => [newRun, ...prev]);
        setActiveRunIndex(0);
        return;
      }

      const activeNode = sortedNodeSequence[index];
      
      setNodes(prev => prev.map(n => {
        if (n.id === activeNode.id) return { ...n, status: 'running' };
        return n;
      }));

      setTimeout(() => {
        setNodes(prev => prev.map(n => {
          if (n.id === activeNode.id) return { ...n, status: 'success' };
          return n;
        }));

        index++;
        runNextNode();
      }, 900);
    };

    runNextNode();
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại Canvas và danh sách chạy thử?")) {
      const defaultT = TEMPLATES[selectedTemplateKey];
      setNodes(defaultT.nodes);
      setConnections(defaultT.connections);
      setRuns(defaultT.runs);
      setActiveRunIndex(defaultT.runs.length > 0 ? 0 : null);
      setSelectedNodeId(defaultT.nodes[0]?.id || null);
      setIsRunningScenario(false);
    }
  };

  // Node Icons helper
  const getNodeIcon = (type: string, status: string = 'idle') => {
    const iconClass = `w-4 h-4 ${
      status === 'running' 
        ? 'animate-spin text-accent' 
        : status === 'success' 
        ? 'text-mika-success' 
        : 'text-text-secondary'
    }`;

    switch (type) {
      case 'webhook': return <Webhook className={iconClass} />;
      case 'cron': return <Clock className={iconClass} />;
      case 'openai': return <BrainCircuit className={`${iconClass} text-indigo-500`} />;
      case 'if': return <GitBranch className={`${iconClass} text-amber-500`} />;
      case 'set': return <Sliders className={`${iconClass} text-violet-500`} />;
      case 'telegram': return <Send className={`${iconClass} text-sky-500`} />;
      case 'sheets': return <Table className={`${iconClass} text-emerald-500`} />;
      default: return <Zap className={iconClass} />;
    }
  };

  // Node styles helper
  const getNodeBorder = (node: NodeInstance) => {
    const isSelected = selectedNodeId === node.id;
    if (node.status === 'running') return 'border-accent shadow-[0_0_12px_rgba(0,212,255,0.4)]';
    if (node.status === 'success') return 'border-mika-success shadow-[0_0_10px_rgba(0,229,160,0.3)]';
    if (isSelected) return 'border-accent shadow-[0_0_8px_rgba(0,212,255,0.25)]';
    return 'border-border hover:border-text-muted';
  };

  // Bezier Connector Line path calculations
  const calculatePath = (conn: Connection) => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);

    if (!fromNode || !toNode) return "";

    // Ports positions
    const fromWidth = 200;
    const fromHeight = 84;
    const toHeight = 84;

    // Output port is always on the right side middle of fromNode
    const startX = fromNode.x + fromWidth;
    let startY = fromNode.y + fromHeight / 2;

    // Adjust port Y for IF branches (true branch on top right, false on bottom right)
    if (fromNode.type === 'if') {
      if (conn.port === 'true') {
        startY = fromNode.y + 24; // upper port
      } else if (conn.port === 'false') {
        startY = fromNode.y + fromHeight - 24; // lower port
      }
    }

    // Input port is always on the left side middle of toNode
    const endX = toNode.x;
    const endY = toNode.y + toHeight / 2;

    // Smooth cubic bezier curves
    const controlPointOffset = Math.abs(endX - startX) * 0.5;
    const cp1x = startX + controlPointOffset;
    const cp1y = startY;
    const cp2x = endX - controlPointOffset;
    const cp2y = endY;

    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  };

  // Connection pulse flow check
  const isConnectionFlowing = (conn: Connection) => {
    if (!isRunningScenario) return false;
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return false;

    // If starting node has successfully processed, pulse the next link
    return fromNode.status === 'success' && toNode.status !== 'success';
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-8 w-full animate-fade-in select-none">
      
      {/* ─────────────────────────────────────────────────────────────────
          LEFT WORKSPACE PANEL: Canvas Design Arena & Pre-built Templates
          ───────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        
        {/* Scenario Header with Predefined templates */}
        <section className="bg-bg-card border border-border p-4.5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent animate-pulse" />
              <h2 className="text-sm font-bold text-text-primary tracking-tight uppercase">Giả lập n8n/Make Sandbox</h2>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Môi trường trực quan cho phép thiết kế luồng tự động và thử nghiệm kết quả chạy thực tế của hệ thống.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[10px] font-bold text-text-muted uppercase shrink-0">Kịch Bản Mẫu:</span>
            <select
              value={selectedTemplateKey}
              onChange={(e) => handleSelectTemplate(e.target.value)}
              className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent font-semibold text-text-primary transition-all cursor-pointer"
            >
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <option key={key} value={key}>{t.name}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Dynamic Sandbox Canvas */}
        <div className="relative border border-border bg-slate-950 rounded-2xl h-[460px] overflow-hidden shadow-inner group">
          
          {/* Holographic grid wallpaper background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Action buttons floating panel */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button
              onClick={handleRunScenario}
              disabled={isRunningScenario}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-all ${
                isRunningScenario 
                  ? 'bg-slate-800 cursor-not-allowed text-slate-400 border-none' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10'
              }`}
            >
              {isRunningScenario ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Kịch bản đang chạy...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                  <span>Chạy thử kịch bản</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              disabled={isRunningScenario}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>
          </div>

          <div className="absolute top-4 right-4 z-20 bg-slate-900/60 backdrop-blur-xs border border-slate-800/80 px-3 py-1.5 rounded-lg text-[9px] text-slate-400 font-medium">
            💡 Kéo thả Header của Node để sắp xếp vị trí Canvas
          </div>

          {/* SVG Connector Lines Overlay */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
            <defs>
              {/* Neon glow filter */}
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {connections.map((conn) => {
              const activeFlow = isConnectionFlowing(conn);
              
              // Define default link color
              let linkStrokeColor = "rgba(100, 116, 139, 0.25)"; // slate translucent
              if (conn.port === 'true') linkStrokeColor = "rgba(16, 185, 129, 0.2)"; // green-trans
              if (conn.port === 'false') linkStrokeColor = "rgba(245, 158, 11, 0.2)"; // amber-trans
              
              if (activeFlow) linkStrokeColor = "#6366f1"; // energetic violet active pulse

              return (
                <g key={conn.id}>
                  {/* Outer glow background line */}
                  <path
                    d={calculatePath(conn)}
                    fill="none"
                    stroke={activeFlow ? "#4f46e5" : "transparent"}
                    strokeWidth={activeFlow ? "6" : "0"}
                    filter="url(#neon-glow)"
                    opacity="0.3"
                    className="transition-all duration-300"
                  />

                  {/* Base connector line path */}
                  <path
                    d={calculatePath(conn)}
                    fill="none"
                    stroke={linkStrokeColor}
                    strokeWidth={activeFlow ? "2.5" : "1.5"}
                    className="transition-all duration-300"
                  />

                  {/* Flowing energy particles pulse animation */}
                  {activeFlow && (
                    <path
                      d={calculatePath(conn)}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                      strokeDasharray="8 12"
                      strokeDashoffset="0"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="100;0"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Node Instances in Design Canvas */}
          <div 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 overflow-hidden"
          >
            {nodes.map((node) => {
              return (
                <div
                  key={node.id}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`absolute w-[200px] h-[84px] bg-slate-900/90 backdrop-blur-md border rounded-xl flex flex-col justify-between p-3 cursor-pointer select-none transition-shadow ${getNodeBorder(node)}`}
                >
                  {/* Node Header Row */}
                  <div 
                    onMouseDown={(e) => handleMouseDown(node.id, e)}
                    className="flex items-center justify-between cursor-grab active:cursor-grabbing border-b border-slate-800/40 pb-1.5"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {getNodeIcon(node.type, node.status)}
                      <span className="text-[10px] font-extrabold text-slate-200 tracking-tight truncate max-w-[140px]">
                        {node.name}
                      </span>
                    </div>
                    
                    {/* Status circle indicators */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {node.status === 'running' && (
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                      )}
                      {node.status === 'success' && (
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Node Content / Subtitle logs info */}
                  <div className="flex-1 mt-1 text-[8.5px] leading-relaxed text-slate-400 font-sans overflow-hidden">
                    {node.type === 'webhook' && `Method: ${node.config.method} | Port Active`}
                    {node.type === 'cron' && `Schedule: ${node.config.schedule} | 7:00 AM`}
                    {node.type === 'openai' && `Model: ${node.config.model} | Temp: ${node.config.temperature}`}
                    {node.type === 'if' && `Compare: ${node.config.field} ${node.config.operator}`}
                    {node.type === 'telegram' && `Chat: ${node.config.chatId} | Bot Push`}
                    {node.type === 'sheets' && `Sheet: ${node.config.sheetName} | Append Row`}
                  </div>

                  {/* Ports handles (dots) on Node borders */}
                  {/* Input port (left side middle) - unless it's trigger node webhook/cron */}
                  {node.type !== 'webhook' && node.type !== 'cron' && (
                    <div className="absolute top-[37px] -left-1 w-2 h-2 rounded-full border border-slate-700 bg-slate-900 z-20 shadow-xs" />
                  )}

                  {/* Output ports (right side middle) - standard output */}
                  {node.type !== 'telegram' && node.type !== 'sheets' && node.type !== 'if' && (
                    <div className="absolute top-[37px] -right-1 w-2 h-2 rounded-full border border-slate-700 bg-indigo-500 z-20 shadow-[0_0_6px_#6366f1]" />
                  )}

                  {/* Output ports for IF branches */}
                  {node.type === 'if' && (
                    <>
                      {/* TRUE output port (upper right) */}
                      <div className="absolute top-[20px] -right-1 w-2 h-2 rounded-full border border-slate-700 bg-emerald-500 z-20 shadow-[0_0_6px_#10b981] group" title="True Branch">
                        <span className="absolute right-2 -top-1.5 text-[7px] font-bold text-emerald-400">TRUE</span>
                      </div>
                      {/* FALSE output port (lower right) */}
                      <div className="absolute bottom-[20px] -right-1 w-2 h-2 rounded-full border border-slate-700 bg-amber-500 z-20 shadow-[0_0_6px_#f59e0b] group" title="False Branch">
                        <span className="absolute right-2 -top-1.5 text-[7px] font-bold text-amber-400">FALSE</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          RIGHT SIDEBAR PANEL: Config Panel & JSON Execution Logs Tables
          ───────────────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-4">
        
        {/* Node Properties Configurations Panel */}
        <section className="bg-bg-card border border-border p-4.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 border-b border-border-light pb-2.5 mb-3.5">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Cấu hình Node Tham Số</h3>
          </div>

          {selectedNode ? (
            <div className="flex flex-col gap-3.5 animate-fade-in select-text">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-text-primary tracking-tight">
                  {selectedNode.name}
                </span>
                <span className="text-[9px] font-bold uppercase font-mono px-2 py-0.5 border border-border bg-bg-secondary text-text-muted rounded">
                  {selectedNode.type}
                </span>
              </div>

              {/* Dynamic configuration inputs based on node type */}
              <div className="flex flex-col gap-3">
                {selectedNode.type === 'webhook' && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">Webhook Endpoint</label>
                      <input 
                        type="text" 
                        value={selectedNode.config.url}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">HTTP Method</label>
                      <input 
                        type="text" 
                        value={selectedNode.config.method}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-40"
                      />
                    </div>
                  </>
                )}

                {selectedNode.type === 'cron' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-text-muted">Cron Expression</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.schedule}
                      readOnly 
                      className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                    />
                  </div>
                )}

                {selectedNode.type === 'openai' && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">AI Model</label>
                      <input 
                        type="text" 
                        value={selectedNode.config.model}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">System Prompt Template</label>
                      <textarea 
                        rows={4}
                        value={selectedNode.config.prompt}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs p-3 rounded-lg text-text-secondary focus:outline-none font-mono leading-relaxed cursor-not-allowed resize-none w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-border-light pt-2">
                      <span className="text-[10px] font-bold uppercase text-text-muted">Temperature</span>
                      <span className="text-xs font-mono font-bold text-indigo-500">{selectedNode.config.temperature}</span>
                    </div>
                  </>
                )}

                {selectedNode.type === 'if' && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">Field to Compare</label>
                      <input 
                        type="text" 
                        value={selectedNode.config.field}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-text-muted">Operator</label>
                        <input 
                          type="text" 
                          value={selectedNode.config.operator}
                          readOnly 
                          className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-text-muted">Value</label>
                        <input 
                          type="text" 
                          value={selectedNode.config.value}
                          readOnly 
                          className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedNode.type === 'telegram' && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">Chat ID</label>
                      <input 
                        type="text" 
                        value={selectedNode.config.chatId}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-text-muted">Message Template</label>
                      <textarea 
                        rows={3}
                        value={selectedNode.config.template}
                        readOnly 
                        className="bg-bg-secondary border border-border text-xs p-3 rounded-lg text-text-secondary focus:outline-none font-mono leading-relaxed cursor-not-allowed resize-none w-full"
                      />
                    </div>
                  </>
                )}

                {selectedNode.type === 'sheets' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-text-muted">Sheet Name</label>
                        <input 
                          type="text" 
                          value={selectedNode.config.sheetName}
                          readOnly 
                          className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-text-muted">Spreadsheet ID</label>
                        <input 
                          type="text" 
                          value={selectedNode.config.spreadsheetId || "Default"}
                          readOnly 
                          className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                        />
                      </div>
                    </div>
                    {selectedNode.config.columns && (
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-text-muted">Columns to append</label>
                        <input 
                          type="text" 
                          value={selectedNode.config.columns}
                          readOnly 
                          className="bg-bg-secondary border border-border text-xs px-3 py-2 rounded-lg text-text-secondary focus:outline-none font-mono cursor-not-allowed w-full"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-border rounded-xl">
              <Info className="w-5 h-5 text-text-muted mx-auto mb-2" />
              <span className="text-[11px] text-text-muted">Click chọn một Node trên Canvas để xem chi tiết tham số cấu hình.</span>
            </div>
          )}
        </section>

        {/* Execution Runs Logs Terminal */}
        <section className="bg-bg-card border border-border p-4.5 rounded-2xl shadow-xs flex-1 flex flex-col min-h-[220px]">
          <div className="flex items-center justify-between border-b border-border-light pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Nhật Ký Thực Thi (JSON Logs)</h3>
            </div>
            {runs.length > 0 && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded">
                ACTIVE
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1 min-h-0">
            {/* Logs entries index */}
            <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              {runs.map((run, idx) => {
                const isActive = activeRunIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveRunIndex(idx)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg border text-left transition-all ${
                      isActive 
                        ? 'border-accent/30 bg-accent/5 dark:bg-accent/5' 
                        : 'border-border bg-bg-secondary/40 hover:bg-bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {run.status === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      )}
                      <span className="text-[10px] font-bold font-mono text-text-primary">{run.timestamp}</span>
                      <span className="text-[9.5px] text-text-secondary truncate max-w-[160px] font-sans">
                        {run.details}
                      </span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-text-muted" />
                  </button>
                );
              })}

              {runs.length === 0 && (
                <div className="text-center py-6 text-text-muted italic text-[11px]">
                  Chưa có lần chạy thử nào được thực hiện.
                </div>
              )}
            </div>

            {/* Selected Run Details JSON terminal view */}
            {activeRunIndex !== null && runs[activeRunIndex] && (
              <div className="flex-1 min-h-[160px] max-h-[220px] overflow-y-auto bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2.5 select-text">
                <span className="text-[8.5px] font-bold font-mono text-slate-400 uppercase tracking-widest block border-b border-slate-800 pb-1">
                  🌐 Payload Hops (Dữ liệu truyền qua các Node):
                </span>
                
                <div className="flex flex-col gap-3 font-mono text-[9px] leading-relaxed text-slate-200">
                  {runs[activeRunIndex].logs.map((log: any, lIdx: number) => (
                    <div key={lIdx} className="flex flex-col gap-1 border-l-2 border-slate-700 pl-2">
                      <span className="text-[9px] font-bold text-accent">{log.node}</span>
                      <div className="flex flex-col gap-0.5 text-[8.5px] text-slate-300">
                        {Object.keys(log.input).length > 0 && (
                          <div>
                            <span className="text-slate-500">Input:</span>{" "}
                            <span className="text-amber-400">{JSON.stringify(log.input)}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-500">Output:</span>{" "}
                          <span className="text-emerald-400">{JSON.stringify(log.output)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
export default SandboxView;
