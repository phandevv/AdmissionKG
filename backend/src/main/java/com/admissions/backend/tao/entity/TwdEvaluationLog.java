package com.admissions.backend.tao.entity;

import com.admissions.backend.user.entity.UserWish;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "twd_evaluation_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TwdEvaluationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wish_id", nullable = false, unique = true)
    private UserWish userWish;

    @Column(name = "final_admission_score", precision = 5, scale = 2, nullable = false)
    private BigDecimal finalAdmissionScore;

    @Column(name = "twd_risk_zone", length = 10, nullable = false)
    private String twdRiskZone;

    @Column(name = "safety_margin", precision = 5, scale = 2)
    private BigDecimal safetyMargin;

    @Column(name = "eligibility_status", length = 50, nullable = false)
    private String eligibilityStatus;

    @Column(name = "recommendation_strategy", columnDefinition = "text")
    private String recommendationStrategy;

    @CreationTimestamp
    @Column(name = "evaluated_at", updatable = false)
    private OffsetDateTime evaluatedAt;
}
