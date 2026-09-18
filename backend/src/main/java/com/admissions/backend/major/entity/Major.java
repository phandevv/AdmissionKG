package com.admissions.backend.major.entity;

import com.admissions.backend.admission.entity.AdmissionTrack;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "majors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Major {

    @Id
    @Column(name = "major_code", length = 50, nullable = false)
    private String majorCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_code")
    private AcademicField academicField;

    @Column(name = "major_name", nullable = false)
    private String majorName;

    @Column(name = "degree_type", length = 100)
    private String degreeType;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    @Builder.Default
    private List<AdmissionTrack> admissionTracks = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
