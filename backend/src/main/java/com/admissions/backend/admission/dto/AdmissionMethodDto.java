package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.AdmissionMethod;
import jakarta.validation.constraints.NotBlank;

public record AdmissionMethodDto(
    @NotBlank(message = "Mã định danh phương thức không được để trống")
    String methodId,

    @NotBlank(message = "Mã phương thức không được để trống")
    String methodCode,

    @NotBlank(message = "Tên phương thức tuyển sinh không được để trống")
    String methodName,

    String targetGroup
) {
    public static AdmissionMethodDto from(AdmissionMethod entity) {
        if (entity == null) {
            return null;
        }
        return new AdmissionMethodDto(
            entity.getMethodId(),
            entity.getMethodCode(),
            entity.getMethodName(),
            entity.getTargetGroup()
        );
    }
}
