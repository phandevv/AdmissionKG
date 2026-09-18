package com.admissions.backend.examscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankPositionResponse {
    private Short year;
    private String targetCode;
    private BigDecimal score;

    private ScopeRank national;
    private ScopeRank region;
    private ScopeRank province;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScopeRank {
        private String scopeCode;
        private Integer candidateCount;
        private Integer higherCount;
        private Integer lowerCount;
        private Integer totalCandidates;
        private Integer rank;
        private BigDecimal percentile;
    }
}
