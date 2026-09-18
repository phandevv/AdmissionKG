package com.admissions.backend.institution.dto;

import com.admissions.backend.institution.entity.Institution;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

public record InstitutionDto(
    @NotBlank(message = "Mã định danh trường không được để trống")
    String institutionId,

    @NotBlank(message = "Mã trường không được để trống")
    String institutionCode,

    @NotBlank(message = "Tên trường / đơn vị đào tạo không được để trống")
    String institutionName,

    String institutionType,

    String provinceCity,

    String region,

    String parentInstitutionId,

    Map<String, Object> contactInfo
) {
    public static InstitutionDto from(Institution entity) {
        if (entity == null) {
            return null;
        }
        return new InstitutionDto(
            entity.getInstitutionId(),
            entity.getInstitutionCode(),
            entity.getInstitutionName(),
            entity.getInstitutionType(),
            entity.getProvinceCity(),
            entity.getRegion(),
            entity.getParentInstitution() != null ? entity.getParentInstitution().getInstitutionId() : null,
            entity.getContactInfo()
        );
    }
}
