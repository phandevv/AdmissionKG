package com.admissions.backend.examscore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "candidate_exam_scores")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidateExamScore {

    @EmbeddedId
    private CandidateExamScoreId id;

    @Column(name = "province", nullable = false, length = 100)
    private String province;

    @Column(name = "region", nullable = false, length = 50)
    private String region;

    @Column(name = "math", precision = 4, scale = 2)
    private BigDecimal math;

    @Column(name = "literature", precision = 4, scale = 2)
    private BigDecimal literature;

    @Column(name = "physics", precision = 4, scale = 2)
    private BigDecimal physics;

    @Column(name = "chemistry", precision = 4, scale = 2)
    private BigDecimal chemistry;

    @Column(name = "biology", precision = 4, scale = 2)
    private BigDecimal biology;

    @Column(name = "history", precision = 4, scale = 2)
    private BigDecimal history;

    @Column(name = "geography", precision = 4, scale = 2)
    private BigDecimal geography;

    @Column(name = "economic_legal", precision = 4, scale = 2)
    private BigDecimal economicLegal;

    @Column(name = "informatics", precision = 4, scale = 2)
    private BigDecimal informatics;

    @Column(name = "technology", precision = 4, scale = 2)
    private BigDecimal technology;

    @Column(name = "foreign_language", precision = 4, scale = 2)
    private BigDecimal foreignLanguage;

    public Short getYear() {
        return id != null ? id.getYear() : null;
    }

    public String getSbd() {
        return id != null ? id.getSbd() : null;
    }
}
