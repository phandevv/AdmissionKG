package com.admissions.backend.institution.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "universal_conversions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversalConversion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conversion_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @Column(name = "cert_or_achievement_type", length = 100, nullable = false)
    private String certOrAchievementType;

    @Column(name = "min_input_value", length = 100, nullable = false)
    private String minInputValue;

    @Column(name = "action_type", length = 50, nullable = false)
    private String actionType;

    @Column(name = "converted_score", precision = 5, scale = 2)
    private BigDecimal convertedScore;

    @Column(name = "bonus_point", precision = 5, scale = 2)
    private BigDecimal bonusPoint;
}
