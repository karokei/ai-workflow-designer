import os
import sys
from rich.console import Console
from rich.table import Table
from rich.panel import Panel

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def check_structure():
    console.print("[bold cyan]🔍 Đang kiểm tra cấu trúc Karo Agents...[/bold cyan]\n")
    
    paths = {
        "Rules": ".agent/rules",
        "Skills": ".agent/skills",
        "Workflows": ".agent/workflows",
        "Scripts": ".agent/scripts",
        "Agents": ".agent/agents"
    }
    
    table = Table(title="Trạng thái hệ thống Karo")
    table.add_column("Thành phần", style="magenta")
    table.add_column("Đường dẫn", style="blue")
    table.add_column("Trạng thái", style="green")
    table.add_column("Số lượng", justify="right", style="cyan")

    all_good = True
    for name, path in paths.items():
        exists = os.path.exists(path)
        count = len(os.listdir(path)) if exists else 0
        status = "✅ OK" if exists else "❌ Thiếu"
        if not exists:
            all_good = False
        
        table.add_row(name, path, status, str(count))

    console.print(table)
    
    if all_good:
        console.print(Panel("✨ [bold green]Hệ thống Karo Agent của sếp đã sẵn sàng và hoạt động hoàn hảo![/bold green] ✨", border_style="green"))
    else:
        console.print(Panel("⚠️ [bold yellow]Có một số thành phần bị thiếu. Sếp hãy kiểm tra lại cấu trúc thư mục nhé![/bold yellow]", border_style="yellow"))

if __name__ == "__main__":
    try:
        check_structure()
    except Exception as e:
        console.print(f"[bold red]❌ Đã xảy ra lỗi khi chạy Karo Doctor: {e}[/bold red]")
        sys.exit(1)
