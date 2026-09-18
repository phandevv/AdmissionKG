package com.admissions.backend.admission.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "track_tie_breakers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackTieBreaker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tie_breaker_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "track_id", nullable = false)
    private AdmissionTrack admissionTrack;

    @Column(name = "priority_order", nullable = false)
    private Integer priorityOrder;

    @Column(name = "criterion_type", length = 100, nullable = false)
    private String criterionType;

    @Column(name = "sort_direction", length = 10)
    @Builder.Default
    private String sortDirection = "DESC";
}
