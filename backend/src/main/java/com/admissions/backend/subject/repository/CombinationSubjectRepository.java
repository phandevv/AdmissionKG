package com.admissions.backend.subject.repository;

import com.admissions.backend.subject.entity.CombinationSubject;
import com.admissions.backend.subject.entity.CombinationSubjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CombinationSubjectRepository extends JpaRepository<CombinationSubject, CombinationSubjectId> {
    List<CombinationSubject> findById_CombinationCode(String combinationCode);
}
