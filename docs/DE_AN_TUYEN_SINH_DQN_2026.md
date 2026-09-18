# BẢNG DỮ LIỆU ĐỀ ÁN TUYỂN SINH NĂM 2026 — TRƯỜNG ĐẠI HỌC QUY NHƠN (DQN)

> **Tài liệu nguồn:** Thông tin tuyển sinh Trường Đại học Quy Nhơn năm 2026 (Cập nhật ngày 31/5/2026).  
> **Tổng chỉ tiêu tuyển sinh 2026:** **5.173 sinh viên** trên **53 ngành/chương trình đào tạo**.

---

## 1. BẢNG `institutions` (Đơn vị Đào tạo)

| Cột (Field) | Giá trị nạp | Ghi chú |
| :--- | :--- | :--- |
| `institution_id` | `'DQN'` | Khóa chính mã trường |
| `institution_code` | `'DQN'` | Mã tuyển sinh Bộ GD&ĐT |
| `institution_name` | `'Trường Đại học Quy Nhơn'` | Tên chính thức |
| `institution_type` | `'Đại học Công lập'` | Loại hình sở hữu |
| `contact_info` | `{"address": "170 An Dương Vương, Quy Nhơn, Bình Định", "phone": "1800.55.88.49", "website": "https://qnu.edu.vn", "admissions_url": "https://tuyensinh.qnu.edu.vn"}` | Thông tin liên hệ (JSONB) |

---

## 2. BẢNG `admission_methods` (Phương thức Xét tuyển Áp dụng)

| `method_id` | `method_code` | `method_name` | `target_group` | Ghi chú |
| :--- | :---: | :--- | :--- | :--- |
| `'PT100'` | `'100'` | Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 | `'THPT'` | Áp dụng cho hầu hết các ngành |
| `'PT200'` | `'200'` | Xét tuyển theo kết quả học tập 3 năm THPT (học bạ) | `'Học bạ'` | Trừ các ngành đào tạo giáo viên |
| `'PT402A'` | `'402A'` | Xét kết quả kỳ thi ĐGNL của ĐHQG TP.HCM | `'ĐGNL ĐHQG-HCM'` | Trừ các ngành đào tạo giáo viên |
| `'PT402B'` | `'402B'` | Xét kết quả kỳ thi ĐGNL của Trường ĐH Sư phạm Hà Nội | `'ĐGNL ĐHSP-HN'` | Áp dụng cho các ngành Sư phạm |
| `'PT405'` | `'405'` | Xét kết quả thi THPT kết hợp thi Năng khiếu của Trường ĐH Quy Nhơn | `'Năng khiếu'` | Ngành GD Mầm non & GD Thể chất |
| `'PT301'` | `'301'` | Xét tuyển thẳng theo Quy chế tuyển sinh của Bộ GD&ĐT | `'Tuyển thẳng'` | Toàn trường |

---

## 3. BẢNG `admission_schemes` (Đề án Tuyển sinh 2026)

| Cột (Field) | Giá trị nạp | Ghi chú |
| :--- | :--- | :--- |
| `scheme_id` | `'DQN_2026'` | Khóa chính đề án |
| `institution_id` | `'DQN'` | Thuộc Trường ĐH Quy Nhơn |
| `academic_year` | `2026` | Năm tuyển sinh |
| `total_quota` | `5173` | Tổng chỉ tiêu toàn trường |

---

## 4. BẢNG `admission_tracks` (53 Ngành / Chương trình Đào tạo Xét tuyển Năm 2026)

> **💡 CƠ CHẾ QUAN HỆ 1 - NHIỀU GIỮA NGÀNH VÀ PHƯƠNG THỨC XÉT TUYỂN:**  
> Trong CSDL AdmissionKG, bảng `admission_tracks` đại diện cho từng Ngành/Chương trình đào tạo.  
> Mỗi ngành **hoàn toàn có thể áp dụng đồng thời từ 1 đến 4 phương thức xét tuyển khác nhau** (`PT100`, `PT200`, `PT402A`, `PT402B`, `PT405`).  
> Quan hệ đa phương thức này không nằm cứng ở bảng `admission_tracks` mà được lưu chuẩn hóa trong bảng cầu nối **`track_method_combinations` (TMC)** (với tổng cộng **1.113 bản ghi** liên kết ngành - phương thức - tổ hợp môn).

| STT | `track_id` | Mã xét tuyển | Tên ngành / chương trình | Loại hình | Chỉ tiêu 2026 | Phương thức xét tuyển áp dụng | Tổ hợp môn xét tuyển | Học phí dự kiến |
| :---: | :--- | :---: | :--- | :--- | :---: | :--- | :--- | :--- |
| 1 | `DQN_2026_7140114` | `7140114` | Quản lý giáo dục | Cử nhân Chuẩn | 44 | **PT100, PT200, PT402A, PT402B** (4 PT) | C00, C19, C20, C14, D01, C03 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 2 | `DQN_2026_7140201` | `7140201` | Giáo dục Mầm non | Sư phạm | 180 | **PT405** (Thi THPT + Năng khiếu) | M00 (Văn, Toán, NK GDMN) | Miễn học phí theo NĐ 116 |
| 3 | `DQN_2026_7140202` | `7140202` | Giáo dục Tiểu học | Sư phạm | 250 | **PT100, PT402B** (2 PT) | D01, D11, D12, D13, D14, D15 | Miễn học phí theo NĐ 116 |
| 4 | `DQN_2026_7140205` | `7140205` | Giáo dục Chính trị | Sư phạm | 20 | **PT100, PT402B** (2 PT) | C14, C19, C20, D66 | Miễn học phí theo NĐ 116 |
| 5 | `DQN_2026_7140206` | `7140206` | Giáo dục Thể chất | Sư phạm | 100 | **PT405** (Thi THPT + Năng khiếu) | T00, T01, T02, T03, T04, T05 | Miễn học phí theo NĐ 116 |
| 6 | `DQN_2026_7140209` | `7140209` | Sư phạm Toán học | Sư phạm | 100 | **PT100, PT402B** (2 PT) | A00, A01, D07, X06 | Miễn học phí theo NĐ 116 |
| 7 | `DQN_2026_7140210` | `7140210` | Sư phạm Tin học | Sư phạm | 120 | **PT100, PT402B** (2 PT) | A00, A01, D01, D07, X01, X26, X02, X06 | Miễn học phí theo NĐ 116 |
| 8 | `DQN_2026_7140211` | `7140211` | Sư phạm Vật lý | Sư phạm | 51 | **PT100, PT402B** (2 PT) | A00, A01, C01, X26 | Miễn học phí theo NĐ 116 |
| 9 | `DQN_2026_7140212` | `7140212` | Sư phạm Hóa học | Sư phạm | 36 | **PT100, PT402B** (2 PT) | A00, B00, D07, C02 | Miễn học phí theo NĐ 116 |
| 10 | `DQN_2026_7140213` | `7140213` | Sư phạm Sinh học | Sư phạm | 25 | **PT100, PT402B** (2 PT) | B00, A02, D08, B03 | Miễn học phí theo NĐ 116 |
| 11 | `DQN_2026_7140217` | `7140217` | Sư phạm Ngữ Văn | Sư phạm | 120 | **PT100, PT402B** (2 PT) | C00, D14, D15, D01, D66 | Miễn học phí theo NĐ 116 |
| 12 | `DQN_2026_7140218` | `7140218` | Sư phạm Lịch sử | Sư phạm | 54 | **PT100, PT402B** (2 PT) | C00, C19, D14, C03 | Miễn học phí theo NĐ 116 |
| 13 | `DQN_2026_7140219` | `7140219` | Sư phạm Địa lý | Sư phạm | 80 | **PT100, PT402B** (2 PT) | C00, C20, D15, C04, D10, A09, B02, A07, A06 | Miễn học phí theo NĐ 116 |
| 14 | `DQN_2026_7140231` | `7140231` | Sư phạm Tiếng Anh | Sư phạm | 200 | **PT100, PT402B** (2 PT) | D01 | Miễn học phí theo NĐ 116 |
| 15 | `DQN_2026_7140247` | `7140247` | Sư phạm Khoa học tự nhiên | Sư phạm | 70 | **PT100, PT402B** (2 PT) | A00, A01, A02, B00, D08 | Miễn học phí theo NĐ 116 |
| 16 | `DQN_2026_7140249` | `7140249` | Sư phạm Lịch sử - Địa lý | Sư phạm | 85 | **PT100, PT402B** (2 PT) | C00, C19, C20, D14, D15, C03, C04 | Miễn học phí theo NĐ 116 |
| 17 | `DQN_2026_7220201` | `7220201` | Ngôn ngữ Anh | Cử nhân Chuẩn | 261 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, D14, D15, A01 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 18 | `DQN_2026_7220204` | `7220204` | Ngôn ngữ Trung Quốc | Cử nhân Chuẩn | 58 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, D14, D15, A01 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 19 | `DQN_2026_7229030` | `7229030` | Văn học | Cử nhân Chuẩn | 57 | **PT100, PT200, PT402A, PT402B** (4 PT) | C00, C19, D14, D15, D66, C20 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 20 | `DQN_2026_7310101` | `7310101` | Kinh tế | Cử nhân Chuẩn | 99 | **PT100, PT200, PT402A, PT402B** (4 PT) | D84, K01, D07, D01, A01, D10, D09 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 21 | `DQN_2026_7310109` | `7310109` | Kinh tế số | Cử nhân Chuẩn | 45 | **PT100, PT200, PT402A, PT402B** (4 PT) | D84, K01, D07, D01, A01, D10, D09 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 22 | `DQN_2026_7310205` | `7310205` | Quản lý nhà nước | Cử nhân Chuẩn | 61 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, D11, D14, C14, C19, C00 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 23 | `DQN_2026_7310403` | `7310403` | Tâm lý học giáo dục | Cử nhân Chuẩn | 64 | **PT100, PT200, PT402A, PT402B** (4 PT) | C00, C19, C20, C14, D01, C03, D14 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 24 | `DQN_2026_7310608` | `7310608` | Đông phương học | Cử nhân Chuẩn | 102 | **PT100, PT200, PT402A, PT402B** (4 PT) | C00, C19, D14, D15, D66, D01, C03, D65 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 25 | `DQN_2026_7310630` | `7310630` | Việt Nam học | Cử nhân Chuẩn | 63 | **PT100, PT200, PT402A, PT402B** (4 PT) | C00, C19, C20, C03, C04, D66, C14 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 26 | `DQN_2026_7340101` | `7340101` | Quản trị kinh doanh | Cử nhân Chuẩn | 249 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, A01, D07, K01, D84, D09, D10 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 27 | `DQN_2026_7340201` | `7340201` | Tài chính – Ngân hàng | Cử nhân Chuẩn | 94 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, A01, D07, K01, D84, D09, D10 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 28 | `DQN_2026_7340301` | `7340301` | Kế toán | Cử nhân Chuẩn | 257 | **PT100, PT200, PT402A, PT402B** (4 PT) | D84, K01, D07, D01, A01, D10, D09 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 29 | `DQN_2026_7340301AC` | `7340301AC` | Kế toán (Định hướng ACCA) | Chất lượng cao | 30 | **PT100, PT200, PT402A, PT402B** (4 PT) | D84, K01, D07, D01, A01, D10, D09 | Học phí 1.5 lần đại trà (ACCA) |
| 30 | `DQN_2026_7340302` | `7340302` | Kiểm toán | Cử nhân Chuẩn | 49 | **PT100, PT200, PT402A, PT402B** (4 PT) | D84, K01, D07, D01, A01, D10, D09 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 31 | `DQN_2026_7380101` | `7380101` | Luật | Cử nhân Chuẩn | 106 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, D11, D14, C14, C19, C00 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 32 | `DQN_2026_7440112` | `7440112` | Hóa học (Hóa dược, Hóa mỹ phẩm) | Cử nhân Chuẩn | 56 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, B00, D07, C02, X02, A05, A06, A11 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 33 | `DQN_2026_7460108` | `7460108` | Khoa học dữ liệu | Cử nhân Chuẩn | 45 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, D07, X06, D01 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 34 | `DQN_2026_7460112` | `7460112` | Toán ứng dụng | Cử nhân Chuẩn | 58 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, D07, X06, D01 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 35 | `DQN_2026_7480103` | `7480103` | Kỹ thuật phần mềm | Kỹ sư | 60 | **PT100, PT200, PT402A, PT402B** (4 PT) | A01, D01, D07, D84, K01 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 36 | `DQN_2026_7480107` | `7480107` | Trí tuệ nhân tạo | Kỹ sư | 53 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, D01, D07, X06 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 37 | `DQN_2026_7480201` | `7480201` | Công nghệ thông tin (An toàn, an ninh mạng) | Kỹ sư | 182 | **PT100, PT200, PT402A, PT402B** (4 PT) | A01, D01, D07, D84, K01 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 38 | `DQN_2026_7510205` | `7510205` | Công nghệ kỹ thuật ô tô | Kỹ sư | 137 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, X26, C01, A19 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 39 | `DQN_2026_7510401` | `7510401` | Công nghệ kỹ thuật hoá học | Kỹ sư | 56 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, D07, C02, A11, B00, X02, A05 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 40 | `DQN_2026_7510605` | `7510605` | Logistics và Quản lý chuỗi cung ứng | Cử nhân Chuẩn | 159 | **PT100, PT200, PT402A, PT402B** (4 PT) | D01, A01, D07, K01, D84, D09, D10 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 41 | `DQN_2026_7520116` | `7520116` | Kỹ thuật cơ khí động lực | Kỹ sư | 40 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, X26, C01, A19 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 42 | `DQN_2026_7520201` | `7520201` | Kỹ thuật điện | Kỹ sư | 144 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, X26, C01, A19 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 43 | `DQN_2026_7520207` | `7520207` | Kỹ thuật điện tử - viễn thông (Thiết kế vi mạch) | Kỹ sư | 100 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, X26, C01, A19 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 44 | `DQN_2026_7520216` | `7520216` | Kỹ thuật điều khiển và tự động hóa | Kỹ sư | 85 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, X26, C01, A19 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 45 | `DQN_2026_7520401` | `7520401` | Vật lý kỹ thuật (Đóng gói & kiểm thử vi mạch) | Kỹ sư | 62 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, A02, X26, A19, C01 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 46 | `DQN_2026_7540101` | `7540101` | Công nghệ thực phẩm | Kỹ sư | 143 | **PT100, PT200, PT402A, PT402B** (4 PT) | B00, A06, A05, A00, D07, X02, C02, A11 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 47 | `DQN_2026_7580201` | `7580201` | Kỹ thuật xây dựng | Kỹ sư | 109 | **PT100, PT200, PT402A, PT402B** (4 PT) | A00, A01, X26, C01, A19 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 48 | `DQN_2026_7620109` | `7620109` | Nông học | Kỹ sư | 43 | **PT100, PT200, PT402A, PT402B** (4 PT) | A02, B00, B01, B03, D08, B04, X03, B09, B02 | Kỹ sư đại trà: 112.3 tr/khóa 4.5 năm |
| 49 | `DQN_2026_7760101` | `7760101` | Công tác xã hội | Cử nhân Chuẩn | 52 | **PT100, PT200, PT402A, PT402B** (4 PT) | C00, C19, D14, D01, C04, C03, C14, D66, C20 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 50 | `DQN_2026_7810103` | `7810103` | Quản trị dịch vụ du lịch và lữ hành | Cử nhân Chuẩn | 125 | **PT100, PT200, PT402A, PT402B** (4 PT) | C14, D01, C03, C04, C02, C01, X01 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 51 | `DQN_2026_7810201` | `7810201` | Quản trị khách sạn | Cử nhân Chuẩn | 99 | **PT100, PT200, PT402A, PT402B** (4 PT) | C14, D01, C03, C04, C02, C01, X01 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 52 | `DQN_2026_7850101` | `7850101` | Quản lý tài nguyên và môi trường | Cử nhân Chuẩn | 112 | **PT100, PT200, PT402A, PT402B** (4 PT) | C20, A09, C04, B02, D15, A04, D10, C13, A06 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| 53 | `DQN_2026_7850103` | `7850103` | Quản lý đất đai | Cử nhân Chuẩn | 123 | **PT100, PT200, PT402A, PT402B** (4 PT) | C20, A09, C04, B02, D15, A04, D10, C13, A06 | Cử nhân đại trà: 83-97 tr/khóa 4 năm |
| **Tổng**| | | **53 Ngành xét tuyển** | | **5.173** | | | |

---

## 5. BẢNG `benchmarks_quotas` (Điểm Chuẩn & Chỉ Tiêu 2 Năm Gần Nhất: 2024 & 2025)

> Dữ liệu được nạp cho từng ngành tương ứng 2 bản ghi: `academic_year = 2024` và `academic_year = 2025`, thang điểm `30.0`.

| STT | Mã ngành | Tên ngành | Chỉ tiêu 2024 | Nhập học 2024 | Điểm chuẩn 2024 | Chỉ tiêu 2025 | Nhập học 2025 | Điểm chuẩn 2025 |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | `7140114` | Quản lý Giáo dục | 47 | 50 | 22.50 | 50 | 41 | 25.10 |
| 2 | `7140201` | Giáo dục mầm non | 126 | 118 | 23.10 | 177 | 177 | 21.75 |
| 3 | `7140202` | Giáo dục Tiểu học | 244 | 234 | 26.95 | 240 | 239 | 26.90 |
| 4 | `7140205` | Giáo dục chính trị | 20 | 23 | 26.65 | 22 | 21 | 26.65 |
| 5 | `7140206` | Giáo dục thể chất | 24 | 23 | 26.50 | 99 | 98 | 19.80 |
| 6 | `7140209` | Sư phạm Toán học | 20 | 20 | 26.50 | 101 | 101 | 25.85 |
| 7 | `7140210` | Sư phạm Tin học | 100 | 106 | 22.85 | 112 | 112 | 20.35 |
| 8 | `7140211` | Sư phạm Vật lý | 20 | 19 | 25.75 | 81 | 80 | 24.40 |
| 9 | `7140212` | Sư phạm Hóa học | 0 | 0 | — | 25 | 25 | 25.30 |
| 10 | `7140213` | Sư phạm Sinh học | 20 | 21 | 23.90 | 29 | 29 | 21.20 |
| 11 | `7140217` | Sư phạm Ngữ văn | 30 | 32 | 27.35 | 119 | 119 | 26.85 |
| 12 | `7140218` | Sư phạm Lịch sử | 20 | 23 | 27.45 | 47 | 47 | 27.21 |
| 13 | `7140219` | Sư phạm Địa lý | 20 | 19 | 27.30 | 70 | 70 | 26.74 |
| 14 | `7140231` | Sư phạm Tiếng Anh | 84 | 87 | 25.92 | 199 | 199 | 23.59 |
| 15 | `7140247` | Sư phạm KH tự nhiên | 20 | 17 | 25.65 | 99 | 99 | 22.50 |
| 16 | `7140249` | Sư phạm Lịch sử Địa lý | 27 | 32 | 27.15 | 112 | 112 | 26.40 |
| 17 | `7220201` | Ngôn ngữ Anh | 290 | 288 | 22.00 | 287 | 285 | 23.00 |
| 18 | `7220204` | Ngôn ngữ Trung Quốc | 64 | 65 | 23.50 | 66 | 63 | 24.20 |
| 19 | `7229030` | Văn học | 61 | 62 | 23.50 | 56 | 54 | 25.29 |
| 20 | `7310101` | Kinh tế | 114 | 119 | 18.00 | 113 | 111 | 21.40 |
| 21 | `7310205` | Quản lý nhà nước | 99 | 101 | 23.15 | 77 | 58 | 23.60 |
| 22 | `7310403` | Tâm lý học giáo dục | 73 | 81 | 23.00 | 71 | 69 | 24.60 |
| 23 | `7310608` | Đông phương học | 128 | 107 | 15.00 | 107 | 106 | 22.30 |
| 24 | `7310630` | Việt Nam học | 64 | 69 | 18.00 | 61 | 57 | 23.50 |
| 25 | `7340101` | Quản trị kinh doanh | 266 | 264 | 17.00 | 250 | 249 | 21.70 |
| 26 | `7340201` | Tài chính – Ngân hàng | 86 | 92 | 20.25 | 102 | 87 | 22.50 |
| 27 | `7340301` | Kế toán | 262 | 258 | 17.75 | 238 | 236 | 20.30 |
| 28 | `7340301AC` | Kế toán ACCA | 30 | 29 | 18.00 | 30 | 33 | 19.20 |
| 29 | `7340302` | Kiểm toán | 54 | 56 | 18.75 | 50 | 50 | 21.80 |
| 30 | `7380101` | Luật | 200 | 188 | 23.65 | 170 | 158 | 23.58 |
| 31 | `7440112` | Hóa học | 50 | 32 | 15.00 | 49 | 50 | 20.50 |
| 32 | `7460108` | Khoa học dữ liệu | 45 | 17 | 15.00 | 40 | 41 | 17.10 |
| 33 | `7460112` | Toán ứng dụng | 55 | 47 | 15.00 | 60 | 60 | 19.50 |
| 34 | `7480103` | Kỹ thuật phần mềm | 61 | 50 | 15.00 | 61 | 58 | 19.50 |
| 35 | `7480107` | Trí tuệ nhân tạo | 52 | 18 | 15.00 | 55 | 50 | 20.00 |
| 36 | `7480201` | Công nghệ thông tin | 304 | 349 | 16.50 | 172 | 171 | 21.50 |
| 37 | `7510205` | Công nghệ kỹ thuật ô tô | 186 | 169 | 16.00 | 122 | 111 | 22.20 |
| 38 | `7510401` | Công nghệ KT hoá học | 50 | 19 | 15.00 | 41 | 47 | 20.50 |
| 39 | `7510605` | Logistics & QL chuỗi cung ứng | 170 | 218 | 21.00 | 184 | 164 | 23.60 |
| 40 | `7520116` | Kỹ thuật cơ khí động lực | 0 | 0 | — | 33 | 38 | 20.14 |
| 41 | `7520201` | Kỹ thuật điện | 113 | 143 | 16.00 | 144 | 137 | 20.65 |
| 42 | `7520207` | Kỹ thuật điện tử - viễn thông | 89 | 61 | 15.00 | 89 | 90 | 20.77 |
| 43 | `7520216` | Kỹ thuật điều khiển và Tự động hóa | 74 | 67 | 15.00 | 85 | 76 | 21.02 |
| 44 | `7520401` | Vật lý kỹ thuật | 0 | 0 | — | 57 | 56 | 18.25 |
| 45 | `7540101` | Công nghệ thực phẩm | 170 | 142 | 15.00 | 148 | 137 | 20.90 |
| 46 | `7580201` | Kỹ thuật xây dựng | 100 | 96 | 15.00 | 97 | 99 | 20.15 |
| 47 | `7620109` | Nông học | 50 | 29 | 15.00 | 44 | 39 | 15.00 |
| 48 | `7760101` | Công tác xã hội | 96 | 77 | 20.25 | 65 | 48 | 23.70 |
| 49 | `7810103` | Quản trị dịch vụ du lịch & lữ hành | 131 | 154 | 19.85 | 146 | 122 | 22.25 |
| 50 | `7810201` | Quản trị khách sạn | 167 | 128 | 18.35 | 113 | 90 | 22.65 |
| 51 | `7850101` | Quản lý tài nguyên và môi trường | 100 | 84 | 15.00 | 102 | 101 | 20.75 |
| 52 | `7850103` | Quản lý đất đai | 100 | 105 | 15.00 | 119 | 115 | 17.90 |

---

## 6. BẢNG `universal_conversions` (Quy đổi Chứng chỉ Tiếng Anh Quốc tế & VSTEP)

Áp dụng thay thế điểm môn Tiếng Anh trong tổ hợp xét tuyển cho Phương thức 1 (`PT100`) và Phương thức 2 (`PT200`):

| `cert_or_achievement_type` | `min_input_value` | `action_type` | `converted_score` | Ghi chú |
| :---: | :---: | :---: | :---: | :--- |
| `'IELTS'` | `'5.0'` | `'REPLACE_SUBJECT_SCORE'` | `8.00` | Thay thế điểm Tiếng Anh |
| `'IELTS'` | `'5.5'` | `'REPLACE_SUBJECT_SCORE'` | `8.50` | Thay thế điểm Tiếng Anh |
| `'IELTS'` | `'6.0'` | `'REPLACE_SUBJECT_SCORE'` | `9.00` | Thay thế điểm Tiếng Anh |
| `'IELTS'` | `'6.5'` | `'REPLACE_SUBJECT_SCORE'` | `9.50` | Thay thế điểm Tiếng Anh |
| `'IELTS'` | `'7.0'` | `'REPLACE_SUBJECT_SCORE'` | `10.00` | Thay thế điểm Tiếng Anh |
| `'VSTEP'` | `'4.0'` | `'REPLACE_SUBJECT_SCORE'` | `8.00` | Tương đương B1 |
| `'VSTEP'` | `'5.0'` | `'REPLACE_SUBJECT_SCORE'` | `8.50` | Tương đương B1 cao |
| `'VSTEP'` | `'6.0'` | `'REPLACE_SUBJECT_SCORE'` | `9.00` | Tương đương B2 |
| `'VSTEP'` | `'7.0'` | `'REPLACE_SUBJECT_SCORE'` | `9.50` | Tương đương C1 |
| `'VSTEP'` | `'8.0'` | `'REPLACE_SUBJECT_SCORE'` | `10.00` | Tương đương C1 cao / C2 |

---

## 7. BẢNG `bonus_policies` (Chính sách Điểm Ưu Tiên & Thưởng Khuyến Khích)

Cộng vào tổng điểm 3 môn xét tuyển (thời gian đoạt giải không quá 3 năm):

| `achievement_category` | `prize_level` | `bonus_points` | Áp dụng cho |
| :--- | :--- | :---: | :--- |
| `'HSG_QUOC_GIA'` | `'Giai_Nhat'` | `3.00` | Toàn bộ các ngành xét tuyển |
| `'HSG_QUOC_GIA'` | `'Giai_Nhi'` | `2.00` | Toàn bộ các ngành xét tuyển |
| `'HSG_QUOC_GIA'` | `'Giai_Ba'` | `1.00` | Toàn bộ các ngành xét tuyển |
| `'HSG_QUOC_GIA'` | `'Giai_KhuyenKhich'` | `0.50` | Toàn bộ các ngành xét tuyển |
| `'KHKT_QUOC_GIA'` | `'Giai_Tu'` | `0.50` | Cuộc thi KHKT cấp quốc gia |
| `'VDV_QUOC_TE'` | `'DoiTuyenQuocGia'` | `3.00` | Olympic, ASIAD, SEA Games (Xét vào GDTC) |
| `'VDV_QUOC_GIA'` | `'HuyChuongVangBacDong'` | `1.00` | Kiện tướng / HCV/HCB/HCĐ quốc gia (Xét vào GDTC) |

---

## 8. BẢNG `track_eligibility_rules` (Điều kiện Sơ Tuyển / Gatekeeper)

| `track_id` | `rule_type` | `rule_value` (JSONB) | `error_message_vi` |
| :--- | :--- | :--- | :--- |
| `DQN_2026_7140206` | `'PHYSICAL_FITNESS'` | `{"min_height_male": 1.65, "min_weight_male": 45, "min_height_female": 1.55, "min_weight_female": 40}` | Yêu cầu không dị tật, chiều cao nam $\ge 1.65m$ (nặng $\ge 45kg$), nữ $\ge 1.55m$ (nặng $\ge 40kg$) |
| Khối Giáo viên (16 ngành) | `'METHOD_EXCLUSION'` | `{"excluded_methods": ["PT200", "PT402A"]}` | Các ngành đào tạo giáo viên không xét tuyển theo Phương thức Học bạ (200) và ĐGNL ĐHQG-HCM (402A) |

---

## 9. BẢNG `track_tie_breakers` (Tiêu chí Phụ khi Hòa Điểm)

| `track_id` | `priority_order` | `criterion_type` | `sort_direction` |
| :--- | :---: | :--- | :---: |
| Áp dụng toàn trường | `1` | `LOWER_BONUS_POINTS` *(Ưu tiên thí sinh có điểm cộng thấp hơn)* | `ASC` |
| Áp dụng toàn trường | `2` | `HIGHER_WISH_ORDER` *(Ưu tiên thí sinh đặt thứ tự nguyện vọng cao hơn: NV1 > NV2)* | `ASC` |
| Khối Giáo viên | `3` | `WISH_RANK_1_TO_5` *(Thí sinh phải đăng ký NV từ 01 đến 05 trên cổng Bộ)* | `ASC` |
