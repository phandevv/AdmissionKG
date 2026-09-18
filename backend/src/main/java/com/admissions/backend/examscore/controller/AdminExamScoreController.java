package com.admissions.backend.examscore.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.examscore.dto.BatchImportResultDto;
import com.admissions.backend.examscore.repository.CandidateExamScoreRepository;
import com.admissions.backend.examscore.repository.ScoreDistributionSummaryRepository;
import com.admissions.backend.examscore.service.ExamScoreBatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/exam-scores")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminExamScoreController {

    private final ExamScoreBatchService examScoreBatchService;
    private final CandidateExamScoreRepository candidateExamScoreRepository;
    private final ScoreDistributionSummaryRepository scoreDistributionSummaryRepository;

    /**
     * Nạp dữ liệu CSV từ đường dẫn file trên Server
     */
    @PostMapping("/import-file")
    public ResponseEntity<ApiResponse<BatchImportResultDto>> importFromFile(
            @RequestParam(name = "filePath", defaultValue = "data/diem_thi_THPTQG_2026.csv") String filePath,
            @RequestParam(name = "year", defaultValue = "2026") short year,
            @RequestParam(name = "recalculateDistribution", defaultValue = "true") boolean recalculateDistribution
    ) {
        BatchImportResultDto result = examScoreBatchService.importCsvFromFile(filePath, year, recalculateDistribution);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Nạp dữ liệu CSV qua Multipart Upload
     */
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<BatchImportResultDto>> uploadCsv(
            @RequestParam(name = "file") MultipartFile file,
            @RequestParam(name = "year", defaultValue = "2026") short year,
            @RequestParam(name = "recalculateDistribution", defaultValue = "true") boolean recalculateDistribution
    ) throws Exception {
        BatchImportResultDto result = examScoreBatchService.importCsvFromStream(
                file.getInputStream(), year, recalculateDistribution
        );
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Tính toán lại bảng Phổ điểm cho năm chỉ định
     */
    @PostMapping("/recalculate-distribution")
    public ResponseEntity<ApiResponse<String>> recalculateDistribution(
            @RequestParam(name = "year", defaultValue = "2026") short year
    ) {
        examScoreBatchService.recalculateScoreDistribution(year);
        return ResponseEntity.ok(ApiResponse.success("Đã tính toán lại toàn bộ phổ điểm và thứ hạng cho năm " + year));
    }

    /**
     * Thống kê số lượng bản ghi đã nạp
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats(
            @RequestParam(name = "year", defaultValue = "2026") short year
    ) {
        long totalCandidates = candidateExamScoreRepository.countByYear(year);
        long totalDistributionRows = scoreDistributionSummaryRepository.count();
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "year", year,
                "totalCandidates", totalCandidates,
                "totalDistributionRows", totalDistributionRows
        )));
    }
}
