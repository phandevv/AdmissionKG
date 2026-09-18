package com.admissions.backend.admission.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "score_formulas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScoreFormula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "formula_id")
    private Long id;

    @Column(name = "formula_code", length = 100, nullable = false, unique = true)
    private String formulaCode;

    @Column(name = "target_scale", precision = 5, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal targetScale = new BigDecimal("30.00");

    @Column(name = "formula_expression", columnDefinition = "text")
    private String formulaExpression;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "subject_weights", columnDefinition = "jsonb")
    private Map<String, Object> subjectWeights;

    @OneToMany(mappedBy = "scoreFormula", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TrackMethodCombination> trackMethodCombinations = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
