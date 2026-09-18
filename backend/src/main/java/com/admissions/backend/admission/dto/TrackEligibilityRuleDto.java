package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.TrackEligibilityRule;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

public record TrackEligibilityRuleDto(
    Long id,

    @NotBlank(message = "Mã chương trình xét tuyển không được để trống")
    String trackId,

    String methodId,

    String ruleType,

    Map<String, Object> ruleValue,

    String errorMessageVi
) {
    public static TrackEligibilityRuleDto from(TrackEligibilityRule entity) {
        if (entity == null) {
            return null;
        }
        return new TrackEligibilityRuleDto(
            entity.getId(),
            entity.getAdmissionTrack() != null ? entity.getAdmissionTrack().getTrackId() : null,
            entity.getAdmissionMethod() != null ? entity.getAdmissionMethod().getMethodId() : null,
            entity.getRuleType(),
            entity.getRuleValue(),
            entity.getErrorMessageVi()
        );
    }
}
