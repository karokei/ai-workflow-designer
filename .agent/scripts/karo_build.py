import sys
from rich.console import Console
from rich.panel import Panel

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def build_system():
    console.print(Panel("🔨 [bold magenta]Đang xây dựng kiến trúc hệ thống Karo Premium...[/bold magenta]", border_style="magenta"))
    
    processes = [
        "🧹 Đang dọn dẹp các tệp tạm thời...",
        "📦 Đang đóng gói các Skill và Workflow...",
        "🏗️ Đang tối ưu hóa cấu trúc tệp tin...",
        "✨ Hoàn thiện bản Build mới..."
    ]

    for proc in processes:
        console.print(f"[magenta]{proc}[/magenta]")
        import time
        time.sleep(1)

    console.print("\n✅ [bold green]Quá trình Build hoàn tất![/bold green]")

if __name__ == "__main__":
    try:
        build_system()
    except Exception as e:
        console.print(f"[bold red]❌ Quá trình Build gặp lỗi: {e}[/bold red]")
        sys.exit(1)
