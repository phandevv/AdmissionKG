package com.admissions.backend.major.dto;

import com.admissions.backend.major.entity.Major;
import jakarta.validation.constraints.NotBlank;

public record MajorDto(
    @NotBlank(message = "Mã ngành đào tạo không được để trống")
    String majorCode,

    String fieldCode,

    @NotBlank(message = "Tên ngành đào tạo không được để trống")
    String majorName,

    String degreeType
) {
    public static MajorDto from(Major entity) {
        if (entity == null) {
            return null;
        }
        return new MajorDto(
            entity.getMajorCode(),
            entity.getAcademicField() != null ? entity.getAcademicField().getFieldCode() : null,
            entity.getMajorName(),
            entity.getDegreeType()
        );
    }
}
