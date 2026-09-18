package com.admissions.backend.admission.entity;

import com.admissions.backend.subject.entity.SubjectCombination;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
    name = "track_method_combinations",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_tmc", columnNames = {"track_id", "method_id", "combination_code"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackMethodCombination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tmc_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "track_id", nullable = false)
    private AdmissionTrack admissionTrack;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "method_id", nullable = false)
    private AdmissionMethod admissionMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "combination_code", nullable = false)
    private SubjectCombination subjectCombination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "formula_id")
    private ScoreFormula scoreFormula;

    @Column(name = "specific_quota")
    private Integer specificQuota;

    @OneToMany(mappedBy = "trackMethodCombination", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<BenchmarkQuota> benchmarks = new ArrayList<>();
}
