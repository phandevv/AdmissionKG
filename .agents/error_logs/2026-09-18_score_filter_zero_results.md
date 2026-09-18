# 🐞 Báo cáo Sự cố & Nhật ký Khắc phục: Lỗi Tìm Kiếm Điểm Chuẩn 15 - 30 Không Trả Về Kết Quả

> **Ngày ghi nhận**: 2026-09-18  
> **Module bị ảnh hưởng**: Frontend (`modules/admission/pages/AdmissionSearchPage.jsx`)  
> **Mức độ nghiêm trọng**: High  
> **Trạng thái**: RESOLVED  

---

## 1. Vấn đề Phát sinh (Problem Statement - ABC)
- **Mô tả hiện tượng**: Người dùng chọn lọc theo khoảng điểm chuẩn từ $15.0$ đến $30.0$ tại trang Tra cứu Tuyển sinh, mặc định năm hiện tại là $2026$, bảng thông báo "Không có dữ liệu khớp" ($0$ kết quả) dù cơ sở dữ liệu có $59$ ngành và $116$ bản ghi điểm chuẩn lịch sử.
- **Tác động**: Thí sinh không thể lọc ngành theo điểm thi để chọn trường phù hợp.

---

## 2. Phân tích Nguyên nhân Gốc rễ (Root Cause Analysis)
- Năm hiện tại ($2026$) là năm đang mở đợt tuyển sinh nên cột điểm chuẩn chính thức trong CSDL mang giá trị `score = null`.
- Toàn bộ điểm chuẩn thực tế nằm ở các năm trước ($2025, 2024$).
- Trong hàm `filtered`, logic kiểm tra: `if (year && String(r.year) !== year) continue;` loại bỏ các dòng năm 2025, sau đó `if (r.score == null) continue;` loại bỏ tiếp toàn bộ các dòng năm 2026 $\rightarrow$ Toàn bộ dữ liệu bị loại bỏ ($0$ kết quả).

---

## 3. Hành động & Thay đổi Đã Áp dụng (Changes Applied - XYZ)

### 🟢 Fix lần 1 (Dứt điểm):
- **Thời gian**: 2026-09-18 09:55
- **File chỉnh sửa**: `frontend/src/modules/admission/pages/AdmissionSearchPage.jsx`, `frontend/src/index.css`
- **Thay đổi cụ thể**:
  1. Khi nạp chương trình đào tạo năm 2026, tự động tìm và gán điểm chuẩn năm gần nhất vào trường `prevScore` và `prevYear` (ví dụ năm 2025).
  2. Điều chỉnh điều kiện lọc: `const targetScore = r.score != null ? r.score : r.prevScore;` để dùng điểm năm trước đối chiếu khi lọc.
  3. Cập nhật giao diện: Thêm tag `Năm trước (2025)` tại thanh lọc điểm và hiển thị rõ badge `(Năm 2025)` ở cột Điểm chuẩn.

---

## 4. Kết quả Thu được & Nghiệm thu (Outcome & Verification - AA)
- **Trước khi áp dụng**: Tìm kiếm điểm $15.0 - 30.0$ trả về $0$ kết quả.
- **Sau khi áp dụng**: Tìm kiếm trả về chính xác **$57$ ngành đào tạo** phù hợp, hiển thị rõ điểm chuẩn tham chiếu năm 2025.
- **Kiểm thử nghiệm thu**:
  - [x] Build Vite (`npm run build`): Thành công trong $4.38$s, $0$ lỗi.
  - [x] Manual Verification: Bộ lọc điểm phản hồi ngay lập tức, UI hiển thị rõ ràng cơ chế tham chiếu.

---

## 5. Bài học Rút ra & Quy tắc Bất biến (Invariant Rule)
- 📌 **Quy tắc bất biến**: Đối với các kỳ tuyển sinh năm hiện tại chưa công bố điểm chuẩn chính thức, hệ thống bắt buộc phải tự động fallback sang `prevScore` (điểm chuẩn năm gần nhất) để phục vụ tra cứu và phân loại Three-Way Decision (TWD).
