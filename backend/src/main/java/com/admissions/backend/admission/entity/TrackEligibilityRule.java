package com.admissions.backend.admission.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "track_eligibility_rules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackEligibilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "track_id", nullable = false)
    private AdmissionTrack admissionTrack;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "method_id")
    private AdmissionMethod admissionMethod;

    @Column(name = "rule_type", length = 100)
    private String ruleType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "rule_value", columnDefinition = "jsonb")
    private Map<String, Object> ruleValue;

    @Column(name = "error_message_vi", columnDefinition = "text")
    private String errorMessageVi;
}
