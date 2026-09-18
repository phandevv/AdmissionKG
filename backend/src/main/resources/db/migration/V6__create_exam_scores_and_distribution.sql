-- V6__create_exam_scores_and_distribution.sql
-- Bảng lưu điểm thi THPT gốc (11 môn) của thí sinh, Partition theo năm thi
CREATE TABLE IF NOT EXISTS candidate_exam_scores (
    year SMALLINT NOT NULL,
    sbd VARCHAR(20) NOT NULL,
    province VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    
    -- 11 Môn thi theo CT GDPT 2018 (Thang điểm 0 - 10, lưu đến 2 chữ số thập phân)
    math NUMERIC(4,2),
    literature NUMERIC(4,2),
    physics NUMERIC(4,2),
    chemistry NUMERIC(4,2),
    biology NUMERIC(4,2),
    history NUMERIC(4,2),
    geography NUMERIC(4,2),
    economic_legal NUMERIC(4,2),
    informatics NUMERIC(4,2),
    technology NUMERIC(4,2),
    foreign_language NUMERIC(4,2),

    PRIMARY KEY (year, sbd)
) PARTITION BY RANGE (year);

-- Partition cho năm 2026
CREATE TABLE IF NOT EXISTS candidate_exam_scores_2026 PARTITION OF candidate_exam_scores
    FOR VALUES FROM (2026) TO (2027);

-- Partition cho năm 2025 (dự phòng)
CREATE TABLE IF NOT EXISTS candidate_exam_scores_2025 PARTITION OF candidate_exam_scores
    FOR VALUES FROM (2025) TO (2026);

-- Indexes cho tra cứu cá nhân & lọc theo khu vực
CREATE INDEX IF NOT EXISTS idx_ces_2026_sbd ON candidate_exam_scores_2026 (sbd);
CREATE INDEX IF NOT EXISTS idx_ces_2026_prov ON candidate_exam_scores_2026 (province);
CREATE INDEX IF NOT EXISTS idx_ces_2026_region ON candidate_exam_scores_2026 (region);

-- ============================================================================
-- BẢNG PHỔ ĐIỂM VÀ THỨ HẠNG TÍCH LŨY (PRE-AGGREGATED HISTOGRAM CACHE)
-- Hỗ trợ truy vấn Phổ điểm và Thứ hạng O(1) < 1ms
-- ============================================================================
CREATE TABLE IF NOT EXISTS score_distribution_summary (
    id BIGSERIAL PRIMARY KEY,
    year SMALLINT NOT NULL,
    target_type VARCHAR(20) NOT NULL,              -- 'SUBJECT', 'GROUP'
    target_code VARCHAR(50) NOT NULL,              -- 'MATH', 'LITERATURE', 'A00', 'D01', 'A01'...
    scope_type VARCHAR(20) NOT NULL,               -- 'NATIONAL', 'REGION', 'PROVINCE'
    scope_code VARCHAR(100) NOT NULL,              -- 'ALL', 'Miền Bắc', 'Hà Nội', 'TP. Hồ Chí Minh'...
    score NUMERIC(5,2) NOT NULL,                   -- Mức điểm (vd: 8.25 hoặc 25.50)
    candidate_count INT NOT NULL DEFAULT 0,        -- Số thí sinh đạt mức điểm này (= score)
    higher_count INT NOT NULL DEFAULT 0,           -- Số thí sinh có điểm CAO HƠN mức này (> score)
    lower_count INT NOT NULL DEFAULT 0,            -- Số thí sinh có điểm THẤP HƠN mức này (< score)
    total_candidates INT NOT NULL DEFAULT 0,       -- Tổng số thí sinh dự thi môn/tổ hợp này trong scope
    rank_start INT NOT NULL,                       -- Thứ hạng bắt đầu của mức điểm này (higher_count + 1)
    percentile NUMERIC(5,2) NOT NULL,              -- Bách phân vị (Top %)
    
    CONSTRAINT uq_score_dist UNIQUE (year, target_type, target_code, scope_type, scope_code, score)
);

CREATE INDEX IF NOT EXISTS idx_dist_lookup ON score_distribution_summary (year, target_code, scope_type, scope_code, score);
CREATE INDEX IF NOT EXISTS idx_dist_scope ON score_distribution_summary (year, target_code, scope_type, scope_code);
