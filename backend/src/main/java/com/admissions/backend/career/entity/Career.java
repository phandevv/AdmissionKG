package com.admissions.backend.career.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "careers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Career {

    @Id
    @Column(name = "career_id", length = 100, nullable = false)
    private String careerId;

    @Column(name = "career_title", nullable = false)
    private String careerTitle;

    @Column(name = "industry", length = 100)
    private String industry;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "required_skills", columnDefinition = "jsonb")
    private Map<String, Object> requiredSkills;

    @OneToMany(mappedBy = "career", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TrackCareerMapping> trackMappings = new ArrayList<>();
}
