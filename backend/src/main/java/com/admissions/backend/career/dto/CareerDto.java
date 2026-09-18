package com.admissions.backend.career.dto;

import com.admissions.backend.career.entity.Career;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

public record CareerDto(
    @NotBlank(message = "Mã nghề nghiệp không được để trống")
    String careerId,

    @NotBlank(message = "Tên nghề nghiệp không được để trống")
    String careerTitle,

    String industry,

    Map<String, Object> requiredSkills
) {
    public static CareerDto from(Career entity) {
        if (entity == null) {
            return null;
        }
        return new CareerDto(
            entity.getCareerId(),
            entity.getCareerTitle(),
            entity.getIndustry(),
            entity.getRequiredSkills()
        );
    }
}
