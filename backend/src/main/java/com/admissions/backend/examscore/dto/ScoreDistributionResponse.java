package com.admissions.backend.examscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScoreDistributionResponse {
    private Short year;
    private String targetType;      // 'SUBJECT', 'GROUP'
    private String targetCode;      // 'MATH', 'A00'...
    private String targetName;      // 'Toán' hoặc 'A00 (Toán, Lý, Hóa)'
    private String scopeType;       // 'NATIONAL', 'REGION', 'PROVINCE'
    private String scopeCode;       // 'ALL', 'Miền Bắc', 'Hà Nội'

    private Integer totalCandidates;
    private BigDecimal averageScore;
    private BigDecimal medianScore;
    private BigDecimal maxScore;
    private BigDecimal minScore;
    private BigDecimal modeScore;   // Mức điểm có nhiều thí sinh nhất

    // Dữ liệu từng cột trên biểu đồ phổ điểm
    private List<Point> histogram;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Point {
        private BigDecimal score;
        private Integer candidateCount;
        private Integer higherCount;
        private Integer lowerCount;
        private Integer rankStart;
        private BigDecimal percentile;
    }
}
