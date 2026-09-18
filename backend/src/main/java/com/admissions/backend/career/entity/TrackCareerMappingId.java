package com.admissions.backend.career.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackCareerMappingId implements Serializable {

    @Column(name = "track_id", length = 100, nullable = false)
    private String trackId;

    @Column(name = "career_id", length = 100, nullable = false)
    private String careerId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrackCareerMappingId that = (TrackCareerMappingId) o;
        return Objects.equals(trackId, that.trackId) && Objects.equals(careerId, that.careerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trackId, careerId);
    }
}
