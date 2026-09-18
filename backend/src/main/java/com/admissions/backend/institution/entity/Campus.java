package com.admissions.backend.institution.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "campuses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campus {

    @Id
    @Column(name = "campus_id", length = 50, nullable = false)
    private String campusId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(name = "campus_code", length = 50)
    private String campusCode;

    @Column(name = "campus_name", nullable = false)
    private String campusName;

    @Column(name = "province_city", length = 100)
    private String provinceCity;

    @Column(name = "region", length = 50)
    private String region;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
