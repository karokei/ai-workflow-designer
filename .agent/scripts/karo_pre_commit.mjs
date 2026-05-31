import { execSync } from 'child_process';
import chalk from 'chalk';
import boxen from 'boxen';

console.log(boxen(chalk.cyan('🚀 Karo Auto-Pilot - Đang rà soát dự án trước khi commit...'), { padding: 1, borderStyle: 'double' }));

function runCheck(name, command) {
  try {
    console.log(chalk.yellow(`\n🔍 Đang chạy: ${name}...`));
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${name} - HOÀN TẤT`));
    return true;
  } catch (error) {
    console.error(chalk.red(`\n❌ ${name} - THẤT BẠI!`));
    return false;
  }
}

// 1. Kiểm tra sức khỏe hệ thống
const doctorPassed = runCheck('Karo System Doctor', 'python .agent/scripts/karo_doctor.py');

// 2. Quét bảo mật (Sơ bộ)
const auditPassed = runCheck('Security Audit (npm)', 'npm audit --audit-level=high');

if (doctorPassed && auditPassed) {
  console.log(chalk.green.bold('\n🌟 Dự án đủ tiêu chuẩn để commit. Chúc sếp một ngày tốt lành! 🫡\n'));
  process.exit(0);
} else {
  console.log(chalk.red.bold('\n⚠️ Dự án chưa đạt chuẩn "Premium". Sếp vui lòng kiểm tra lại lỗi trên nhé!\n'));
  process.exit(1);
}
