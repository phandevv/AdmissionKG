package com.admissions.backend.examscore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "score_distribution_summary", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"year", "target_type", "target_code", "scope_type", "scope_code", "score"})
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScoreDistributionSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "year", nullable = false)
    private Short year;

    @Column(name = "target_type", nullable = false, length = 20)
    private String targetType; // 'SUBJECT' or 'GROUP'

    @Column(name = "target_code", nullable = false, length = 50)
    private String targetCode; // 'MATH', 'A00', 'D01'...

    @Column(name = "scope_type", nullable = false, length = 20)
    private String scopeType; // 'NATIONAL', 'REGION', 'PROVINCE'

    @Column(name = "scope_code", nullable = false, length = 100)
    private String scopeCode; // 'ALL', 'Miền Bắc', 'Hà Nội'...

    @Column(name = "score", nullable = false, precision = 5, scale = 2)
    private BigDecimal score;

    @Column(name = "candidate_count", nullable = false)
    private Integer candidateCount;

    @Column(name = "higher_count", nullable = false)
    private Integer higherCount;

    @Column(name = "lower_count", nullable = false)
    private Integer lowerCount;

    @Column(name = "total_candidates", nullable = false)
    private Integer totalCandidates;

    @Column(name = "rank_start", nullable = false)
    private Integer rankStart;

    @Column(name = "percentile", nullable = false, precision = 5, scale = 2)
    private BigDecimal percentile;
}
