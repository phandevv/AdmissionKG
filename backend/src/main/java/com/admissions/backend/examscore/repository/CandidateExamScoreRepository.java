package com.admissions.backend.examscore.repository;

import com.admissions.backend.examscore.entity.CandidateExamScore;
import com.admissions.backend.examscore.entity.CandidateExamScoreId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateExamScoreRepository extends JpaRepository<CandidateExamScore, CandidateExamScoreId> {

    @Query("SELECT c FROM CandidateExamScore c WHERE c.id.year = :year AND c.id.sbd = :sbd")
    Optional<CandidateExamScore> findByYearAndSbd(@Param("year") Short year, @Param("sbd") String sbd);

    @Query("SELECT COUNT(c) FROM CandidateExamScore c WHERE c.id.year = :year")
    long countByYear(@Param("year") Short year);
}
