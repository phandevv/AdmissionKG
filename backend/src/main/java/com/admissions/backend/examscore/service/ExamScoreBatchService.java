package com.admissions.backend.examscore.service;

import com.admissions.backend.examscore.dto.BatchImportResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExamScoreBatchService {

    private final JdbcTemplate jdbcTemplate;

    // Danh mục ánh xạ vùng miền cho 34 tỉnh/thành phố sau sáp nhập
    private static final Map<String, String> PROVINCE_TO_REGION = new HashMap<>();

    static {
        // Miền Bắc (15)
        List<String> north = List.of(
                "Hà Nội", "Hải Phòng", "Cao Bằng", "Lạng Sơn", "Lai Châu", "Điện Biên", "Sơn La",
                "Quảng Ninh", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh",
                "Hưng Yên", "Ninh Bình"
        );
        north.forEach(p -> PROVINCE_TO_REGION.put(p, "Miền Bắc"));

        // Miền Trung (11)
        List<String> central = List.of(
                "Huế", "Thừa Thiên Huế", "Đà Nẵng", "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Trị",
                "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Khánh Hòa", "Lâm Đồng"
        );
        central.forEach(p -> PROVINCE_TO_REGION.put(p, "Miền Trung"));

        // Miền Nam (8)
        List<String> south = List.of(
                "TP. Hồ Chí Minh", "Hồ Chí Minh", "Cần Thơ", "Đồng Nai", "Tây Ninh", "Vĩnh Long",
                "Đồng Tháp", "Cà Mau", "An Giang"
        );
        south.forEach(p -> PROVINCE_TO_REGION.put(p, "Miền Nam"));
    }

    public static String getRegionForProvince(String province) {
        if (province == null) return "Khác";
        String trimmed = province.trim();
        return PROVINCE_TO_REGION.getOrDefault(trimmed, "Miền Bắc");
    }

    /**
     * Import file CSV điểm thi từ Server File Path (Streaming Batch JDBC)
     */
    public BatchImportResultDto importCsvFromFile(String filePath, short year, boolean recalculateDistribution) {
        File file = new File(filePath);
        if (!file.exists()) {
            throw new IllegalArgumentException("Không tìm thấy file điểm thi tại đường dẫn: " + filePath);
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file, StandardCharsets.UTF_8))) {
            return processCsvStream(reader, year, recalculateDistribution);
        } catch (Exception e) {
            log.error("Lỗi khi import CSV từ file: {}", filePath, e);
            throw new RuntimeException("Lỗi import CSV: " + e.getMessage(), e);
        }
    }

    /**
     * Import file CSV điểm thi từ InputStream (Multipart Upload)
     */
    public BatchImportResultDto importCsvFromStream(InputStream inputStream, short year, boolean recalculateDistribution) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            return processCsvStream(reader, year, recalculateDistribution);
        } catch (Exception e) {
            log.error("Lỗi khi import CSV từ Stream", e);
            throw new RuntimeException("Lỗi import CSV: " + e.getMessage(), e);
        }
    }

    private BatchImportResultDto processCsvStream(BufferedReader reader, short year, boolean recalculateDistribution) throws Exception {
        long startTime = System.currentTimeMillis();
        String headerLine = reader.readLine(); // Bỏ qua dòng header
        if (headerLine == null) {
            return BatchImportResultDto.builder()
                    .status("EMPTY")
                    .message("File CSV rỗng")
                    .totalRowsProcessed(0)
                    .totalInserted(0)
                    .executionTimeMs(0L)
                    .build();
        }

        String insertSql = "INSERT INTO candidate_exam_scores (year, sbd, province, region, " +
                "math, literature, physics, chemistry, biology, history, geography, " +
                "economic_legal, informatics, technology, foreign_language) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                "ON CONFLICT (year, sbd) DO UPDATE SET " +
                "province = EXCLUDED.province, region = EXCLUDED.region, " +
                "math = EXCLUDED.math, literature = EXCLUDED.literature, " +
                "physics = EXCLUDED.physics, chemistry = EXCLUDED.chemistry, " +
                "biology = EXCLUDED.biology, history = EXCLUDED.history, " +
                "geography = EXCLUDED.geography, economic_legal = EXCLUDED.economic_legal, " +
                "informatics = EXCLUDED.informatics, technology = EXCLUDED.technology, " +
                "foreign_language = EXCLUDED.foreign_language";

        int batchSize = 5000;
        List<Object[]> batchArgs = new ArrayList<>(batchSize);
        int totalProcessed = 0;
        int totalInserted = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            totalProcessed++;

            String[] parts = line.split(",", -1);
            if (parts.length < 2) continue;

            String sbd = parts[0].trim();
            String province = parts[1].trim();
            String region = getRegionForProvince(province);

            BigDecimal math = parseDecimal(parts, 2);
            BigDecimal literature = parseDecimal(parts, 3);
            BigDecimal physics = parseDecimal(parts, 4);
            BigDecimal chemistry = parseDecimal(parts, 5);
            BigDecimal biology = parseDecimal(parts, 6);
            BigDecimal history = parseDecimal(parts, 7);
            BigDecimal geography = parseDecimal(parts, 8);
            BigDecimal economicLegal = parseDecimal(parts, 9);
            BigDecimal informatics = parseDecimal(parts, 10);
            BigDecimal technology = parseDecimal(parts, 11);
            BigDecimal foreignLang = parseDecimal(parts, 12);

            batchArgs.add(new Object[]{
                    year, sbd, province, region,
                    math, literature, physics, chemistry, biology, history, geography,
                    economicLegal, informatics, technology, foreignLang
            });

            if (batchArgs.size() >= batchSize) {
                jdbcTemplate.batchUpdate(insertSql, batchArgs);
                totalInserted += batchArgs.size();
                batchArgs.clear();
                if (totalInserted % 50000 == 0) {
                    log.info("Đã nạp {} dòng thí sinh năm {}...", totalInserted, year);
                }
            }
        }

        if (!batchArgs.isEmpty()) {
            jdbcTemplate.batchUpdate(insertSql, batchArgs);
            totalInserted += batchArgs.size();
            batchArgs.clear();
        }

        long executionTimeMs = System.currentTimeMillis() - startTime;
        log.info("Hoàn tất nạp {}/{} bản ghi điểm thi năm {} trong {} ms", totalInserted, totalProcessed, year, executionTimeMs);

        boolean distSuccess = false;
        if (recalculateDistribution) {
            log.info("Bắt đầu tự động tính toán bảng Phổ điểm cho năm {}...", year);
            recalculateScoreDistribution(year);
            distSuccess = true;
        }

        return BatchImportResultDto.builder()
                .status("SUCCESS")
                .message("Đã nạp thành công " + totalInserted + " thí sinh cho năm " + year)
                .totalRowsProcessed(totalProcessed)
                .totalInserted(totalInserted)
                .executionTimeMs(executionTimeMs)
                .distributionRecalculated(distSuccess)
                .build();
    }

    private BigDecimal parseDecimal(String[] parts, int index) {
        if (index >= parts.length) return null;
        String val = parts[index].trim();
        if (val.isEmpty()) return null;
        try {
            return new BigDecimal(val);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Tính toán bảng Phổ điểm & Thứ hạng tích lũy cho 11 Môn và các Tổ hợp phổ biến
     */
    @Transactional
    public void recalculateScoreDistribution(short year) {
        long startTime = System.currentTimeMillis();
        log.info("Xóa dữ liệu phân phối cũ của năm {}...", year);
        jdbcTemplate.update("DELETE FROM score_distribution_summary WHERE year = ?", year);

        // 1. Tính phổ điểm 11 Môn đơn
        Map<String, String> subjects = new LinkedHashMap<>();
        subjects.put("MATH", "math");
        subjects.put("LITERATURE", "literature");
        subjects.put("PHYSICS", "physics");
        subjects.put("CHEMISTRY", "chemistry");
        subjects.put("BIOLOGY", "biology");
        subjects.put("HISTORY", "history");
        subjects.put("GEOGRAPHY", "geography");
        subjects.put("ECONOMIC_LEGAL", "economic_legal");
        subjects.put("INFORMATICS", "informatics");
        subjects.put("TECHNOLOGY", "technology");
        subjects.put("FOREIGN_LANG", "foreign_language");

        for (Map.Entry<String, String> entry : subjects.entrySet()) {
            String targetCode = entry.getKey();
            String colName = entry.getValue();
            calculateSubjectDistribution(year, "SUBJECT", targetCode, colName);
        }

        // 2. Tính phổ điểm các Tổ hợp môn phổ biến
        Map<String, String> groups = new LinkedHashMap<>();
        groups.put("A00", "math + physics + chemistry");
        groups.put("A01", "math + physics + foreign_language");
        groups.put("A02", "math + physics + biology");
        groups.put("B00", "math + chemistry + biology");
        groups.put("B08", "math + biology + foreign_language");
        groups.put("C00", "literature + history + geography");
        groups.put("C01", "literature + math + physics");
        groups.put("D01", "math + literature + foreign_language");
        groups.put("D07", "math + chemistry + foreign_language");
        groups.put("X01", "math + informatics + foreign_language");
        groups.put("X02", "math + technology + physics");

        for (Map.Entry<String, String> entry : groups.entrySet()) {
            String targetCode = entry.getKey();
            String expression = entry.getValue();
            calculateGroupDistribution(year, "GROUP", targetCode, expression);
        }

        long totalTime = System.currentTimeMillis() - startTime;
        log.info("Hoàn tất tính toán toàn bộ Phổ điểm & Thứ hạng tích lũy năm {} trong {} ms", year, totalTime);
    }

    private void calculateSubjectDistribution(short year, String targetType, String targetCode, String colName) {
        // Cả nước (NATIONAL)
        String nationalSql = "INSERT INTO score_distribution_summary " +
                "(year, target_type, target_code, scope_type, scope_code, score, candidate_count, " +
                "total_candidates, higher_count, lower_count, rank_start, percentile) " +
                "WITH counts AS (" +
                "  SELECT " + colName + " AS sc, COUNT(*) AS cnt " +
                "  FROM candidate_exam_scores " +
                "  WHERE year = " + year + " AND " + colName + " IS NOT NULL " +
                "  GROUP BY " + colName + " " +
                "), stats AS (" +
                "  SELECT sc, cnt, " +
                "    SUM(cnt) OVER () AS total_c, " +
                "    COALESCE(SUM(cnt) OVER (ORDER BY sc DESC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS higher_c, " +
                "    COALESCE(SUM(cnt) OVER (ORDER BY sc ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS lower_c " +
                "  FROM counts " +
                ") " +
                "SELECT " + year + ", '" + targetType + "', '" + targetCode + "', 'NATIONAL', 'ALL', sc, cnt, total_c, " +
                "  higher_c, lower_c, (higher_c + 1), ROUND((lower_c::numeric / total_c) * 100, 2) " +
                "FROM stats";
        jdbcTemplate.update(nationalSql);

        // Theo Vùng Miền (REGION)
        String regionSql = "INSERT INTO score_distribution_summary " +
                "(year, target_type, target_code, scope_type, scope_code, score, candidate_count, " +
                "total_candidates, higher_count, lower_count, rank_start, percentile) " +
                "WITH counts AS (" +
                "  SELECT region, " + colName + " AS sc, COUNT(*) AS cnt " +
                "  FROM candidate_exam_scores " +
                "  WHERE year = " + year + " AND " + colName + " IS NOT NULL " +
                "  GROUP BY region, " + colName + " " +
                "), stats AS (" +
                "  SELECT region, sc, cnt, " +
                "    SUM(cnt) OVER (PARTITION BY region) AS total_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY region ORDER BY sc DESC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS higher_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY region ORDER BY sc ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS lower_c " +
                "  FROM counts " +
                ") " +
                "SELECT " + year + ", '" + targetType + "', '" + targetCode + "', 'REGION', region, sc, cnt, total_c, " +
                "  higher_c, lower_c, (higher_c + 1), ROUND((lower_c::numeric / total_c) * 100, 2) " +
                "FROM stats";
        jdbcTemplate.update(regionSql);

        // Theo Tỉnh Thành (PROVINCE)
        String provinceSql = "INSERT INTO score_distribution_summary " +
                "(year, target_type, target_code, scope_type, scope_code, score, candidate_count, " +
                "total_candidates, higher_count, lower_count, rank_start, percentile) " +
                "WITH counts AS (" +
                "  SELECT province, " + colName + " AS sc, COUNT(*) AS cnt " +
                "  FROM candidate_exam_scores " +
                "  WHERE year = " + year + " AND " + colName + " IS NOT NULL " +
                "  GROUP BY province, " + colName + " " +
                "), stats AS (" +
                "  SELECT province, sc, cnt, " +
                "    SUM(cnt) OVER (PARTITION BY province) AS total_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY province ORDER BY sc DESC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS higher_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY province ORDER BY sc ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS lower_c " +
                "  FROM counts " +
                ") " +
                "SELECT " + year + ", '" + targetType + "', '" + targetCode + "', 'PROVINCE', province, sc, cnt, total_c, " +
                "  higher_c, lower_c, (higher_c + 1), ROUND((lower_c::numeric / total_c) * 100, 2) " +
                "FROM stats";
        jdbcTemplate.update(provinceSql);
    }

    private void calculateGroupDistribution(short year, String targetType, String targetCode, String expression) {
        // Biểu thức kiểm tra không null cho cả 3 môn
        String notNullCheck = "(" + expression.replace("+", "IS NOT NULL AND") + " IS NOT NULL)";

        // Cả nước (NATIONAL)
        String nationalSql = "INSERT INTO score_distribution_summary " +
                "(year, target_type, target_code, scope_type, scope_code, score, candidate_count, " +
                "total_candidates, higher_count, lower_count, rank_start, percentile) " +
                "WITH raw_calc AS (" +
                "  SELECT (" + expression + ") AS sc " +
                "  FROM candidate_exam_scores " +
                "  WHERE year = " + year + " AND " + notNullCheck + " " +
                "), counts AS (" +
                "  SELECT sc, COUNT(*) AS cnt FROM raw_calc GROUP BY sc " +
                "), stats AS (" +
                "  SELECT sc, cnt, " +
                "    SUM(cnt) OVER () AS total_c, " +
                "    COALESCE(SUM(cnt) OVER (ORDER BY sc DESC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS higher_c, " +
                "    COALESCE(SUM(cnt) OVER (ORDER BY sc ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS lower_c " +
                "  FROM counts " +
                ") " +
                "SELECT " + year + ", '" + targetType + "', '" + targetCode + "', 'NATIONAL', 'ALL', sc, cnt, total_c, " +
                "  higher_c, lower_c, (higher_c + 1), ROUND((lower_c::numeric / total_c) * 100, 2) " +
                "FROM stats";
        jdbcTemplate.update(nationalSql);

        // Theo Vùng Miền (REGION)
        String regionSql = "INSERT INTO score_distribution_summary " +
                "(year, target_type, target_code, scope_type, scope_code, score, candidate_count, " +
                "total_candidates, higher_count, lower_count, rank_start, percentile) " +
                "WITH raw_calc AS (" +
                "  SELECT region, (" + expression + ") AS sc " +
                "  FROM candidate_exam_scores " +
                "  WHERE year = " + year + " AND " + notNullCheck + " " +
                "), counts AS (" +
                "  SELECT region, sc, COUNT(*) AS cnt FROM raw_calc GROUP BY region, sc " +
                "), stats AS (" +
                "  SELECT region, sc, cnt, " +
                "    SUM(cnt) OVER (PARTITION BY region) AS total_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY region ORDER BY sc DESC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS higher_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY region ORDER BY sc ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS lower_c " +
                "  FROM counts " +
                ") " +
                "SELECT " + year + ", '" + targetType + "', '" + targetCode + "', 'REGION', region, sc, cnt, total_c, " +
                "  higher_c, lower_c, (higher_c + 1), ROUND((lower_c::numeric / total_c) * 100, 2) " +
                "FROM stats";
        jdbcTemplate.update(regionSql);

        // Theo Tỉnh Thành (PROVINCE)
        String provinceSql = "INSERT INTO score_distribution_summary " +
                "(year, target_type, target_code, scope_type, scope_code, score, candidate_count, " +
                "total_candidates, higher_count, lower_count, rank_start, percentile) " +
                "WITH raw_calc AS (" +
                "  SELECT province, (" + expression + ") AS sc " +
                "  FROM candidate_exam_scores " +
                "  WHERE year = " + year + " AND " + notNullCheck + " " +
                "), counts AS (" +
                "  SELECT province, sc, COUNT(*) AS cnt FROM raw_calc GROUP BY province, sc " +
                "), stats AS (" +
                "  SELECT province, sc, cnt, " +
                "    SUM(cnt) OVER (PARTITION BY province) AS total_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY province ORDER BY sc DESC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS higher_c, " +
                "    COALESCE(SUM(cnt) OVER (PARTITION BY province ORDER BY sc ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS lower_c " +
                "  FROM counts " +
                ") " +
                "SELECT " + year + ", '" + targetType + "', '" + targetCode + "', 'PROVINCE', province, sc, cnt, total_c, " +
                "  higher_c, lower_c, (higher_c + 1), ROUND((lower_c::numeric / total_c) * 100, 2) " +
                "FROM stats";
        jdbcTemplate.update(provinceSql);
    }
}
