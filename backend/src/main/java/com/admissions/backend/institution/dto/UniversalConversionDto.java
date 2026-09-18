package com.admissions.backend.institution.dto;

import com.admissions.backend.institution.entity.UniversalConversion;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record UniversalConversionDto(
    Long id,

    String institutionId,

    @NotBlank(message = "Loại chứng chỉ / thành tích không được để trống")
    String certOrAchievementType,

    @NotBlank(message = "Giá trị đầu vào tối thiểu không được để trống")
    String minInputValue,

    @NotBlank(message = "Loại hành động quy đổi không được để trống")
    String actionType,

    BigDecimal convertedScore,

    BigDecimal bonusPoint
) {
    public static UniversalConversionDto from(UniversalConversion entity) {
        if (entity == null) {
            return null;
        }
        return new UniversalConversionDto(
            entity.getId(),
            entity.getInstitution() != null ? entity.getInstitution().getInstitutionId() : null,
            entity.getCertOrAchievementType(),
            entity.getMinInputValue(),
            entity.getActionType(),
            entity.getConvertedScore(),
            entity.getBonusPoint()
        );
    }
}
