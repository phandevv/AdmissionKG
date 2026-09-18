package com.admissions.backend.user.entity;

import com.admissions.backend.subject.entity.SubjectCombination;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

@Entity
@Table(name = "user_combination_scores",
       indexes = {
           @Index(name = "idx_ucs_profile_method", columnList = "profile_id, method_type"),
           @Index(name = "idx_ucs_comb_code", columnList = "combination_code"),
           @Index(name = "idx_ucs_total_score", columnList = "total_score DESC")
       },
       uniqueConstraints = {
           @UniqueConstraint(name = "uq_profile_comb_method", columnNames = {"profile_id", "combination_code", "method_type"})
       })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCombinationScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private UserAcademicProfile academicProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "combination_code", referencedColumnName = "combination_code", nullable = false)
    private SubjectCombination subjectCombination;

    @Column(name = "method_type", length = 50, nullable = false)
    private String methodType; // "THPT_EXAM" hoặc "HOC_BA"

    @Column(name = "raw_score", precision = 5, scale = 2)
    private BigDecimal rawScore;

    @Column(name = "base_bonus", precision = 4, scale = 2)
    private BigDecimal baseBonus;

    @Column(name = "effective_bonus", precision = 4, scale = 2)
    private BigDecimal effectiveBonus;

    @Column(name = "total_score", precision = 5, scale = 2, nullable = false)
    private BigDecimal totalScore;

    @Column(name = "is_reduced")
    private Boolean isReduced;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "subject_scores", columnDefinition = "jsonb")
    private Map<String, Object> subjectScores;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserAcademicProfile getAcademicProfile() { return academicProfile; }
    public void setAcademicProfile(UserAcademicProfile academicProfile) { this.academicProfile = academicProfile; }

    public SubjectCombination getSubjectCombination() { return subjectCombination; }
    public void setSubjectCombination(SubjectCombination subjectCombination) { this.subjectCombination = subjectCombination; }

    public String getMethodType() { return methodType; }
    public void setMethodType(String methodType) { this.methodType = methodType; }

    public BigDecimal getRawScore() { return rawScore; }
    public void setRawScore(BigDecimal rawScore) { this.rawScore = rawScore; }

    public BigDecimal getBaseBonus() { return baseBonus; }
    public void setBaseBonus(BigDecimal baseBonus) { this.baseBonus = baseBonus; }

    public BigDecimal getEffectiveBonus() { return effectiveBonus; }
    public void setEffectiveBonus(BigDecimal effectiveBonus) { this.effectiveBonus = effectiveBonus; }

    public BigDecimal getTotalScore() { return totalScore; }
    public void setTotalScore(BigDecimal totalScore) { this.totalScore = totalScore; }

    public Boolean getIsReduced() { return isReduced; }
    public void setIsReduced(Boolean isReduced) { this.isReduced = isReduced; }

    public Map<String, Object> getSubjectScores() { return subjectScores; }
    public void setSubjectScores(Map<String, Object> subjectScores) { this.subjectScores = subjectScores; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
