-- =========================================================
-- V4__add_province_and_region.sql
-- Thêm thông tin Tỉnh / Thành phố và Vùng miền (Bắc / Trung / Nam)
-- cho Hồ sơ thí sinh và Trường học
-- =========================================================

-- 1. Bổ sung cho bảng Hồ sơ học tập thí sinh (user_academic_profiles)
ALTER TABLE user_academic_profiles 
    ADD COLUMN IF NOT EXISTS province_city VARCHAR(100),
    ADD COLUMN IF NOT EXISTS region VARCHAR(50);

CREATE INDEX IF NOT EXISTS idx_academic_profiles_region ON user_academic_profiles(region);
CREATE INDEX IF NOT EXISTS idx_academic_profiles_province ON user_academic_profiles(province_city);

-- 2. Bổ sung cho bảng Trường đại học / Học viện (institutions)
ALTER TABLE institutions 
    ADD COLUMN IF NOT EXISTS province_city VARCHAR(100),
    ADD COLUMN IF NOT EXISTS region VARCHAR(50);

CREATE INDEX IF NOT EXISTS idx_institutions_region ON institutions(region);
CREATE INDEX IF NOT EXISTS idx_institutions_province ON institutions(province_city);

-- 3. Tạo index cho campuses nếu chưa có
CREATE INDEX IF NOT EXISTS idx_campuses_region ON campuses(region);
CREATE INDEX IF NOT EXISTS idx_campuses_province ON campuses(province_city);
