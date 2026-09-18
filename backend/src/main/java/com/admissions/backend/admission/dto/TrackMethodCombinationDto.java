package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.TrackMethodCombination;
import jakarta.validation.constraints.NotBlank;

public record TrackMethodCombinationDto(
    Long id,

    @NotBlank(message = "Mã chương trình xét tuyển không được để trống")
    String trackId,

    @NotBlank(message = "Mã phương thức xét tuyển không được để trống")
    String methodId,

    @NotBlank(message = "Mã tổ hợp môn không được để trống")
    String combinationCode,

    Long formulaId,

    Integer specificQuota
) {
    public static TrackMethodCombinationDto from(TrackMethodCombination entity) {
        if (entity == null) {
            return null;
        }
        return new TrackMethodCombinationDto(
            entity.getId(),
            entity.getAdmissionTrack() != null ? entity.getAdmissionTrack().getTrackId() : null,
            entity.getAdmissionMethod() != null ? entity.getAdmissionMethod().getMethodId() : null,
            entity.getSubjectCombination() != null ? entity.getSubjectCombination().getCombinationCode() : null,
            entity.getScoreFormula() != null ? entity.getScoreFormula().getId() : null,
            entity.getSpecificQuota()
        );
    }
}
