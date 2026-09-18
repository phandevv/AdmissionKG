package com.admissions.backend.user.entity;

import com.admissions.backend.admission.entity.TrackMethodCombination;
import com.admissions.backend.tao.entity.TwdEvaluationLog;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(
    name = "user_wishes",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_user_wish_order", columnNames = {"user_id", "wish_order"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserWish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private UserAcademicProfile academicProfile;

    @Column(name = "wish_order", nullable = false)
    private Integer wishOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tmc_id", nullable = false)
    private TrackMethodCombination trackMethodCombination;

    @OneToOne(mappedBy = "userWish", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private TwdEvaluationLog twdEvaluationLog;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}
