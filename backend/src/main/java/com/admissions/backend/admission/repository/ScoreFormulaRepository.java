package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.ScoreFormula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScoreFormulaRepository extends JpaRepository<ScoreFormula, Long> {
    Optional<ScoreFormula> findByFormulaCode(String formulaCode);
}
