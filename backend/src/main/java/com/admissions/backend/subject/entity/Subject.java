package com.admissions.backend.subject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @Column(name = "subject_code", length = 50, nullable = false)
    private String subjectCode;

    @Column(name = "subject_name", length = 100, nullable = false)
    private String subjectName;

    @Column(name = "subject_category", length = 100)
    private String subjectCategory;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CombinationSubject> combinationSubjects = new ArrayList<>();
}
