package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.AdmissionTrack;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

public record AdmissionTrackDto(
    @NotBlank(message = "Mã định danh chương trình không được để trống")
    String trackId,

    @NotBlank(message = "Mã đề án tuyển sinh không được để trống")
    String schemeId,

    String campusId,

    String majorCode,

    @NotBlank(message = "Mã đăng ký xét tuyển không được để trống")
    String admissionCode,

    @NotBlank(message = "Tên chương trình đào tạo không được để trống")
    String trackName,

    String trackType,

    String orientationCert,

    Map<String, Object> tuitionPolicy,

    Integer allocatedQuota
) {
    public static AdmissionTrackDto from(AdmissionTrack entity) {
        if (entity == null) {
            return null;
        }
        return new AdmissionTrackDto(
            entity.getTrackId(),
            entity.getAdmissionScheme() != null ? entity.getAdmissionScheme().getSchemeId() : null,
            entity.getCampus() != null ? entity.getCampus().getCampusId() : null,
            entity.getMajor() != null ? entity.getMajor().getMajorCode() : null,
            entity.getAdmissionCode(),
            entity.getTrackName(),
            entity.getTrackType(),
            entity.getOrientationCert(),
            entity.getTuitionPolicy(),
            entity.getAllocatedQuota()
        );
    }
}
