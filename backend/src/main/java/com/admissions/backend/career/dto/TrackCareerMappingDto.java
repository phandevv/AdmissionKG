package com.admissions.backend.career.dto;

import com.admissions.backend.career.entity.TrackCareerMapping;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record TrackCareerMappingDto(
    @NotBlank(message = "Mã chương trình xét tuyển không được để trống")
    String trackId,

    @NotBlank(message = "Mã nghề nghiệp không được để trống")
    String careerId,

    @DecimalMin(value = "0.0", message = "Điểm phù hợp phải lớn hơn hoặc bằng 0.0")
    @DecimalMax(value = "1.0", message = "Điểm phù hợp phải nhỏ hơn hoặc bằng 1.0")
    BigDecimal suitabilityScore
) {
    public static TrackCareerMappingDto from(TrackCareerMapping entity) {
        if (entity == null) {
            return null;
        }
        return new TrackCareerMappingDto(
            entity.getId() != null ? entity.getId().getTrackId() : null,
            entity.getId() != null ? entity.getId().getCareerId() : null,
            entity.getSuitabilityScore()
        );
    }
}
