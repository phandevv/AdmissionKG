# BẢNG DỮ LIỆU ĐỀ ÁN TUYỂN SINH NĂM 2026 — TRƯỜNG ĐẠI HỌC Y KHOA VINH (YKV)

> **Tài liệu nguồn:** Quyết định số 290/QĐ-ĐHYKV ngày 31/3/2026 của Hiệu trưởng Trường Đại học Y khoa Vinh.  
> **Tổng chỉ tiêu tuyển sinh 2026:** **1.360 sinh viên** trên **6 ngành / chương trình đào tạo**.

---

## 1. BẢNG `institutions` (Cơ sở Đào tạo)

| Cột (Field) | Giá trị nạp | Ghi chú |
| :--- | :--- | :--- |
| `institution_id` | `'YKV'` | Khóa chính mã trường |
| `institution_code` | `'YKV'` | Mã trường theo Bộ GD&ĐT |
| `institution_name` | `'Trường Đại học Y khoa Vinh'` | Tên chính thức |
| `institution_type` | `'Đại học Công lập'` | Loại hình sở hữu (Trực thuộc UBND tỉnh Nghệ An) |
| `contact_info` | `{"phone": "0383.524.062 - 0988.929.429", "address": "Số 161 Nguyễn Phong Sắc, P. Trường Vinh, Nghệ An (Cơ sở 1) & P. Vinh Lộc, Nghệ An (Cơ sở 2)", "website": "http://www.vmu.edu.vn", "admissions_url": "http://www.vmu.edu.vn/tuyen-sinh-dao-tao"}` | Thông tin liên hệ đầy đủ (JSONB) |

---

## 2. BẢNG `admission_methods` (Phương thức Tuyển sinh)

| `method_id` | `method_code` | `method_name` | `target_group` | Ghi chú |
| :--- | :---: | :--- | :--- | :--- |
| `'PT100'` | `'100'` | Xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT năm 2026 | `'THPT'` | Áp dụng cho 5 ngành chính quy |
| `'PT200'` | `'200'` | Xét kết quả học tập cấp THPT (Học bạ) | `'Học bạ'` | Áp dụng cho Y học dự phòng, Dược học, Điều dưỡng, KTXN và Liên thông |
| `'PT301'` | `'301'` | Xét tuyển thẳng theo quy định của Quy chế tuyển sinh (Điều 8) | `'Tuyển thẳng'` | Tối đa 10% chỉ tiêu mỗi ngành |
| `'PT500'` | `'500'` | Dự bị đại học (TT 44/2021) & Lưu học sinh Lào (UBND tỉnh Nghệ An) | `'Dự bị ĐH & Lưu học sinh'` | Tối đa 10% chỉ tiêu mỗi ngành |

---

## 3. BẢNG `admission_schemes` (Đề án Tuyển sinh 2026)

| Cột (Field) | Giá trị nạp | Ghi chú |
| :--- | :--- | :--- |
| `scheme_id` | `'YKV_2026'` | Khóa chính đề án |
| `institution_id` | `'YKV'` | Trường Đại học Y khoa Vinh |
| `academic_year` | `2026` | Năm tuyển sinh |
| `total_quota` | `1360` | Tổng chỉ tiêu toàn trường |

---

## 4. BẢNG `majors` (5 Mã Ngành Đào tạo Cấp IV của Bộ GD&ĐT)

| `major_code` | `major_name` | `field_id` | Ghi chú |
| :--- | :--- | :--- | :--- |
| `'7720101'` | `'Y khoa'` | Khối ngành Sức khỏe (772) | Đào tạo Bác sĩ (6 năm) |
| `'7720110'` | `'Y học dự phòng'` | Khối ngành Sức khỏe (772) | Đào tạo Bác sĩ (6 năm) |
| `'7720201'` | `'Dược học'` | Khối ngành Sức khỏe (772) | Đào tạo Dược sĩ (5 năm) |
| `'7720301'` | `'Điều dưỡng'` | Khối ngành Sức khỏe (772) | Đào tạo Cử nhân (4 năm) |
| `'7720601'` | `'Kỹ thuật xét nghiệm y học'` | Khối ngành Sức khỏe (772) | Đào tạo Cử nhân (4 năm) |

---

## 5. BẢNG `admission_tracks` (6 Chương trình / Đợt Tuyển sinh Năm 2026)

| STT | `track_id` | Mã xét tuyển | `major_code` | Tên Track / Ngành | Loại hình (`track_type`) | Chỉ tiêu 2026 | Phương thức tuyển sinh | Tổ hợp môn | Chính sách học phí (`tuition_policy`) |
| :---: | :--- | :---: | :---: | :--- | :--- | :---: | :--- | :--- | :--- |
| 1 | `YKV_2026_7720101` | `7720101` | `7720101` | Y khoa | Bác sĩ Chính quy | 450 | **PT100, PT301, PT500** | B00, A00 | `{"policy": "Bác sĩ chính quy", "fee_monthly": "3.900.000 đ/tháng", "fee_total": "39.000.000 đ/năm (10 tháng)"}` |
| 2 | `YKV_2026_7720110` | `7720110` | `7720110` | Y học dự phòng | Bác sĩ Chính quy | 50 | **PT100, PT200, PT301, PT500** | B00, A00, D07 | `{"policy": "Bác sĩ chính quy", "fee_monthly": "2.900.000 đ/tháng", "fee_total": "29.000.000 đ/năm (10 tháng)"}` |
| 3 | `YKV_2026_7720201` | `7720201` | `7720201` | Dược học | Dược sĩ Chính quy | 150 | **PT100, PT200, PT301, PT500** | B00, A00, D07 | `{"policy": "Dược sĩ chính quy", "fee_monthly": "3.900.000 đ/tháng", "fee_total": "39.000.000 đ/năm (10 tháng)"}` |
| 4 | `YKV_2026_7720301` | `7720301` | `7720301` | Điều dưỡng | Cử nhân Chính quy | 350 | **PT100, PT200, PT301, PT500** | B00, A00, D07 | `{"policy": "Cử nhân chính quy", "fee_monthly": "2.900.000 đ/tháng", "fee_total": "29.000.000 đ/năm (10 tháng)"}` |
| 5 | `YKV_2026_7720601` | `7720601` | `7720601` | Kỹ thuật xét nghiệm y học | Cử nhân Chính quy | 60 | **PT100, PT200, PT301, PT500** | B00, A00, D07 | `{"policy": "Cử nhân chính quy", "fee_monthly": "2.900.000 đ/tháng", "fee_total": "29.000.000 đ/năm (10 tháng)"}` |
| 6 | `YKV_2026_LT7720301` | `LT7720301` | `7720301` | Điều dưỡng VLVH hệ liên thông CĐ-ĐH | Liên thông VLVH | 300 | **PT200** | B00 | `{"policy": "Liên thông VLVH", "fee_monthly": "4.350.000 đ/tháng", "fee_total": "43.500.000 đ/năm (10 tháng)"}` |
| **Tổng** | | | | **6 Chương trình tuyển sinh** | | **1.360** | | | |

---

## 6. BẢNG `track_method_combinations` (TMCs — 27 Phương Án Xét Tuyển Cụ Thể)

| STT | `track_id` | `method_id` | `combination_code` | Tên tổ hợp môn | Ghi chú |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | `YKV_2026_7720101` (Y khoa) | `PT100` | `B00` | Toán, Hóa học, Sinh học | Tổ hợp truyền thống |
| 2 | `YKV_2026_7720101` (Y khoa) | `PT100` | `A00` | Toán, Vật lý, Hóa học | Tổ hợp mở rộng |
| 3 | `YKV_2026_7720101` (Y khoa) | `PT301` | `B00` | Xét tuyển thẳng | Quy chế Bộ GD&ĐT |
| 4 | `YKV_2026_7720101` (Y khoa) | `PT500` | `B00` | Dự bị ĐH & Lào | QĐ UBND tỉnh |
| 5 | `YKV_2026_7720110` (Y học dự phòng) | `PT100` | `B00` | Toán, Hóa học, Sinh học | Điểm thi THPT |
| 6 | `YKV_2026_7720110` (Y học dự phòng) | `PT100` | `A00` | Toán, Vật lý, Hóa học | Điểm thi THPT |
| 7 | `YKV_2026_7720110` (Y học dự phòng) | `PT100` | `D07` | Toán, Hóa học, Tiếng Anh | Điểm thi THPT |
| 8 | `YKV_2026_7720110` (Y học dự phòng) | `PT200` | `B00` | Toán, Hóa học, Sinh học | Xét học bạ THPT |
| 9 | `YKV_2026_7720110` (Y học dự phòng) | `PT200` | `A00` | Toán, Vật lý, Hóa học | Xét học bạ THPT |
| 10 | `YKV_2026_7720110` (Y học dự phòng) | `PT200` | `D07` | Toán, Hóa học, Tiếng Anh | Xét học bạ THPT |
| 11 | `YKV_2026_7720110` (Y học dự phòng) | `PT301` | `B00` | Xét tuyển thẳng | Quy chế Bộ GD&ĐT |
| 12 | `YKV_2026_7720110` (Y học dự phòng) | `PT500` | `B00` | Dự bị ĐH & Lào | QĐ UBND tỉnh |
| 13 | `YKV_2026_7720201` (Dược học) | `PT100` | `B00` | Toán, Hóa học, Sinh học | Điểm thi THPT |
| 14 | `YKV_2026_7720201` (Dược học) | `PT100` | `A00` | Toán, Vật lý, Hóa học | Điểm thi THPT |
| 15 | `YKV_2026_7720201` (Dược học) | `PT100` | `D07` | Toán, Hóa học, Tiếng Anh | Điểm thi THPT |
| 16 | `YKV_2026_7720201` (Dược học) | `PT200` | `B00` | Toán, Hóa học, Sinh học | Xét học bạ THPT |
| 17 | `YKV_2026_7720201` (Dược học) | `PT200` | `A00` | Toán, Vật lý, Hóa học | Xét học bạ THPT |
| 18 | `YKV_2026_7720201` (Dược học) | `PT200` | `D07` | Toán, Hóa học, Tiếng Anh | Xét học bạ THPT |
| 19 | `YKV_2026_7720201` (Dược học) | `PT301` | `B00` | Xét tuyển thẳng | Quy chế Bộ GD&ĐT |
| 20 | `YKV_2026_7720201` (Dược học) | `PT500` | `B00` | Dự bị ĐH & Lào | QĐ UBND tỉnh |
| 21 | `YKV_2026_7720301` (Điều dưỡng) | `PT100` | `B00, A00, D07` | 3 Tổ hợp | Điểm thi THPT |
| 22 | `YKV_2026_7720301` (Điều dưỡng) | `PT200` | `B00, A00, D07` | 3 Tổ hợp | Xét học bạ THPT |
| 23 | `YKV_2026_7720301` (Điều dưỡng) | `PT301` | `B00` | Xét tuyển thẳng | Quy chế Bộ GD&ĐT |
| 24 | `YKV_2026_7720301` (Điều dưỡng) | `PT500` | `B00` | Dự bị ĐH & Lào | QĐ UBND tỉnh |
| 25 | `YKV_2026_7720601` (KT Xét nghiệm) | `PT100` | `B00, A00, D07` | 3 Tổ hợp | Điểm thi THPT |
| 26 | `YKV_2026_7720601` (KT Xét nghiệm) | `PT200` | `B00, A00, D07` | 3 Tổ hợp | Xét học bạ THPT |
| 27 | `YKV_2026_LT7720301` (Điều dưỡng LT) | `PT200` | `B00` | Toán, Hóa học, Sinh học | Xét học bạ/hồ sơ |

---

## 7. BẢNG `benchmarks_quotas` (Điểm Chuẩn & Chỉ Tiêu 2 Năm Gần Nhất: 2024 & 2025)

| STT | Tên ngành | Phương thức | Tổ hợp môn | Chỉ tiêu 2024 | Nhập học 2024 | Điểm chuẩn 2024 | Chỉ tiêu 2025 | Nhập học 2025 | Điểm chuẩn 2025 |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **Y khoa** | `PT100` (THPT) | B00 (2024) / A00, B00 (2025) | 410 | 423 | **24.85** | 450 | 413 | **22.10** |
| 2 | **Y học dự phòng** | `PT100` (THPT) | B00 (2024) / A00, B00, D07 (2025) | 30 | 9 | **19.00** | 30 | 15 | **17.25** |
| 3 | **Y học dự phòng** | `PT200` (Học bạ) | B00 (2024) / A00, B00, D07 (2025) | — | 12 | **22.30** | — | 15 | **23.80** |
| 4 | **Dược học** | `PT100` (THPT) | B00, A00 | 160 | 150 | **23.00** | 160 | 56 | **19.00** |
| 5 | **Điều dưỡng** | `PT100` (THPT) | B00 (2024) / A00, B00, D07 (2025) | 250 | 200 | **19.00** | 250 | 106 | **17.50** |
| 6 | **Điều dưỡng** | `PT200` (Học bạ) | B00 (2024) / A00, B00, D07 (2025) | — | 44 | **20.60** | — | 200 | **23.80** |
| 7 | **Kỹ thuật xét nghiệm y học** | `PT100` (THPT) | B00 (2024) / A00, B00, D07 (2025) | 60 | 63 | **19.00** | 60 | 12 | **20.00** |
| 8 | **Kỹ thuật xét nghiệm y học** | `PT200` (Học bạ) | B00 (2024) / A00, B00, D07 (2025) | — | 4 | **20.60** | — | 58 | **24.90** |
| 9 | **Điều dưỡng LT VLVH** | `PT200` (Học bạ/CĐ) | B00 | 300 | 282 | **20.00** | 350 | 261 | **14.00** |

---

## 8. BẢNG `universal_conversions` (Bảng Quy Đổi Điểm Cộng Chứng Chỉ Tiếng Anh Quốc Tế — Phụ lục 1)

> Áp dụng cộng điểm khuyến khích vào tổng điểm xét tuyển (thang điểm 30).

| STT | Chứng chỉ | Điểm / Khung điểm đạt | Mức điểm cộng | Ghi chú |
| :---: | :--- | :---: | :---: | :--- |
| 1 | **IELTS Academic** | `5.0 – 6.0` | **+0.5** | Phụ lục 1 |
| 2 | **IELTS Academic** | `6.5 – 7.0` | **+1.0** | Phụ lục 1 |
| 3 | **IELTS Academic** | `≥ 7.5` | **+1.5** | Phụ lục 1 |
| 4 | **TOEFL iBT** | `35 – 78` | **+0.5** | Phụ lục 1 |
| 5 | **TOEFL iBT** | `79 – 101` | **+1.0** | Phụ lục 1 |
| 6 | **TOEFL iBT** | `≥ 102` | **+1.5** | Phụ lục 1 |
| 7 | **Cambridge Scale** | `154 – 175` | **+0.5** | Phụ lục 1 |
| 8 | **Cambridge Scale** | `176 – 190` | **+1.0** | Phụ lục 1 |
| 9 | **Cambridge Scale** | `≥ 191` | **+1.5** | Phụ lục 1 |
| 10 | **PTE Academic** | `36 – 58` | **+0.5** | Phụ lục 1 |
| 11 | **PTE Academic** | `59 – 75` | **+1.0** | Phụ lục 1 |
| 12 | **PTE Academic** | `≥ 76` | **+1.5** | Phụ lục 1 |
| 13 | **TOEIC 4 kỹ năng** | `L&R: 600+ / S&W: 240+` | **+0.5** | Phụ lục 1 |
| 14 | **TOEIC 4 kỹ năng** | `L&R: 850+ / S&W: 350+` | **+1.0** | Phụ lục 1 |
| 15 | **TOEIC 4 kỹ năng** | `L&R: 950+ / S&W: 80+` | **+1.5** | Phụ lục 1 |

---

## 9. BẢNG `bonus_policies` (Chính Sách Điểm Thưởng & Điểm Cộng Học Sinh Giỏi / KHKT)

| Mã chính sách | Tên chính sách | Điều kiện đạt | Mức điểm cộng (Thang 30) | Quy tắc khống chế |
| :--- | :--- | :--- | :---: | :--- |
| `YKV_BONUS_HSG_1` | Giải Nhất HSG Quốc gia / Quốc tế | Môn Toán, Lý, Hóa, Sinh | **+3.0** | Tổng điểm cộng không vượt quá 3.0 điểm |
| `YKV_BONUS_HSG_2` | Giải Nhì HSG Quốc gia / Quốc tế | Môn Toán, Lý, Hóa, Sinh | **+2.0** | Tổng điểm cộng không vượt quá 3.0 điểm |
| `YKV_BONUS_HSG_3` | Giải Ba HSG Quốc gia / Quốc tế | Môn Toán, Lý, Hóa, Sinh | **+1.5** | Tổng điểm cộng không vượt quá 3.0 điểm |
| `YKV_BONUS_HSG_KK` | Giải Khuyến khích HSG Quốc gia | Môn Toán, Lý, Hóa, Sinh | **+1.0** | Tổng điểm cộng không vượt quá 3.0 điểm |
| `YKV_BONUS_KHKT_4` | Giải Tư cuộc thi KHKT Quốc gia/Quốc tế | Đề tài phù hợp ngành | **+1.0** | Tổng điểm cộng không vượt quá 3.0 điểm |

---

## 10. BẢNG `track_eligibility_rules` (Ngưỡng Đảm Bảo Chất Lượng Đầu Vào / Điều Kiện Nộp Hồ Sơ)

| `track_id` | Phương thức | Điều kiện học lực lớp 12 | Điều kiện tổng điểm tốt nghiệp THPT | Ghi chú |
| :--- | :---: | :--- | :--- | :--- |
| `YKV_2026_7720201` (Dược học) | `PT200` (Học bạ) | Học lực lớp 12 xếp loại **Giỏi** trở lên | Tổng điểm 3 môn tổ hợp $\ge 20.00$ hoặc điểm xét TN $\ge 8.50$ | Bắt buộc đối với Dược học |
| `YKV_2026_7720110` (Y học dự phòng) | `PT200` (Học bạ) | Học lực lớp 12 xếp loại **Khá** trở lên | Tổng điểm 3 môn tổ hợp $\ge 16.50$ hoặc điểm xét TN $\ge 6.50$ | Quy định khối sức khỏe |
| `YKV_2026_7720301` (Điều dưỡng) | `PT200` (Học bạ) | Học lực lớp 12 xếp loại **Khá** trở lên | Tổng điểm 3 môn tổ hợp $\ge 16.50$ hoặc điểm xét TN $\ge 6.50$ | Quy định khối sức khỏe |
| `YKV_2026_7720601` (KT Xét nghiệm) | `PT200` (Học bạ) | Học lực lớp 12 xếp loại **Khá** trở lên | Tổng điểm 3 môn tổ hợp $\ge 16.50$ hoặc điểm xét TN $\ge 6.50$ | Quy định khối sức khỏe |
| `YKV_2026_7720101` (Y khoa) | `PT200` (Học bạ) | ❌ **Không áp dụng** | ❌ **Không xét học bạ đối với ngành Y khoa** | Chỉ xét PT100, PT301, PT500 |

---

## 11. BẢNG `track_tie_breakers` (Tiêu Chí Phụ Xét Tuyển Khi Cùng Điểm Cuối Danh Sách)

| `track_id` | Thứ tự ưu tiên (`priority_order`) | Tên tiêu chí phụ | Mô tả chi tiết |
| :--- | :---: | :--- | :--- |
| Áp dụng toàn trường (`YKV_2026_*`) | 1 | Điểm cộng thấp hơn | Ưu tiên thí sinh có điểm cộng thấp hơn (tức điểm thi gốc cao hơn) |
| Áp dụng toàn trường (`YKV_2026_*`) | 2 | Thứ tự nguyện vọng | Ưu tiên thí sinh đặt nguyện vọng cao hơn (NV1 > NV2 > ...) |
| Áp dụng toàn trường (`YKV_2026_*`) | 3 | Phương thức xét tuyển | Ưu tiên thí sinh xét theo kết quả thi tốt nghiệp THPT năm 2026 |
| Liên thông CĐ-ĐH (`YKV_2026_LT7720301`) | 1 | Chứng chỉ hành nghề | Ưu tiên thí sinh đã có giấy phép/chứng chỉ hành nghề |
| Liên thông CĐ-ĐH (`YKV_2026_LT7720301`) | 2 | Thâm niên công tác | Ưu tiên thí sinh có thâm niên công tác lâu năm hơn |
