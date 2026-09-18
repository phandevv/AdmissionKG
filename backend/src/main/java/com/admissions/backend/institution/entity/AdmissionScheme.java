package com.admissions.backend.institution.entity;

import com.admissions.backend.admission.entity.AdmissionTrack;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
    name = "admission_schemes",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_scheme_inst_year", columnNames = {"institution_id", "academic_year"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdmissionScheme {

    @Id
    @Column(name = "scheme_id", length = 100, nullable = false)
    private String schemeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(name = "academic_year", nullable = false)
    private Integer academicYear;

    @Column(name = "total_quota")
    private Integer totalQuota;

    @OneToMany(mappedBy = "admissionScheme", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AdmissionTrack> tracks = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
