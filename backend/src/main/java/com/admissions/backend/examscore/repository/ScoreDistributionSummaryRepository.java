package com.admissions.backend.examscore.repository;

import com.admissions.backend.examscore.entity.ScoreDistributionSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreDistributionSummaryRepository extends JpaRepository<ScoreDistributionSummary, Long> {

    @Query("SELECT s FROM ScoreDistributionSummary s WHERE s.year = :year AND s.targetCode = :targetCode " +
           "AND s.scopeType = :scopeType AND s.scopeCode = :scopeCode ORDER BY s.score ASC")
    List<ScoreDistributionSummary> findDistribution(
            @Param("year") Short year,
            @Param("targetCode") String targetCode,
            @Param("scopeType") String scopeType,
            @Param("scopeCode") String scopeCode
    );

    @Query("SELECT s FROM ScoreDistributionSummary s WHERE s.year = :year AND s.targetCode = :targetCode " +
           "AND s.scopeType = :scopeType AND s.scopeCode = :scopeCode AND s.score = :score")
    Optional<ScoreDistributionSummary> findByExactScore(
            @Param("year") Short year,
            @Param("targetCode") String targetCode,
            @Param("scopeType") String scopeType,
            @Param("scopeCode") String scopeCode,
            @Param("score") BigDecimal score
    );

    @Query("SELECT DISTINCT s.targetCode FROM ScoreDistributionSummary s WHERE s.year = :year AND s.targetType = :targetType ORDER BY s.targetCode ASC")
    List<String> findDistinctTargetCodes(@Param("year") Short year, @Param("targetType") String targetType);

    @Query("SELECT DISTINCT s.scopeCode FROM ScoreDistributionSummary s WHERE s.year = :year AND s.scopeType = :scopeType ORDER BY s.scopeCode ASC")
    List<String> findDistinctScopeCodes(@Param("year") Short year, @Param("scopeType") String scopeType);

    void deleteByYear(Short year);
}
