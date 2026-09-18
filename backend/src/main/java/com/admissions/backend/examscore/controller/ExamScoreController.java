package com.admissions.backend.examscore.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.examscore.dto.CandidateLookupResponse;
import com.admissions.backend.examscore.dto.RankPositionResponse;
import com.admissions.backend.examscore.dto.ScoreDistributionResponse;
import com.admissions.backend.examscore.service.ExamScoreQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/exam-scores")
@RequiredArgsConstructor
public class ExamScoreController {

    private final ExamScoreQueryService examScoreQueryService;

    /**
     * Tra cứu kết quả thi theo SBD & tự động tính thứ hạng cho từng tổ hợp
     */
    @GetMapping("/lookup")
    public ResponseEntity<ApiResponse<CandidateLookupResponse>> lookupCandidate(
            @RequestParam(name = "year", defaultValue = "2026") short year,
            @RequestParam(name = "sbd") String sbd
    ) {
        CandidateLookupResponse response = examScoreQueryService.lookupCandidateScore(year, sbd);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * Lấy dữ liệu phổ điểm (Histogram) cho Môn / Tổ hợp theo Toàn quốc / Miền / Tỉnh
     */
    @GetMapping("/distribution")
    public ResponseEntity<ApiResponse<ScoreDistributionResponse>> getDistribution(
            @RequestParam(name = "year", defaultValue = "2026") short year,
            @RequestParam(name = "targetCode", defaultValue = "A00") String targetCode,
            @RequestParam(name = "scopeType", defaultValue = "NATIONAL") String scopeType,
            @RequestParam(name = "scopeCode", defaultValue = "ALL") String scopeCode
    ) {
        ScoreDistributionResponse response = examScoreQueryService.getScoreDistribution(year, targetCode, scopeType, scopeCode);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * Tra cứu thứ hạng và số người cao hơn cho một mức điểm bất kỳ
     */
    @GetMapping("/rank-position")
    public ResponseEntity<ApiResponse<RankPositionResponse>> getRankPosition(
            @RequestParam(name = "year", defaultValue = "2026") short year,
            @RequestParam(name = "targetCode", defaultValue = "A00") String targetCode,
            @RequestParam(name = "score") BigDecimal score,
            @RequestParam(name = "province", required = false) String province,
            @RequestParam(name = "region", required = false) String region
    ) {
        RankPositionResponse response = examScoreQueryService.getRankPosition(year, targetCode, score, province, region);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
