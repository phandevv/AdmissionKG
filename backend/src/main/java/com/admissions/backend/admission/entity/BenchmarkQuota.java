package com.admissions.backend.admission.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(
    name = "benchmarks_quotas",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_benchmark_year", columnNames = {"tmc_id", "academic_year"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BenchmarkQuota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "benchmark_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tmc_id", nullable = false)
    private TrackMethodCombination trackMethodCombination;

    @Column(name = "academic_year", nullable = false)
    private Integer academicYear;

    @Column(name = "quota")
    private Integer quota;

    @Column(name = "admitted_count")
    private Integer admittedCount;

    @Column(name = "benchmark_score", precision = 5, scale = 2, nullable = false)
    private BigDecimal benchmarkScore;

    @Column(name = "score_scale", precision = 5, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal scoreScale = new BigDecimal("30.00");

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
