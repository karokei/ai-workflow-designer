import sys
from rich.console import Console
from rich.panel import Panel

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def run_dev():
    console.print(Panel("🛠️ [bold cyan]Đang khởi động môi trường Phát triển Karo Agent...[/bold cyan]", border_style="cyan"))
    
    console.print("[yellow]🔨 Đang kiểm tra Hot-reload...[/yellow]")
    console.print("[green]🚀 Server đang lắng nghe tại:[/green] [bold blue]http://localhost:3000[/bold blue]")
    console.print("\n[dim]Gõ Ctrl+C để dừng server.[/dim]\n")

if __name__ == "__main__":
    try:
        run_dev()
    except KeyboardInterrupt:
        console.print("\n[yellow]👋 Đã dừng môi trường phát triển.[/yellow]")
    except Exception as e:
        console.print(f"[bold red]❌ Lỗi khởi động Dev mode: {e}[/bold red]")
        sys.exit(1)
