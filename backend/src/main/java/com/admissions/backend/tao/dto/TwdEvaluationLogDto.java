package com.admissions.backend.tao.dto;

import com.admissions.backend.tao.entity.TwdEvaluationLog;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TwdEvaluationLogDto(
    Long id,

    @NotNull(message = "ID nguyện vọng không được để trống")
    Long wishId,

    @NotNull(message = "Điểm xét tuyển cuối cùng không được để trống")
    BigDecimal finalAdmissionScore,

    @NotBlank(message = "Vùng rủi ro TWD không được để trống")
    String twdRiskZone,

    BigDecimal safetyMargin,

    @NotBlank(message = "Trạng thái hợp lệ không được để trống")
    String eligibilityStatus,

    String recommendationStrategy
) {
    public static TwdEvaluationLogDto from(TwdEvaluationLog entity) {
        if (entity == null) {
            return null;
        }
        return new TwdEvaluationLogDto(
            entity.getId(),
            entity.getUserWish() != null ? entity.getUserWish().getId() : null,
            entity.getFinalAdmissionScore(),
            entity.getTwdRiskZone(),
            entity.getSafetyMargin(),
            entity.getEligibilityStatus(),
            entity.getRecommendationStrategy()
        );
    }
}
