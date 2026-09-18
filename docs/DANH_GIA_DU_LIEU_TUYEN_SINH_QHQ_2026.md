# BÁO CÁO ĐÁNH GIÁ ĐỘ TƯƠNG THÍCH CƠ SỞ DỮ LIỆU & ĐỀ XUẤT MỞ RỘNG
## ĐỀ ÁN TUYỂN SINH NĂM 2026 — TRƯỜNG QUỐC TẾ, ĐẠI HỌC QUỐC GIA HÀ NỘI (MÃ: QHQ)

> **Tài liệu phân tích:** Quyết định số 992/QĐ-TQT ngày 05/06/2026 về Thông tin tuyển sinh đại học chính quy năm 2026 của Trường Quốc tế – Đại học Quốc gia Hà Nội.  
> **Mục tiêu:** Rà soát đối chiếu toàn bộ thông tin trong Đề án tuyển sinh QHQ 2026 với Schema CSDL quan hệ (PostgreSQL) và Graph RAG (Neo4j) của hệ thống AdmissionKG để xác định tính tương thích, các khoảng trống dữ liệu (Gaps) và đề xuất cập nhật cấu trúc bảng.

---

## 📑 MỤC LỤC
1. [Tổng quan Đề án tuyển sinh QHQ 2026](#1-tổng-quan-đề-án-tuyển-sinh-qhq-2026)
2. [Bảng đối chiếu từng hạng mục thông tin với CSDL hiện tại](#2-bảng-đối-chiếu-từng-hạng-mục-thông-tin-với-csdl-hiện-tại)
3. [Phân tích chi tiết các đặc thù của QHQ so với các trường khác](#3-phân-tích-chi-tiết-các-đặc-thù-của-qhq-so-với-các-trường-khác)
4. [Các trường thông tin bị thiếu hoặc cần mở rộng (Gaps & Improvements)](#4-các-trường-thông-tin-bị-thiếu-hoặc-cần-mở-rộng-gaps--improvements)
5. [Đề xuất điều chỉnh Database Schema & Dữ liệu mẫu (JSON/SQL)](#5-đề-xuất-điều-chỉnh-database-schema--dữ-liệu-mẫu-jsonsql)
6. [Kết luận & Kế hoạch hành động](#6-kết-luận--kế-hoạch-hành-động)

---

## 🏛 1. TỔNG QUAN ĐỀ ÁN TUYỂN SINH QHQ 2026

- **Tên cơ sở đào tạo:** Trường Quốc tế, Đại học Quốc gia Hà Nội (VNU-IS).
- **Mã trường:** `QHQ`.
- **Trường cha (Parent Institution):** Đại học Quốc gia Hà Nội (`ĐHQGHN`).
- **Quy mô tuyển sinh:** **1.350 chỉ tiêu** cho **15 chương trình đào tạo** + **1 chương trình Kỹ sư tài năng (20 chỉ tiêu)**.
- **Phân loại chương trình:**
  1. *Nhóm I:* 14 chương trình do ĐHQGHN cấp bằng / đồng cấp bằng quốc tế (Mã `QHQ01` đến `QHQ14`).
  2. *Nhóm II:* 01 chương trình do trường nước ngoài cấp bằng (ĐH Keuka - Hoa Kỳ, Mã `QHQ80`).
  3. *Chương trình Kỹ sư tài năng:* Kỹ sư tài năng Tự động hóa và Tin học (20 chỉ tiêu, tuyển chọn sau trúng tuyển hoặc tuyển thẳng).
- **Địa điểm đào tạo (3 cơ sở/campuses):**
  - Cơ sở Xuân Thủy: Nhà E5 & G7, 144 Xuân Thủy, Cầu Giấy, Hà Nội.
  - Cơ sở Phan Tây Nhạc: Số 1 Phố Phan Tây Nhạc, Xuân Phương, Hà Nội.
  - Cơ sở Hòa Lạc: Tòa nhà HT1, Khu đô thị ĐHQGHN, Hòa Lạc, Hà Nội.
- **Phương thức tuyển sinh đa dạng:**
  - `PT301`: Xét tuyển thẳng Bộ GD&ĐT (Điều 8).
  - `PT100`: Xét điểm thi tốt nghiệp THPT 2026.
  - `PT409`: Xét chứng chỉ tiếng Anh quốc tế (CCTA) kết hợp kết quả thi THPT 2026.
  - `PT401`: Xét điểm Đánh giá năng lực (HSA) của ĐHQGHN.
  - `PT_HOCBA` / `PT_QUOCTE`: Xét học bạ THPT, SAT, A-Level, phỏng vấn (dành riêng cho mã QHQ80).

---

## 🔍 2. BẢNG ĐỐI CHIẾU TỪNG HẠNG MỤC THÔNG TIN VỚI CSDL HIỆN TẠI

Hệ thống AdmissionKG hiện có **18 bảng quan hệ (Relational)** và mô hình đồ thị tương ứng trên **Neo4j Aura Cloud**. Dưới đây là ma trận đối soát chi tiết:

| STT | Hạng mục dữ liệu trong Đề án QHQ | Bảng CSDL hiện tại | Thuộc tính / Khóa tương ứng | Đánh giá trạng thái |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Mã trường `QHQ`, Tên trường, Hotline, Website, ĐHQGHN | `institutions` | `institution_id`, `institution_code`, `parent_institution_id`, `contact_info` | ✅ **Đáp ứng 100%** |
| **2** | 3 Phân hiệu/Cơ sở: Xuân Thủy, Phan Tây Nhạc, Hòa Lạc | `campuses` | `campus_id`, `campus_name`, `province_city`, `region` | ✅ **Đáp ứng 100%** |
| **3** | Đề án tuyển sinh năm 2026, Tổng chỉ tiêu 1.350 | `admission_schemes` | `scheme_id`, `academic_year`, `total_quota` | ✅ **Đáp ứng 100%** |
| **4** | Mã xét tuyển `QHQ01` -> `QHQ14`, `QHQ80`, Tên chương trình, Chỉ tiêu ngành | `admission_tracks` | `track_id`, `admission_code`, `track_name`, `allocated_quota`, `major_code`, `campus_id` | ✅ **Đáp ứng 100%** |
| **5** | Ngôn ngữ đào tạo (Tiếng Anh / Song ngữ), Thời gian đào tạo (4 năm, 4.5 năm, 5 năm) | `admission_tracks` | `track_type`, `tuition_policy` (JSONB) | 🟡 **Cần chuẩn hóa thêm cột riêng** |
| **6** | Các phương thức xét tuyển: 100, 301, 401 (HSA), 409 (IELTS+THPT), Học bạ, SAT | `admission_methods` | `method_id`, `method_code`, `method_name`, `target_group` | ✅ **Đáp ứng 100%** |
| **7** | Ma trận 14 Tổ hợp môn: A00, A01, D01, D07, D08, D09, D10, C01, C02, X02, X26... | `subject_combinations`, `subjects`, `combination_subjects` | `combination_code`, `subject_code` (Hỗ trợ môn mới Tin học, KTPL theo GDPT 2018) | ✅ **Đáp ứng 100%** |
| **8** | Liên kết Ngành - Phương thức - Tổ hợp xét tuyển | `track_method_combinations` | `tmc_id`, `track_id`, `method_id`, `combination_code`, `formula_id` | ✅ **Đáp ứng 100%** |
| **9** | Bảng điểm chuẩn và chỉ tiêu lịch sử 2 năm gần nhất (2024, 2025) theo từng phương thức (THPT, HSA, IELTS+THPT, IELTS+Học bạ, SAT) | `benchmarks_quotas` | `benchmark_id`, `tmc_id`, `academic_year`, `quota`, `admitted_count`, `benchmark_score` | ✅ **Đáp ứng 100%** |
| **10** | Quy đổi chứng chỉ tiếng Anh quốc tế (IELTS 5.5 -> 8.0, 6.0 -> 8.5, 6.5 -> 9.0, 7.0 -> 9.5, >=7.5 -> 10.0) | `universal_conversions` | `institution_id`, `cert_or_achievement_type`, `min_input_value`, `action_type`, `converted_score` | ✅ **Đáp ứng 100%** |
| **11** | Chính sách điểm thưởng giải HSG Quốc gia (+3.0, +2.5, +2.0) | `bonus_policies` | `achievement_category`, `prize_level`, `bonus_points`, `max_accumulated_bonus` | ✅ **Đáp ứng 100%** |
| **12** | Chính sách điểm xét thưởng HSG KHKT, HSG ĐHQGHN, Olympic ĐHQGHN, HSG Tỉnh/Thành (+1.5, +1.0, +0.5, +0.25) | `bonus_policies` | `achievement_category`, `prize_level`, `bonus_points` | ✅ **Đáp ứng 100%** |
| **13** | Điểm khuyến khích tiếng Anh độc lập (IELTS 5.5-6.5: +1.0; 7.0-7.5: +1.25; 8.0-9.0: +1.5) | `bonus_policies` / `universal_conversions` | `action_type = 'ADD_BONUS'` | ✅ **Đáp ứng 100%** |
| **14** | Điểm khuyến khích SAT (1376-1440: +1.0; 1440-1520: +1.25; >=1520: +1.5) & ACT, A-Level | `bonus_policies` / `universal_conversions` | `action_type = 'ADD_BONUS'` | ✅ **Đáp ứng 100%** |
| **15** | Điều kiện phụ tiếng Anh (Điểm thi THPT >= 6.0/5.0 HOẶC Học bạ >= 7.0 HOẶC HSA Q21 >= 30/50) | `track_eligibility_rules` | `rule_type`, `rule_value` (JSONB), `error_message_vi` | ✅ **Đáp ứng 100%** |
| **16** | Điều kiện môn Toán THPT >= 6.0 khi xét tổ hợp D01 cho các ngành QHQ04, 08, 10, 12 | `track_eligibility_rules` | `rule_type = 'SUBJECT_MIN_SCORE'`, `rule_value = {"subject": "TOAN", "min_score": 6.0, "applies_to_combination": "D01"}` | ✅ **Đáp ứng 100%** |
| **17** | Tiêu chí phụ khi trùng điểm cuối danh sách (Thí sinh có điểm cộng thấp hơn được ưu tiên, sau đó đến Thứ tự NV) | `track_tie_breakers` | `priority_order`, `criterion_type`, `sort_direction` | ✅ **Đáp ứng 100%** |
| **18** | Biểu giá học phí chi tiết 4-5 năm từng kỳ, từng năm từ 2026 đến 2031 | `admission_tracks` | `tuition_policy` (JSONB) | ✅ **Đáp ứng tốt qua JSONB** |
| **19** | Chuẩn đầu ra ngoại ngữ (B2 sau năm 2/3, C1 tốt nghiệp) & Học phần tiếng Anh dự bị | `admission_tracks` | *Chưa có trường riêng* | 🔴 **Cần mở rộng** |
| **20** | Cơ hội học Bằng kép (Bằng 2) tại ĐH Ngoại ngữ, ĐH Luật, ĐH Quốc tế | N/A | *Chưa có bảng liên kết song bằng* | 🔴 **Cần mở rộng mô hình** |

---

## 💡 3. PHÂN TÍCH CHI TIẾT CÁC ĐẶC THÙ CỦA QHQ SO VỚI CÁC TRƯỜNG KHÁC

So sánh với các đề án như **Đại học Quy Nhơn (DQN)** hay **Khoa Y Dược (YKV)**:

1. **Cơ chế Điều kiện phụ Tiếng Anh dạng "OR" (Phức hợp nhiều nguồn):**
   - Thí sinh chỉ cần thỏa **1 trong 4 nguồn**: (1) Điểm thi THPT môn Anh; (2) Học bạ 3 năm môn Anh; (3) Điểm HSA phần tiếng Anh Q21; (4) Chứng chỉ tiếng Anh miễn thi tốt nghiệp.
   - *Đánh giá:* Bảng `track_eligibility_rules` cần lưu `rule_value` theo dạng cấu trúc logic `{"logic": "OR", "criteria": [...]}` để Engine TWD kiểm tra tự động.

2. **Chính sách Điểm cộng đa tầng và Quy tắc Khống chế Trần 3.0 điểm:**
   - Điểm cộng gồm 3 nguồn: **Điểm thưởng** (tối đa 3.0đ) + **Điểm xét thưởng** (tối đa 1.5đ) + **Điểm khuyến khích CCTA/SAT** (tối đa 1.5đ).
   - Mỗi nhóm lấy thành tích cao nhất 1 lần, nhưng **tổng cả 3 nhóm không vượt quá 3.0 điểm**.
   - *Đánh giá:* CSDL đã có `max_accumulated_bonus = 3.0` ở bảng `bonus_policies`, rất khớp với công thức của QHQ!

3. **Quy tắc Tiêu chí phụ đảo ngược (Inverted Tie-Breaker):**
   - Bình thường các trường ưu tiên thí sinh có điểm môn chính (Toán/Văn) cao hơn.
   - Nhưng QHQ quy định: **Ưu tiên thí sinh có điểm cộng THẤP HƠN** (để ưu tiên điểm năng lực học/thi thực chất trước).
   - *Đánh giá:* Bảng `track_tie_breakers` với cột `criterion_type = 'BONUS_POINT'` và `sort_direction = 'ASC'` xử lý chính xác được nghiệp vụ này.

4. **Chương trình Đồng cấp bằng quốc tế (Dual Degree / Co-degree) & Đối tác nước ngoài:**
   - QHQ06 cấp bằng cùng ĐH HELP (Malaysia); QHQ07 cấp bằng cùng ĐH Keuka (Hoa Kỳ); QHQ80 do ĐH Keuka cấp bằng 100%.
   - Cần thể hiện rõ trên Đồ thị Tri thức (Graph RAG) mối quan hệ giữa Ngành học và Trường đại học đối tác quốc tế.

---

## ⚠️ 4. CÁC TRƯỜNG THÔNG TIN BỊ THIẾU HOẶC CẦN MỞ RỘNG (GAPS & IMPROVEMENTS)

Để hệ thống AdmissionKG lưu trữ và hiển thị 100% trọn vẹn mọi khía cạnh thông tin của Trường Quốc tế (QHQ), chúng ta cần bổ sung các điểm sau:

### 🔴 Khoảng trống 1: Thông tin Đào tạo chuyên sâu trong `admission_tracks`
- **Hiện tại:** `admission_tracks` đang có: `track_id`, `scheme_id`, `campus_id`, `major_code`, `admission_code`, `track_name`, `track_type`, `orientation_cert`, `tuition_policy`, `allocated_quota`.
- **Thiếu:**
  - `instruction_language`: Ngôn ngữ đào tạo (`'Tiếng Anh'` hoặc `'Tiếng Anh & Tiếng Việt'`).
  - `duration_years`: Thời gian đào tạo tiêu chuẩn (`4.0`, `4.5`, `5.0` năm).
  - `partner_university`: Tên trường đối tác cấp bằng (VD: `'Đại học Keuka, Hoa Kỳ'`, `'Đại học HELP, Malaysia'`).
  - `degree_awarding_type`: Loại hình cấp bằng (`'VNU'` - ĐHQGHN cấp; `'CO_DEGREE'` - Đồng cấp bằng; `'INTERNATIONAL'` - Nước ngoài cấp).
  - `english_entry_requirement`: Chuẩn tiếng Anh đầu vào / Chuẩn tiếng Anh dự bị.
  - `english_exit_requirement`: Chuẩn tiếng Anh đầu ra tốt nghiệp (VD: `'B2 KNLNNVN'`, `'C1 IELTS 6.5'`).

### 🔴 Khoảng trống 2: Bảng Quan hệ Đào tạo Song bằng (Dual Degree / Bằng kép)
- QHQ cho phép sinh viên học bằng kép tại: ĐH Ngoại ngữ (Ngôn ngữ Anh, Nhật, Hàn), ĐH Luật (Luật kinh doanh), và Trường Quốc tế.
- **Đề xuất:** Tạo bảng mới hoặc quan hệ Graph: `DUAL_DEGREE_OPPORTUNITIES` hoặc liên kết `(:AdmissionTrack)-[:OFFERS_DUAL_DEGREE_WITH]->(:Major)`.

### 🔴 Khoảng trống 3: Hồ sơ Thí sinh (`user_academic_profiles`)
- **Hiện tại:** Hồ sơ người dùng đã hỗ trợ lưu `thpt_scores`, `hocba_scores`, `aptitude_test_scores`, `international_certificates`, `achievements`.
- **Cần đảm bảo:** Khi nạp điểm ĐGNL HSA, cần lưu điểm chi tiết từng phần thi (Toán, Văn/Khoa học, và **môn Tiếng Anh mã Q21** - thang 50 điểm) để phục vụ kiểm tra điều kiện phụ tiếng Anh của QHQ.

---

## 🛠 5. ĐỀ XUẤT ĐIỀU CHỈNH DATABASE SCHEMA & DỮ LIỆU MẪU

### 5.1. DDL Cập nhật bổ sung các cột cho bảng `admission_tracks`

```sql
-- Bổ sung các thuộc tính học thuật & quốc tế vào bảng admission_tracks
ALTER TABLE admission_tracks 
ADD COLUMN IF NOT EXISTS instruction_language VARCHAR(50) DEFAULT 'Tiếng Việt',
ADD COLUMN IF NOT EXISTS duration_years NUMERIC(3,1) DEFAULT 4.0,
ADD COLUMN IF NOT EXISTS degree_awarding_type VARCHAR(50) DEFAULT 'VNU', -- 'VNU', 'CO_DEGREE', 'INTERNATIONAL'
ADD COLUMN IF NOT EXISTS partner_university VARCHAR(255),
ADD COLUMN IF NOT EXISTS english_entry_requirement TEXT,
ADD COLUMN IF NOT EXISTS english_exit_requirement TEXT;
```

### 5.2. Mẫu dữ liệu JSONB `tuition_policy` cho ngành của QHQ

```json
{
  "currency": "VND",
  "yearly_breakdown": {
    "2026-2027": 50600000,
    "2027-2028": 50600000,
    "2028-2029": 50600000,
    "2029-2030": 50600000
  },
  "total_estimated_tuition": 202400000,
  "preparatory_english_fee_per_level": 11165000,
  "notes": "Mức học phí hai chương trình đồng cấp bằng đã bao gồm học phí 1 kỳ học tại trường đối tác nước ngoài."
}
```

### 5.3. Mẫu dữ liệu `track_eligibility_rules` cho Điều kiện phụ Tiếng Anh QHQ

```json
{
  "rule_type": "ENGLISH_GATEKEEPER",
  "condition_operator": "OR",
  "criteria": [
    { "type": "THPT_SUBJECT_SCORE", "subject": "TIENG_ANH", "min_score": 6.0 },
    { "type": "HOCBA_GPA_3YEARS", "subject": "TIENG_ANH", "min_score": 7.0 },
    { "type": "HSA_SUBTEST_SCORE", "component": "Q21", "min_score": 30.0, "max_score": 50.0 },
    { "type": "EXEMPTION_CERTIFICATE", "accepted": true }
  ],
  "error_message_vi": "Thí sinh chưa đạt điều kiện phụ môn Tiếng Anh (Điểm thi THPT >= 6.0 hoặc Học bạ >= 7.0 hoặc HSA Q21 >= 30/50 hoặc có chứng chỉ miễn thi)."
}
```

---

## 📋 6. KẾT LUẬN & KẾ HOẠCH HÀNH ĐỘNG

### 🎯 Kết luận đánh giá:
1. **Độ tương thích hiện tại: ~90%**. Hệ thống AdmissionKG với kiến trúc 18 bảng PostgreSQL + Neo4j Graph đã bao quát được hầu hết toàn bộ cấu trúc tuyển sinh phức tạp của Trường Quốc tế – ĐHQGHN (từ tổ hợp mới GDPT 2018, quy đổi IELTS/SAT, ma trận điểm cộng 3 nhóm, đến bảng điểm chuẩn 2 năm gần nhất).
2. **Khả năng tiếp nhận:** Toàn bộ **15 chương trình đào tạo**, **4 phương thức**, **14 tổ hợp môn** và **lịch sử điểm chuẩn 2024-2025** của QHQ có thể nạp ngay vào hệ thống hiện tại thông qua script nạp dữ liệu (`seed_qhq_scheme.mjs`).
3. **Mở rộng đề xuất:** Thêm 6 cột đặc thù (ngôn ngữ giảng dạy, trường đối tác, loại cấp bằng, chuẩn đầu ra ngoại ngữ) vào bảng `admission_tracks` để giao diện hiển thị và Graph RAG trả lời chi tiết và chuyên nghiệp nhất.

### 🚀 Các bước tiếp theo:
1. Tạo migration SQL cập nhật bổ sung các cột hữu ích cho `admission_tracks`.
2. Viết file nạp dữ liệu hoàn chỉnh `seed_qhq_scheme.mjs` để nạp toàn bộ 15 ngành và dữ liệu điểm chuẩn 2024-2025 của Trường Quốc tế - ĐHQGHN vào CSDL PostgreSQL & Neo4j.
3. Đồng bộ giao diện Tra cứu tuyển sinh và Chatbot RAG để thí sinh có thể tra cứu chi tiết đề án tuyển sinh của Trường Quốc tế ĐHQGHN.
