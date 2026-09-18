package com.admissions.backend.major.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "academic_fields")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicField {

    @Id
    @Column(name = "field_code", length = 50, nullable = false)
    private String fieldCode;

    @Column(name = "field_name", nullable = false)
    private String fieldName;

    @OneToMany(mappedBy = "academicField", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Major> majors = new ArrayList<>();
}
