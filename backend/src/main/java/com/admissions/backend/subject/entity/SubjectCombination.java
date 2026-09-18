package com.admissions.backend.subject.entity;

import com.admissions.backend.admission.entity.TrackMethodCombination;
import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subject_combinations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectCombination {

    @Id
    @Column(name = "combination_code", length = 50, nullable = false)
    private String combinationCode;

    @Column(name = "combination_name", nullable = false)
    private String combinationName;

    @OneToMany(mappedBy = "subjectCombination", cascade = CascadeType.ALL, orphanRemoval = true)
    @BatchSize(size = 25)
    @Builder.Default
    private List<CombinationSubject> combinationSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "subjectCombination", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TrackMethodCombination> trackMethodCombinations = new ArrayList<>();

    public String getCombinationCode() {
        return combinationCode;
    }

    public void setCombinationCode(String combinationCode) {
        this.combinationCode = combinationCode;
    }

    public String getCombinationName() {
        return combinationName;
    }

    public void setCombinationName(String combinationName) {
        this.combinationName = combinationName;
    }

    public List<CombinationSubject> getCombinationSubjects() {
        return combinationSubjects;
    }

    public void setCombinationSubjects(List<CombinationSubject> combinationSubjects) {
        this.combinationSubjects = combinationSubjects;
    }

    public List<TrackMethodCombination> getTrackMethodCombinations() {
        return trackMethodCombinations;
    }

    public void setTrackMethodCombinations(List<TrackMethodCombination> trackMethodCombinations) {
        this.trackMethodCombinations = trackMethodCombinations;
    }
}
