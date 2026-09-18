// import_exam_scores.mjs
// Script to login and trigger Exam Scores Import & Distribution Recalculation

const BASE_URL = 'http://localhost:8080/api/v1';

async function main() {
  console.log('🚀 1. Đang đăng nhập tài khoản Quản trị...');
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@admissionkg.edu.vn', password: 'admin123' })
  });
  const loginData = await loginRes.json();
  if (!loginData.success) {
    throw new Error('Đăng nhập thất bại: ' + JSON.stringify(loginData));
  }
  const token = loginData.data.token;
  console.log('✅ Đăng nhập thành công với vai trò:', loginData.data.user.role);

  console.log('\n📥 2. Đang nạp dữ liệu từ file CSV: data/diem_thi_THPTQG_2026.csv (~1.13 triệu thí sinh)...');
  console.log('⏳ Quá trình này chạy Batch JDBC Streaming trong Backend, vui lòng chờ...');
  const startTime = Date.now();

  const absoluteFilePath = 'c:/Users/bbqdd/Documents/_KhoaLuanTN/AdmissionKG/data/diem_thi_THPTQG_2026.csv';
  const importRes = await fetch(
    `${BASE_URL}/admin/exam-scores/import-file?filePath=${encodeURIComponent(absoluteFilePath)}&year=2026&recalculateDistribution=true`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  const importData = await importRes.json();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n🎉 3. Hoàn tất nạp dữ liệu trong ${elapsed}s! Kết quả:`, JSON.stringify(importData, null, 2));

  console.log('\n🔍 4. Kiểm tra thống kê tổng số bản ghi:');
  const statsRes = await fetch(`${BASE_URL}/admin/exam-scores/stats?year=2026`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const statsData = await statsRes.json();
  console.log('📊 Stats:', JSON.stringify(statsData, null, 2));

  console.log('\n🎯 5. Test thử tra cứu SBD 01000008:');
  const lookupRes = await fetch(`${BASE_URL}/exam-scores/lookup?year=2026&sbd=01000008`);
  const lookupData = await lookupRes.json();
  console.log('👤 Kết quả tra cứu SBD 01000008:', JSON.stringify(lookupData, null, 2));
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
