package com.admissions.backend.institution.dto;

import com.admissions.backend.institution.entity.AdmissionScheme;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdmissionSchemeDto(
    @NotBlank(message = "Mã đề án tuyển sinh không được để trống")
    String schemeId,

    @NotBlank(message = "Mã trường không được để trống")
    String institutionId,

    @NotNull(message = "Năm tuyển sinh không được để trống")
    Integer academicYear,

    Integer totalQuota
) {
    public static AdmissionSchemeDto from(AdmissionScheme entity) {
        if (entity == null) {
            return null;
        }
        return new AdmissionSchemeDto(
            entity.getSchemeId(),
            entity.getInstitution() != null ? entity.getInstitution().getInstitutionId() : null,
            entity.getAcademicYear(),
            entity.getTotalQuota()
        );
    }
}
