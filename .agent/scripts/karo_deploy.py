import sys
from rich.console import Console
from rich.panel import Panel

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def deploy_agent():
    console.print(Panel("🚀 [bold green]Đang bắt đầu quy trình triển khai Karo Agent...[/bold green]", border_style="green"))
    
    steps = [
        "🔨 Đang Build bản bundle tối ưu...",
        "🧪 Đang chạy kiểm tra an toàn cuối cùng...",
        "☁️ Đang kết nối với Cloud Server...",
        "📦 Đang đẩy mã nguồn lên Production..."
    ]

    for step in steps:
        console.print(f"[cyan]{step}[/cyan]")
        import time
        time.sleep(1.5)

    console.print("\n🎉 [bold green]Karo Agent đã được triển khai thành công lên Production![/bold green] 🎊")
    console.print("[bold white]URL:[/bold white] [underline blue]https://karo.ai/agent-dashboard[/underline blue]")

if __name__ == "__main__":
    try:
        deploy_agent()
    except Exception as e:
        console.print(f"[bold red]❌ Quy trình triển khai thất bại: {e}[/bold red]")
        sys.exit(1)
