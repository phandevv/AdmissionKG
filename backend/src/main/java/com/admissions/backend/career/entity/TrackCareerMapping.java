package com.admissions.backend.career.entity;

import com.admissions.backend.admission.entity.AdmissionTrack;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "track_career_mapping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackCareerMapping {

    @EmbeddedId
    private TrackCareerMappingId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("trackId")
    @JoinColumn(name = "track_id", nullable = false)
    private AdmissionTrack admissionTrack;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("careerId")
    @JoinColumn(name = "career_id", nullable = false)
    private Career career;

    @Column(name = "suitability_score", precision = 3, scale = 2)
    private BigDecimal suitabilityScore;
}
