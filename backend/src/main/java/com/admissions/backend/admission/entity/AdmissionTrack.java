package com.admissions.backend.admission.entity;

import com.admissions.backend.career.entity.TrackCareerMapping;
import com.admissions.backend.institution.entity.AdmissionScheme;
import com.admissions.backend.institution.entity.Campus;
import com.admissions.backend.major.entity.Major;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "admission_tracks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdmissionTrack {

    @Id
    @Column(name = "track_id", length = 100, nullable = false)
    private String trackId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheme_id", nullable = false)
    private AdmissionScheme admissionScheme;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campus_id")
    private Campus campus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_code")
    private Major major;

    @Column(name = "admission_code", length = 50, nullable = false)
    private String admissionCode;

    @Column(name = "track_name", nullable = false)
    private String trackName;

    @Column(name = "track_type", length = 100)
    private String trackType;

    @Column(name = "orientation_cert", length = 100)
    private String orientationCert;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "tuition_policy", columnDefinition = "jsonb")
    private Map<String, Object> tuitionPolicy;

    @Column(name = "allocated_quota")
    private Integer allocatedQuota;

    @OneToMany(mappedBy = "admissionTrack", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TrackMethodCombination> trackMethodCombinations = new ArrayList<>();

    @OneToMany(mappedBy = "admissionTrack", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TrackEligibilityRule> eligibilityRules = new ArrayList<>();

    @OneToMany(mappedBy = "admissionTrack", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TrackTieBreaker> tieBreakers = new ArrayList<>();

    @OneToMany(mappedBy = "admissionTrack", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TrackCareerMapping> careerMappings = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
