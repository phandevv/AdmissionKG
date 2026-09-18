package com.admissions.backend.institution.dto;

import com.admissions.backend.institution.entity.Campus;
import jakarta.validation.constraints.NotBlank;

public record CampusDto(
    @NotBlank(message = "Mã cơ sở không được để trống")
    String campusId,

    @NotBlank(message = "Mã trường không được để trống")
    String institutionId,

    String campusCode,

    @NotBlank(message = "Tên cơ sở đào tạo không được để trống")
    String campusName,

    String provinceCity,

    String region
) {
    public static CampusDto from(Campus entity) {
        if (entity == null) {
            return null;
        }
        return new CampusDto(
            entity.getCampusId(),
            entity.getInstitution() != null ? entity.getInstitution().getInstitutionId() : null,
            entity.getCampusCode(),
            entity.getCampusName(),
            entity.getProvinceCity(),
            entity.getRegion()
        );
    }
}
