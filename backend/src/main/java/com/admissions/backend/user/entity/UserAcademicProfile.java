package com.admissions.backend.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "user_academic_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAcademicProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "thpt_scores", columnDefinition = "jsonb")
    private Map<String, Object> thptScores;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "hocba_scores", columnDefinition = "jsonb")
    private Map<String, Object> hocbaScores;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "aptitude_test_scores", columnDefinition = "jsonb")
    private Map<String, Object> aptitudeTestScores;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "international_certificates", columnDefinition = "jsonb")
    private Map<String, Object> internationalCertificates;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "achievements", columnDefinition = "jsonb")
    private Map<String, Object> achievements;

    @Column(name = "priority_area", length = 50)
    private String priorityArea;

    @Column(name = "priority_group", length = 50)
    private String priorityGroup;

    @Column(name = "province_city", length = 100)
    private String provinceCity;

    @Column(name = "region", length = 50)
    private String region;

    @OneToMany(mappedBy = "academicProfile")
    @Builder.Default
    private List<UserWish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "academicProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserCombinationScore> combinationScores = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Map<String, Object> getThptScores() { return thptScores; }
    public void setThptScores(Map<String, Object> thptScores) { this.thptScores = thptScores; }

    public Map<String, Object> getHocbaScores() { return hocbaScores; }
    public void setHocbaScores(Map<String, Object> hocbaScores) { this.hocbaScores = hocbaScores; }

    public Map<String, Object> getAptitudeTestScores() { return aptitudeTestScores; }
    public void setAptitudeTestScores(Map<String, Object> aptitudeTestScores) { this.aptitudeTestScores = aptitudeTestScores; }

    public Map<String, Object> getInternationalCertificates() { return internationalCertificates; }
    public void setInternationalCertificates(Map<String, Object> internationalCertificates) { this.internationalCertificates = internationalCertificates; }

    public Map<String, Object> getAchievements() { return achievements; }
    public void setAchievements(Map<String, Object> achievements) { this.achievements = achievements; }

    public String getPriorityArea() { return priorityArea; }
    public void setPriorityArea(String priorityArea) { this.priorityArea = priorityArea; }

    public String getPriorityGroup() { return priorityGroup; }
    public void setPriorityGroup(String priorityGroup) { this.priorityGroup = priorityGroup; }

    public String getProvinceCity() { return provinceCity; }
    public void setProvinceCity(String provinceCity) { this.provinceCity = provinceCity; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public List<UserWish> getWishes() { return wishes; }
    public void setWishes(List<UserWish> wishes) { this.wishes = wishes; }

    public List<UserCombinationScore> getCombinationScores() { return combinationScores; }
    public void setCombinationScores(List<UserCombinationScore> combinationScores) { this.combinationScores = combinationScores; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
