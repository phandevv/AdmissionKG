package com.admissions.backend.user.dto;

import com.admissions.backend.user.entity.UserAcademicProfile;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record UserAcademicProfileDto(
    Long id,

    @NotNull(message = "ID người dùng không được để trống")
    Long userId,

    Map<String, Object> thptScores,

    Map<String, Object> hocbaScores,

    Map<String, Object> aptitudeTestScores,

    Map<String, Object> internationalCertificates,

    Map<String, Object> achievements,

    String priorityArea,

    String priorityGroup,

    String provinceCity,

    String region
) {
    public static UserAcademicProfileDto from(UserAcademicProfile entity) {
        if (entity == null) {
            return null;
        }
        return new UserAcademicProfileDto(
            entity.getId(),
            entity.getUser() != null ? entity.getUser().getId() : null,
            entity.getThptScores(),
            entity.getHocbaScores(),
            entity.getAptitudeTestScores(),
            entity.getInternationalCertificates(),
            entity.getAchievements(),
            entity.getPriorityArea(),
            entity.getPriorityGroup(),
            entity.getProvinceCity(),
            entity.getRegion()
        );
    }
}
