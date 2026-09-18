package com.admissions.backend.major.dto;

import com.admissions.backend.major.entity.AcademicField;
import jakarta.validation.constraints.NotBlank;

public record AcademicFieldDto(
    @NotBlank(message = "Mã lĩnh vực đào tạo không được để trống")
    String fieldCode,

    @NotBlank(message = "Tên lĩnh vực đào tạo không được để trống")
    String fieldName
) {
    public static AcademicFieldDto from(AcademicField entity) {
        if (entity == null) {
            return null;
        }
        return new AcademicFieldDto(
            entity.getFieldCode(),
            entity.getFieldName()
        );
    }
}
