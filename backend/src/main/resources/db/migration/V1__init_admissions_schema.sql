-- =========================================================
-- V1__init_admissions_schema.sql
-- AdmissionKG Complete Initial Database Schema (23 Tables)
-- =========================================================

-- Enable uuid or pgcrypto extension if needed in future
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================
-- 1. TỔ CHỨC & ĐÀO TẠO (Institutional & Academic Hierarchy)
-- =========================================================

-- 1.1 Trường / Học viện / ĐHQG
CREATE TABLE institutions (
    institution_id VARCHAR(50) PRIMARY KEY,
    institution_code VARCHAR(50) NOT NULL UNIQUE,
    institution_name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(100),
    parent_institution_id VARCHAR(50) REFERENCES institutions(institution_id) ON DELETE SET NULL,
    contact_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_institutions_parent ON institutions(parent_institution_id);

-- 1.2 Cơ sở / Phân hiệu Đào tạo
CREATE TABLE campuses (
    campus_id VARCHAR(50) PRIMARY KEY,
    institution_id VARCHAR(50) NOT NULL REFERENCES institutions(institution_id) ON DELETE CASCADE,
    campus_code VARCHAR(50),
    campus_name VARCHAR(255) NOT NULL,
    province_city VARCHAR(100),
    region VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_campuses_institution ON campuses(institution_id);

-- 1.3 Khối ngành Đào tạo
CREATE TABLE academic_fields (
    field_code VARCHAR(50) PRIMARY KEY,
    field_name VARCHAR(255) NOT NULL
);

-- 1.4 Ngành Đào tạo Chuẩn
CREATE TABLE majors (
    major_code VARCHAR(50) PRIMARY KEY,
    field_code VARCHAR(50) REFERENCES academic_fields(field_code) ON DELETE SET NULL,
    major_name VARCHAR(255) NOT NULL,
    degree_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_majors_field ON majors(field_code);

-- 1.5 Đề án Tuyển sinh Hàng năm
CREATE TABLE admission_schemes (
    scheme_id VARCHAR(100) PRIMARY KEY,
    institution_id VARCHAR(50) NOT NULL REFERENCES institutions(institution_id) ON DELETE CASCADE,
    academic_year INT NOT NULL,
    total_quota INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_scheme_inst_year UNIQUE (institution_id, academic_year)
);

CREATE INDEX idx_schemes_year ON admission_schemes(academic_year);

-- 1.6 Chương trình Tuyển sinh (Mã ĐKXT)
CREATE TABLE admission_tracks (
    track_id VARCHAR(100) PRIMARY KEY,
    scheme_id VARCHAR(100) NOT NULL REFERENCES admission_schemes(scheme_id) ON DELETE CASCADE,
    campus_id VARCHAR(50) REFERENCES campuses(campus_id) ON DELETE SET NULL,
    major_code VARCHAR(50) REFERENCES majors(major_code) ON DELETE SET NULL,
    admission_code VARCHAR(50) NOT NULL,
    track_name VARCHAR(255) NOT NULL,
    track_type VARCHAR(100),
    orientation_cert VARCHAR(100),
    tuition_policy JSONB,
    allocated_quota INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tracks_scheme ON admission_tracks(scheme_id);
CREATE INDEX idx_tracks_major ON admission_tracks(major_code);
CREATE INDEX idx_tracks_campus ON admission_tracks(campus_id);

-- =========================================================
-- 2. NGHỀ NGHIỆP & ĐỊNH HƯỚNG (Career Orientation)
-- =========================================================

-- 2.1 Danh mục Nghề nghiệp
CREATE TABLE careers (
    career_id VARCHAR(100) PRIMARY KEY,
    career_title VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    required_skills JSONB
);

-- 2.2 Ánh xạ Chương trình Đào tạo - Nghề nghiệp
CREATE TABLE track_career_mapping (
    track_id VARCHAR(100) NOT NULL REFERENCES admission_tracks(track_id) ON DELETE CASCADE,
    career_id VARCHAR(100) NOT NULL REFERENCES careers(career_id) ON DELETE CASCADE,
    suitability_score NUMERIC(3,2) CHECK (suitability_score >= 0.0 AND suitability_score <= 1.0),
    PRIMARY KEY (track_id, career_id)
);

-- =========================================================
-- 3. QUY TẮC, CÔNG THỨC & TIÊU CHÍ PHỤ
-- =========================================================

-- 3.1 Phương thức Tuyển sinh
CREATE TABLE admission_methods (
    method_id VARCHAR(50) PRIMARY KEY,
    method_code VARCHAR(50) NOT NULL,
    method_name VARCHAR(255) NOT NULL,
    target_group VARCHAR(100)
);

-- 3.2 Danh mục Môn học & Môn thi
CREATE TABLE subjects (
    subject_code VARCHAR(50) PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_category VARCHAR(100)
);

-- 3.3 Tổ hợp Môn Xét tuyển
CREATE TABLE subject_combinations (
    combination_code VARCHAR(50) PRIMARY KEY,
    combination_name VARCHAR(255) NOT NULL
);

-- 3.4 Bảng Chi tiết Môn trong Tổ hợp
CREATE TABLE combination_subjects (
    combination_code VARCHAR(50) NOT NULL REFERENCES subject_combinations(combination_code) ON DELETE CASCADE,
    subject_code VARCHAR(50) NOT NULL REFERENCES subjects(subject_code) ON DELETE CASCADE,
    PRIMARY KEY (combination_code, subject_code)
);

-- 3.5 Công thức Tính Điểm Xét tuyển
CREATE TABLE score_formulas (
    formula_id SERIAL PRIMARY KEY,
    formula_code VARCHAR(100) NOT NULL UNIQUE,
    target_scale NUMERIC(5,2) NOT NULL DEFAULT 30.0,
    formula_expression TEXT,
    subject_weights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 4. MA TRẬN XÉT TUYỂN & ĐIỂM CHUẨN
-- =========================================================

-- 4.1 Ma trận Chương trình - Phương thức - Tổ hợp
CREATE TABLE track_method_combinations (
    tmc_id SERIAL PRIMARY KEY,
    track_id VARCHAR(100) NOT NULL REFERENCES admission_tracks(track_id) ON DELETE CASCADE,
    method_id VARCHAR(50) NOT NULL REFERENCES admission_methods(method_id) ON DELETE CASCADE,
    combination_code VARCHAR(50) NOT NULL REFERENCES subject_combinations(combination_code) ON DELETE CASCADE,
    formula_id INT REFERENCES score_formulas(formula_id) ON DELETE SET NULL,
    specific_quota INT,
    CONSTRAINT uq_tmc UNIQUE (track_id, method_id, combination_code)
);

CREATE INDEX idx_tmc_track ON track_method_combinations(track_id);
CREATE INDEX idx_tmc_method ON track_method_combinations(method_id);
CREATE INDEX idx_tmc_comb ON track_method_combinations(combination_code);

-- 4.2 Lịch sử Điểm chuẩn & Chỉ tiêu Tuyển sinh
CREATE TABLE benchmarks_quotas (
    benchmark_id SERIAL PRIMARY KEY,
    tmc_id INT NOT NULL REFERENCES track_method_combinations(tmc_id) ON DELETE CASCADE,
    academic_year INT NOT NULL,
    quota INT,
    admitted_count INT,
    benchmark_score NUMERIC(5,2) NOT NULL,
    score_scale NUMERIC(5,2) NOT NULL DEFAULT 30.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_benchmark_year UNIQUE (tmc_id, academic_year)
);

CREATE INDEX idx_benchmarks_year ON benchmarks_quotas(academic_year);

-- 4.3 Quy tắc Điều kiện Sàn (Gatekeeper)
CREATE TABLE track_eligibility_rules (
    rule_id SERIAL PRIMARY KEY,
    track_id VARCHAR(100) NOT NULL REFERENCES admission_tracks(track_id) ON DELETE CASCADE,
    method_id VARCHAR(50) REFERENCES admission_methods(method_id) ON DELETE CASCADE,
    rule_type VARCHAR(100),
    rule_value JSONB,
    error_message_vi TEXT
);

CREATE INDEX idx_rules_track ON track_eligibility_rules(track_id);

-- 4.4 Tiêu chí Phụ khi Hòa điểm
CREATE TABLE track_tie_breakers (
    tie_breaker_id SERIAL PRIMARY KEY,
    track_id VARCHAR(100) NOT NULL REFERENCES admission_tracks(track_id) ON DELETE CASCADE,
    priority_order INT NOT NULL,
    criterion_type VARCHAR(100) NOT NULL,
    sort_direction VARCHAR(10) DEFAULT 'DESC'
);

CREATE INDEX idx_tie_breakers_track ON track_tie_breakers(track_id);

-- 4.5 Bảng Quy đổi Chứng chỉ Ngoại ngữ & Giải thưởng
CREATE TABLE universal_conversions (
    conversion_id SERIAL PRIMARY KEY,
    institution_id VARCHAR(50) REFERENCES institutions(institution_id) ON DELETE CASCADE,
    cert_or_achievement_type VARCHAR(100) NOT NULL,
    min_input_value VARCHAR(100) NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    converted_score NUMERIC(5,2),
    bonus_point NUMERIC(5,2)
);

CREATE INDEX idx_conversions_inst ON universal_conversions(institution_id);

-- 4.6 Chính sách Điểm Ưu tiên & Khuyến khích của Trường
CREATE TABLE bonus_policies (
    policy_id SERIAL PRIMARY KEY,
    institution_id VARCHAR(50) NOT NULL REFERENCES institutions(institution_id) ON DELETE CASCADE,
    achievement_category VARCHAR(100) NOT NULL,
    prize_level VARCHAR(100) NOT NULL,
    bonus_points NUMERIC(5,2) NOT NULL,
    max_accumulated_bonus NUMERIC(5,2)
);

CREATE INDEX idx_bonus_inst ON bonus_policies(institution_id);

-- =========================================================
-- 5. NGƯỜI DÙNG, HỒ SƠ & ĐÁNH GIÁ TWD (Users & Three-Way Decision)
-- =========================================================

-- 5.1 Tài khoản Người dùng
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'ROLE_STUDENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.2 Hồ sơ Học tập Thí sinh
CREATE TABLE user_academic_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    thpt_scores JSONB,
    hocba_scores JSONB,
    aptitude_test_scores JSONB,
    international_certificates JSONB,
    achievements JSONB,
    priority_area VARCHAR(50),
    priority_group VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_academic_profiles_user ON user_academic_profiles(user_id);

-- 5.3 Danh sách Nguyện vọng Đăng ký Xét tuyển
CREATE TABLE user_wishes (
    wish_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    profile_id INT REFERENCES user_academic_profiles(profile_id) ON DELETE SET NULL,
    wish_order INT NOT NULL,
    tmc_id INT NOT NULL REFERENCES track_method_combinations(tmc_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_wish_order UNIQUE (user_id, wish_order)
);

CREATE INDEX idx_wishes_user ON user_wishes(user_id);
CREATE INDEX idx_wishes_tmc ON user_wishes(tmc_id);

-- 5.4 Nhật ký Phân tích Đánh giá Quyết định Ba Vùng (TWD)
CREATE TABLE twd_evaluation_logs (
    log_id SERIAL PRIMARY KEY,
    wish_id INT NOT NULL UNIQUE REFERENCES user_wishes(wish_id) ON DELETE CASCADE,
    final_admission_score NUMERIC(5,2) NOT NULL,
    twd_risk_zone VARCHAR(10) NOT NULL, -- POS, BND, NEG
    safety_margin NUMERIC(5,2),
    eligibility_status VARCHAR(50) NOT NULL, -- QUALIFIED, DISQUALIFIED
    recommendation_strategy TEXT,
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_twd_zone ON twd_evaluation_logs(twd_risk_zone);

