package com.admissions.backend.examscore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateExamScoreId implements Serializable {

    @Column(name = "year", nullable = false)
    private Short year;

    @Column(name = "sbd", nullable = false, length = 20)
    private String sbd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CandidateExamScoreId that = (CandidateExamScoreId) o;
        return Objects.equals(year, that.year) && Objects.equals(sbd, that.sbd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(year, sbd);
    }
}
