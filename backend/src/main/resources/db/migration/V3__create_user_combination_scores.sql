-- =========================================================
-- V3__create_user_combination_scores.sql
-- Bảng Điểm Xét Tuyển Theo Tổ Hợp Môn Của Thí Sinh (Relational Mapping)
-- =========================================================

CREATE TABLE IF NOT EXISTS user_combination_scores (
    id BIGSERIAL PRIMARY KEY,
    profile_id INT NOT NULL REFERENCES user_academic_profiles(profile_id) ON DELETE CASCADE,
    combination_code VARCHAR(50) NOT NULL REFERENCES subject_combinations(combination_code) ON DELETE CASCADE,
    method_type VARCHAR(50) NOT NULL, -- 'THPT_EXAM' (PT100) hoặc 'HOC_BA' (PT200)
    raw_score NUMERIC(5,2),
    base_bonus NUMERIC(4,2),
    effective_bonus NUMERIC(4,2),
    total_score NUMERIC(5,2) NOT NULL,
    is_reduced BOOLEAN DEFAULT FALSE,
    subject_scores JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_profile_comb_method UNIQUE (profile_id, combination_code, method_type)
);

CREATE INDEX IF NOT EXISTS idx_ucs_profile_method ON user_combination_scores(profile_id, method_type);
CREATE INDEX IF NOT EXISTS idx_ucs_comb_code ON user_combination_scores(combination_code);
CREATE INDEX IF NOT EXISTS idx_ucs_total_score ON user_combination_scores(total_score DESC);
