-- =========================================================
-- V7__cleanup_empty_institutions.sql
-- Xóa các trường placeholder danh bạ chưa có Đề án tuyển sinh (Admission Scheme)
-- Giữ lại các trường thực sự có dữ liệu đề án và ngành tuyển sinh (DQN, YKV,...)
-- =========================================================

DELETE FROM institutions
WHERE institution_id NOT IN (
    SELECT DISTINCT institution_id 
    FROM admission_schemes 
    WHERE institution_id IS NOT NULL
);
