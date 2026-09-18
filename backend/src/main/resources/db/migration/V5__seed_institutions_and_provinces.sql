-- =========================================================
-- V5__seed_institutions_and_provinces.sql
-- 1. Cập nhật và chuẩn hóa Tỉnh/TP và Vùng miền cho các trường hiện có trong DB
-- 2. Nạp thêm danh mục các trường Đại học trọng điểm toàn quốc (Bắc, Trung, Nam)
--    theo 34 đơn vị hành chính mới (Nghị quyết 202/2025/QH15)
-- =========================================================

-- A. CẬP NHẬT DỮ LIỆU TỪ CAMPUSES SANG INSTITUTIONS (NẾU ĐÃ CÓ)
UPDATE institutions i
SET 
    province_city = COALESCE(i.province_city, c.province_city),
    region = COALESCE(i.region, c.region)
FROM campuses c
WHERE i.institution_id = c.institution_id
  AND (i.province_city IS NULL OR i.region IS NULL);

-- B. CẬP NHẬT TỰ ĐỘNG THEO TÊN HOẶC MÃ TRƯỜNG CHO CÁC RECORD ĐÃ CÓ TRONG DB

-- 1. TP. Hồ Chí Minh (Miền Nam)
UPDATE institutions
SET province_city = 'TP. Hồ Chí Minh', region = 'Miền Nam'
WHERE (institution_name ILIKE '%Hồ Chí Minh%' 
   OR institution_name ILIKE '%TP.HCM%' 
   OR institution_name ILIKE '%TPHCM%'
   OR institution_name ILIKE '%Sài Gòn%'
   OR institution_name ILIKE '%Bình Dương%'
   OR institution_name ILIKE '%Bà Rịa%'
   OR institution_name ILIKE '%Vũng Tàu%'
   OR institution_code IN ('QSC','QSB','QSX','QST','QSK','QSY','SGU','UEH','UMP','UET_HCM','KHTN_HCM','IU','USSH_HCM','UIT','SPK','HCMUT','HCMUS','TDTU','HUTECH','VLU','OU','YDS'))
  AND (province_city IS NULL OR region IS NULL);

-- 2. TP. Hà Nội (Miền Bắc)
UPDATE institutions
SET province_city = 'TP. Hà Nội', region = 'Miền Bắc'
WHERE (institution_name ILIKE '%Hà Nội%' 
   OR institution_name ILIKE '%ĐHQGHN%' 
   OR institution_name ILIKE '%Bách Khoa Hà Nội%'
   OR institution_code IN ('BKA','NEU','FTU','KHA','QHI','QHT','QHX','QHL','UET','HUS','USSH','HUST','HNUE','HMU','AJC','DAV','HVTC','BA'))
  AND (province_city IS NULL OR region IS NULL);

-- 3. TP. Đà Nẵng (Miền Trung)
UPDATE institutions
SET province_city = 'TP. Đà Nẵng', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Đà Nẵng%' 
   OR institution_name ILIKE '%Quảng Nam%'
   OR institution_code IN ('DDA','DDK','DDT','DDS','DUT','UED','DUE','UFL'))
  AND (province_city IS NULL OR region IS NULL);

-- 4. TP. Huế (Miền Trung)
UPDATE institutions
SET province_city = 'TP. Huế', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Huế%' 
   OR institution_name ILIKE '%Thừa Thiên%'
   OR institution_code IN ('DHF','DHY','DHK','DHT','DHH','HUEUNI'))
  AND (province_city IS NULL OR region IS NULL);

-- 5. TP. Cần Thơ (Miền Nam)
UPDATE institutions
SET province_city = 'TP. Cần Thơ', region = 'Miền Nam'
WHERE (institution_name ILIKE '%Cần Thơ%' 
   OR institution_name ILIKE '%Hậu Giang%'
   OR institution_name ILIKE '%Sóc Trăng%'
   OR institution_code IN ('TCT','CTU','DNC','CTUMP'))
  AND (province_city IS NULL OR region IS NULL);

-- 6. Tỉnh Gia Lai (Miền Trung - gồm Gia Lai + Bình Định)
UPDATE institutions
SET province_city = 'Gia Lai', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Quy Nhơn%' 
   OR institution_name ILIKE '%Bình Định%'
   OR institution_name ILIKE '%Gia Lai%'
   OR institution_name ILIKE '%Pleiku%'
   OR institution_code IN ('DQN','QNU'))
  AND (province_city IS NULL OR region IS NULL);

-- 7. Tỉnh Lâm Đồng (Miền Trung - gồm Lâm Đồng + Bình Thuận + Đắk Nông)
UPDATE institutions
SET province_city = 'Lâm Đồng', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Đà Lạt%' 
   OR institution_name ILIKE '%Lâm Đồng%'
   OR institution_name ILIKE '%Phan Thiết%'
   OR institution_code IN ('TDL','DLU'))
  AND (province_city IS NULL OR region IS NULL);

-- 8. Tỉnh Đắk Lắk (Miền Trung - gồm Đắk Lắk + Phú Yên)
UPDATE institutions
SET province_city = 'Đắk Lắk', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Tây Nguyên%' 
   OR institution_name ILIKE '%Đắk Lắk%'
   OR institution_name ILIKE '%Buôn Ma Thuột%'
   OR institution_name ILIKE '%Phú Yên%'
   OR institution_code IN ('TTN','DPY'))
  AND (province_city IS NULL OR region IS NULL);

-- 9. Tỉnh Khánh Hòa (Miền Trung - gồm Khánh Hòa + Ninh Thuận)
UPDATE institutions
SET province_city = 'Khánh Hòa', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Nha Trang%' 
   OR institution_name ILIKE '%Khánh Hòa%'
   OR institution_code IN ('TSN','NTU'))
  AND (province_city IS NULL OR region IS NULL);

-- 10. Tỉnh Nghệ An (Miền Trung)
UPDATE institutions
SET province_city = 'Nghệ An', region = 'Miền Trung'
WHERE (institution_name ILIKE '%Vinh%' 
   OR institution_name ILIKE '%Nghệ An%'
   OR institution_code IN ('TDV','VINHUNI'))
  AND (province_city IS NULL OR region IS NULL);

-- 11. Tỉnh Thái Nguyên (Miền Bắc - gồm Thái Nguyên + Bắc Kạn)
UPDATE institutions
SET province_city = 'Thái Nguyên', region = 'Miền Bắc'
WHERE (institution_name ILIKE '%Thái Nguyên%' 
   OR institution_code IN ('DTN','TNUS','TNUT','TNU'))
  AND (province_city IS NULL OR region IS NULL);

-- 12. TP. Hải Phòng (Miền Bắc - gồm Hải Phòng + Hải Dương)
UPDATE institutions
SET province_city = 'TP. Hải Phòng', region = 'Miền Bắc'
WHERE (institution_name ILIKE '%Hải Phòng%' 
   OR institution_name ILIKE '%Hải Dương%'
   OR institution_name ILIKE '%Hàng Hải%'
   OR institution_code IN ('HHA','VMU','THP'))
  AND (province_city IS NULL OR region IS NULL);

-- 13. Tỉnh Đồng Nai (Miền Nam - gồm Đồng Nai + Bình Phước)
UPDATE institutions
SET province_city = 'Đồng Nai', region = 'Miền Nam'
WHERE (institution_name ILIKE '%Đồng Nai%' 
   OR institution_name ILIKE '%Lạc Hồng%'
   OR institution_code IN ('DND','LHU'))
  AND (province_city IS NULL OR region IS NULL);


-- C. SEED DANH MỤC TRƯỜNG ĐẠI HỌC TIÊU BIỂU TOÀN QUỐC THEO 34 TỈNH THÀNH MỚI
-- (Sử dụng ON CONFLICT để cập nhật nếu đã tồn tại)

INSERT INTO institutions (institution_id, institution_code, institution_name, institution_type, province_city, region, contact_info)
VALUES
-- === MIỀN NAM ===
('INST_QSC', 'QSC', 'Trường Đại học Công nghệ Thông tin - ĐHQG-HCM', 'Đại học thành viên', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "Khu đô thị ĐHQG-HCM, TP. Thủ Đức, TP. Hồ Chí Minh", "website": "https://uit.edu.vn"}'),
('INST_QSB', 'QSB', 'Trường Đại học Bách khoa - ĐHQG-HCM', 'Đại học thành viên', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "268 Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh", "website": "https://hcmut.edu.vn"}'),
('INST_QST', 'QST', 'Trường Đại học Khoa học Tự nhiên - ĐHQG-HCM', 'Đại học thành viên', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "227 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh", "website": "https://hcmus.edu.vn"}'),
('INST_QSX', 'QSX', 'Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG-HCM', 'Đại học thành viên', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "10-12 Đinh Tiên Hoàng, Quận 1, TP. Hồ Chí Minh", "website": "https://hcmussh.edu.vn"}'),
('INST_QSK', 'QSK', 'Trường Đại học Kinh tế - Luật - ĐHQG-HCM', 'Đại học thành viên', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "Khu phố 3, P. Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh", "website": "https://uel.edu.vn"}'),
('INST_QSY', 'QSY', 'Trường Đại học Quốc tế - ĐHQG-HCM', 'Đại học thành viên', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "Khu đô thị ĐHQG-HCM, TP. Thủ Đức, TP. Hồ Chí Minh", "website": "https://hcmiu.edu.vn"}'),
('INST_SGU', 'SGU', 'Trường Đại học Sài Gòn', 'Đại học công lập', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "273 An Dương Vương, Quận 5, TP. Hồ Chí Minh", "website": "https://sgu.edu.vn"}'),
('INST_UEH', 'UEH', 'Đại học Kinh tế TP. Hồ Chí Minh', 'Đại học trọng điểm', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "59C Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh", "website": "https://ueh.edu.vn"}'),
('INST_SPK', 'SPK', 'Trường Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh', 'Đại học công lập', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "01 Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh", "website": "https://hcmute.edu.vn"}'),
('INST_YDS', 'YDS', 'Đại học Y Dược TP. Hồ Chí Minh', 'Đại học công lập', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "217 Hồng Bàng, Quận 5, TP. Hồ Chí Minh", "website": "https://ump.edu.vn"}'),
('INST_TDTU', 'TDTU', 'Trường Đại học Tôn Đức Thắng', 'Đại học công lập', 'TP. Hồ Chí Minh', 'Miền Nam', '{"address": "19 Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh", "website": "https://tdtu.edu.vn"}'),
('INST_CTU', 'CTU', 'Trường Đại học Cần Thơ', 'Đại học trọng điểm', 'TP. Cần Thơ', 'Miền Nam', '{"address": "Khu II, Đường 3/2, Q. Ninh Kiều, TP. Cần Thơ", "website": "https://ctu.edu.vn"}'),
('INST_LHU', 'LHU', 'Trường Đại học Lạc Hồng', 'Đại học tư thục', 'Đồng Nai', 'Miền Nam', '{"address": "Số 10 Huỳnh Văn Nghệ, TP. Biên Hòa, Đồng Nai", "website": "https://lhu.edu.vn"}'),
('INST_DTP', 'DTP', 'Trường Đại học Đồng Tháp', 'Đại học công lập', 'Đồng Tháp', 'Miền Nam', '{"address": "783 Phạm Hữu Lầu, TP. Cao Lãnh, Đồng Tháp", "website": "https://dthu.edu.vn"}'),
('INST_AGU', 'AGU', 'Trường Đại học An Giang - ĐHQG-HCM', 'Đại học thành viên', 'An Giang', 'Miền Nam', '{"address": "18 Ung Văn Khiêm, TP. Long Xuyên, An Giang", "website": "https://agu.edu.vn"}'),
('INST_TVU', 'TVU', 'Trường Đại học Trà Vinh', 'Đại học công lập', 'Vĩnh Long', 'Miền Nam', '{"address": "Số 126 Nguyễn Thiện Thành, Tỉnh Vĩnh Long", "website": "https://tvu.edu.vn"}'),

-- === MIỀN BẮC ===
('INST_BKA', 'BKA', 'Đại học Bách khoa Hà Nội', 'Đại học trọng điểm', 'TP. Hà Nội', 'Miền Bắc', '{"address": "Số 1 Đại Cồ Việt, Hai Bà Trưng, TP. Hà Nội", "website": "https://hust.edu.vn"}'),
('INST_NEU', 'NEU', 'Trường Đại học Kinh tế Quốc dân', 'Đại học trọng điểm', 'TP. Hà Nội', 'Miền Bắc', '{"address": "207 Giải Phóng, Hai Bà Trưng, TP. Hà Nội", "website": "https://neu.edu.vn"}'),
('INST_FTU', 'FTU', 'Trường Đại học Ngoại thương', 'Đại học công lập', 'TP. Hà Nội', 'Miền Bắc', '{"address": "91 Chùa Láng, Đống Đa, TP. Hà Nội", "website": "https://ftu.edu.vn"}'),
('INST_QHI', 'QHI', 'Trường Đại học Công nghệ - ĐHQGHN', 'Đại học thành viên', 'TP. Hà Nội', 'Miền Bắc', '{"address": "144 Xuân Thủy, Cầu Giấy, TP. Hà Nội", "website": "https://uet.vnu.edu.vn"}'),
('INST_QHT', 'QHT', 'Trường Đại học Khoa học Tự nhiên - ĐHQGHN', 'Đại học thành viên', 'TP. Hà Nội', 'Miền Bắc', '{"address": "334 Nguyễn Trãi, Thanh Xuân, TP. Hà Nội", "website": "https://hus.vnu.edu.vn"}'),
('INST_QHX', 'QHX', 'Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN', 'Đại học thành viên', 'TP. Hà Nội', 'Miền Bắc', '{"address": "336 Nguyễn Trãi, Thanh Xuân, TP. Hà Nội", "website": "https://ussh.vnu.edu.vn"}'),
('INST_HNUE', 'HNUE', 'Trường Đại học Sư phạm Hà Nội', 'Đại học trọng điểm', 'TP. Hà Nội', 'Miền Bắc', '{"address": "136 Xuân Thủy, Cầu Giấy, TP. Hà Nội", "website": "https://hnue.edu.vn"}'),
('INST_HMU', 'HMU', 'Trường Đại học Y Hà Nội', 'Đại học trọng điểm', 'TP. Hà Nội', 'Miền Bắc', '{"address": "Số 1 Tôn Thất Tùng, Đống Đa, TP. Hà Nội", "website": "https://hmu.edu.vn"}'),
('INST_HHA', 'HHA', 'Trường Đại học Hàng hải Việt Nam', 'Đại học trọng điểm', 'TP. Hải Phòng', 'Miền Bắc', '{"address": "484 Lạch Tray, Lê Chân, TP. Hải Phòng", "website": "https://vimaru.edu.vn"}'),
('INST_TNU', 'TNU', 'Đại học Thái Nguyên', 'Đại học vùng', 'Thái Nguyên', 'Miền Bắc', '{"address": "Phường Tân Thịnh, TP. Thái Nguyên, Thái Nguyên", "website": "https://tnu.edu.vn"}'),
('INST_HDT', 'HDT', 'Trường Đại học Hùng Vương', 'Đại học công lập', 'Phú Thọ', 'Miền Bắc', '{"address": "Nông Trang, TP. Việt Trì, Phú Thọ", "website": "https://hvu.edu.vn"}'),
('INST_HLU', 'HLU', 'Trường Đại học Hạ Long', 'Đại học công lập', 'Quảng Ninh', 'Miền Bắc', '{"address": "258 Bạch Đằng, TP. Uông Bí, Quảng Ninh", "website": "https://daihochalong.edu.vn"}'),
('INST_TQU', 'TQU', 'Trường Đại học Tân Trào', 'Đại học công lập', 'Tuyên Quang', 'Miền Bắc', '{"address": "Km 9, Trung Môn, Yên Sơn, Tuyên Quang", "website": "https://nctu.edu.vn"}'),
('INST_HBVU', 'HBVU', 'Trường Đại học Hoa Lư', 'Đại học công lập', 'Ninh Bình', 'Miền Bắc', '{"address": "Ninh Nhất, TP. Ninh Bình, Ninh Bình", "website": "https://hvd.edu.vn"}'),

-- === MIỀN TRUNG & TÂY NGUYÊN ===
('INST_DUT', 'DUT', 'Trường Đại học Bách khoa - Đại học Đà Nẵng', 'Đại học thành viên', 'TP. Đà Nẵng', 'Miền Trung', '{"address": "54 Nguyễn Lương Bằng, Liên Chiểu, TP. Đà Nẵng", "website": "https://dut.udn.vn"}'),
('INST_DUE', 'DUE', 'Trường Đại học Kinh tế - Đại học Đà Nẵng', 'Đại học thành viên', 'TP. Đà Nẵng', 'Miền Trung', '{"address": "71 Ngũ Hành Sơn, TP. Đà Nẵng", "website": "https://due.udn.vn"}'),
('INST_DHH', 'DHH', 'Đại học Huế', 'Đại học vùng', 'TP. Huế', 'Miền Trung', '{"address": "03 Lê Lợi, TP. Huế", "website": "https://hueuni.edu.vn"}'),
('INST_QNU', 'QNU', 'Trường Đại học Quy Nhơn', 'Đại học trọng điểm', 'Gia Lai', 'Miền Trung', '{"address": "170 An Dương Vương, TP. Quy Nhơn, Tỉnh Gia Lai", "website": "https://qnu.edu.vn"}'),
('INST_NTU', 'NTU', 'Trường Đại học Nha Trang', 'Đại học công lập', 'Khánh Hòa', 'Miền Trung', '{"address": "02 Nguyễn Đình Chiểu, TP. Nha Trang, Khánh Hòa", "website": "https://ntu.edu.vn"}'),
('INST_DLU', 'DLU', 'Trường Đại học Đà Lạt', 'Đại học công lập', 'Lâm Đồng', 'Miền Trung', '{"address": "01 Phù Đổng Thiên Vương, TP. Đà Lạt, Lâm Đồng", "website": "https://dlu.edu.vn"}'),
('INST_TTN', 'TTN', 'Trường Đại học Tây Nguyên', 'Đại học công lập', 'Đắk Lắk', 'Miền Trung', '{"address": "567 Lê Duẩn, TP. Buôn Ma Thuột, Đắk Lắk", "website": "https://ttn.edu.vn"}'),
('INST_VINH', 'TDV', 'Trường Đại học Vinh', 'Đại học trọng điểm', 'Nghệ An', 'Miền Trung', '{"address": "182 Lê Duẩn, TP. Vinh, Nghệ An", "website": "https://vinhuni.edu.vn"}'),
('INST_HDN', 'HDN', 'Trường Đại học Hồng Đức', 'Đại học công lập', 'Thanh Hóa', 'Miền Trung', '{"address": "565 Quang Trung, TP. Thanh Hóa, Thanh Hóa", "website": "https://hdu.edu.vn"}'),
('INST_PPA', 'PPA', 'Trường Đại học Phạm Văn Đồng', 'Đại học công lập', 'Quảng Ngãi', 'Miền Trung', '{"address": "509 Phan Đình Phùng, TP. Quảng Ngãi, Quảng Ngãi", "website": "https://pdu.edu.vn"}')

ON CONFLICT (institution_code) DO UPDATE 
SET 
    province_city = EXCLUDED.province_city,
    region = EXCLUDED.region,
    contact_info = COALESCE(institutions.contact_info, EXCLUDED.contact_info),
    updated_at = CURRENT_TIMESTAMP;
