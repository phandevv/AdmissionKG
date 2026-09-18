package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.TrackTieBreaker;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TrackTieBreakerDto(
    Long id,

    @NotBlank(message = "Mã chương trình xét tuyển không được để trống")
    String trackId,

    @NotNull(message = "Thứ tự ưu tiên không được để trống")
    Integer priorityOrder,

    @NotBlank(message = "Loại tiêu chí phụ không được để trống")
    String criterionType,

    String sortDirection
) {
    public static TrackTieBreakerDto from(TrackTieBreaker entity) {
        if (entity == null) {
            return null;
        }
        return new TrackTieBreakerDto(
            entity.getId(),
            entity.getAdmissionTrack() != null ? entity.getAdmissionTrack().getTrackId() : null,
            entity.getPriorityOrder(),
            entity.getCriterionType(),
            entity.getSortDirection()
        );
    }
}
