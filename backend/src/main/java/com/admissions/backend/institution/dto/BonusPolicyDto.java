package com.admissions.backend.institution.dto;

import com.admissions.backend.institution.entity.BonusPolicy;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record BonusPolicyDto(
    Long id,

    @NotBlank(message = "Mã trường không được để trống")
    String institutionId,

    @NotBlank(message = "Danh mục thành tích không được để trống")
    String achievementCategory,

    @NotBlank(message = "Cấp bậc giải thưởng không được để trống")
    String prizeLevel,

    @NotNull(message = "Điểm cộng không được để trống")
    BigDecimal bonusPoints,

    BigDecimal maxAccumulatedBonus
) {
    public static BonusPolicyDto from(BonusPolicy entity) {
        if (entity == null) {
            return null;
        }
        return new BonusPolicyDto(
            entity.getId(),
            entity.getInstitution() != null ? entity.getInstitution().getInstitutionId() : null,
            entity.getAchievementCategory(),
            entity.getPrizeLevel(),
            entity.getBonusPoints(),
            entity.getMaxAccumulatedBonus()
        );
    }
}
