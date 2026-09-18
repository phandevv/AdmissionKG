package com.admissions.backend.institution.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "bonus_policies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BonusPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(name = "achievement_category", length = 100, nullable = false)
    private String achievementCategory;

    @Column(name = "prize_level", length = 100, nullable = false)
    private String prizeLevel;

    @Column(name = "bonus_points", precision = 5, scale = 2, nullable = false)
    private BigDecimal bonusPoints;

    @Column(name = "max_accumulated_bonus", precision = 5, scale = 2)
    private BigDecimal maxAccumulatedBonus;
}
