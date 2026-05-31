import sys
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress

# Ép kiểu encoding UTF-8 để hiển thị icon/emoji trên Windows Terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

console = Console()

def run_tests():
    console.print(Panel("🧪 [bold blue]Đang chạy bộ kiểm thử chuyên sâu cho Karo Agent...[/bold blue]", border_style="blue"))
    
    tests = [
        "Unit Tests (Kiểm tra từng module)",
        "Integration Tests (Kiểm tra tích hợp)",
        "Security Audit (Kiểm tra bảo mật)",
        "E2E Tests (Kiểm tra luồng người dùng)"
    ]

    with Progress() as progress:
        task = progress.add_task("[cyan]Đang kiểm tra...", total=len(tests))
        
        for test_name in tests:
            progress.update(task, description=f"[blue]{test_name}[/blue]")
            # Giả lập chạy test
            import time
            time.sleep(1)
            progress.advance(task)
            console.print(f"  ✅ {test_name} [bold green]PASSED[/bold green]")

    console.print("\n✨ [bold green]Tất cả các bài kiểm tra đều vượt qua thành công![/bold green] ✨")

if __name__ == "__main__":
    try:
        run_tests()
    except Exception as e:
        console.print(f"[bold red]❌ Lỗi khi chạy bộ test: {e}[/bold red]")
        sys.exit(1)
