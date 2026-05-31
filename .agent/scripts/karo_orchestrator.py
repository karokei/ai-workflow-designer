import sys
import subprocess
from rich.console import Console
from rich.panel import Panel

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def run_orchestrator(task=None):
    console.print(Panel(f"🧠 [bold cyan]Đang khởi động Karo Orchestrator...[/bold cyan]", border_style="cyan"))
    
    if not task:
        console.print("[yellow]⚠️ Chưa có task nào được chỉ định. Đang chạy ở chế độ mặc định...[/yellow]")
        task = "default"

    try:
        # Giả lập chạy orchestrator
        # cmd = ["node", "orchestrator/index.js", task]
        # subprocess.run(cmd, check=True)
        console.print(f"🚀 [green]Đang điều phối task:[/green] [bold white]{task}[/bold white]")
        console.print("\n[dim]... (Đang mô phỏng quá trình chạy) ...[/dim]\n")
        console.print("✅ [bold green]Hoàn thành điều phối![/bold green]")
        
    except Exception as e:
        console.print(f"[bold red]❌ Lỗi khi chạy Orchestrator: {e}[/bold red]")
        sys.exit(1)

if __name__ == "__main__":
    current_task = sys.argv[1] if len(sys.argv) > 1 else None
    run_orchestrator(current_task)
