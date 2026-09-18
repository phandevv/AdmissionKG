package com.admissions.backend.subject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "combination_subjects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CombinationSubject {

    @EmbeddedId
    private CombinationSubjectId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("combinationCode")
    @JoinColumn(name = "combination_code", nullable = false)
    private SubjectCombination subjectCombination;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subjectCode")
    @JoinColumn(name = "subject_code", nullable = false)
    private Subject subject;

    public CombinationSubjectId getId() {
        return id;
    }

    public void setId(CombinationSubjectId id) {
        this.id = id;
    }

    public SubjectCombination getSubjectCombination() {
        return subjectCombination;
    }

    public void setSubjectCombination(SubjectCombination subjectCombination) {
        this.subjectCombination = subjectCombination;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}
