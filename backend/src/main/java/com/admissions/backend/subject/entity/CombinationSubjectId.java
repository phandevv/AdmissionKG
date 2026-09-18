package com.admissions.backend.subject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CombinationSubjectId implements Serializable {

    @Column(name = "combination_code", length = 50, nullable = false)
    private String combinationCode;

    @Column(name = "subject_code", length = 50, nullable = false)
    private String subjectCode;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CombinationSubjectId that = (CombinationSubjectId) o;
        return Objects.equals(combinationCode, that.combinationCode) && Objects.equals(subjectCode, that.subjectCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(combinationCode, subjectCode);
    }
}
