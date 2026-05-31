import sys
from rich.console import Console
from rich.panel import Panel
from rich.live import Live
from rich.table import Table
import random
import time

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def monitor_system():
    console.print(Panel("📊 [bold yellow]Hệ thống Giám sát Karo Agent đang chạy...[/bold yellow]", border_style="yellow"))
    
    def generate_stats():
        table = Table(title="Chỉ số hệ thống thời gian thực")
        table.add_column("Dịch vụ", style="cyan")
        table.add_column("CPU", justify="right")
        table.add_column("RAM", justify="right")
        table.add_column("Trạng thái", style="green")
        
        services = ["Core API", "Database", "AI Orchestrator", "Task Runner"]
        for svc in services:
            cpu = f"{random.randint(5, 45)}%"
            ram = f"{random.randint(100, 800)} MB"
            table.add_row(svc, cpu, ram, "🟢 Đang hoạt động")
        return table

    with Live(generate_stats(), refresh_per_second=1) as live:
        for _ in range(10):  # Chạy mô phỏng 10 giây
            time.sleep(1)
            live.update(generate_stats())

    console.print("\n[bold green]✅ Giám sát hoàn tất.[/bold green]")

if __name__ == "__main__":
    try:
        monitor_system()
    except KeyboardInterrupt:
        console.print("\n[yellow]👋 Đã dừng giám sát.[/yellow]")
    except Exception as e:
        console.print(f"[bold red]❌ Lỗi giám sát: {e}[/bold red]")
        sys.exit(1)
