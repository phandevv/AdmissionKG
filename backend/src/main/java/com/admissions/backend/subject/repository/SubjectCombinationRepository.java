package com.admissions.backend.subject.repository;

import com.admissions.backend.subject.entity.SubjectCombination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectCombinationRepository extends JpaRepository<SubjectCombination, String>, JpaSpecificationExecutor<SubjectCombination> {

    @Query("""
        SELECT 
            COUNT(sc),
            SUM(CASE WHEN sc.combinationCode LIKE 'A%' THEN 1L ELSE 0L END),
            SUM(CASE WHEN sc.combinationCode LIKE 'B%' THEN 1L ELSE 0L END),
            SUM(CASE WHEN sc.combinationCode LIKE 'C%' THEN 1L ELSE 0L END),
            SUM(CASE WHEN sc.combinationCode LIKE 'D%' THEN 1L ELSE 0L END),
            SUM(CASE WHEN sc.combinationCode LIKE 'X%' THEN 1L ELSE 0L END),
            SUM(CASE WHEN sc.combinationCode NOT LIKE 'A%' 
                      AND sc.combinationCode NOT LIKE 'B%' 
                      AND sc.combinationCode NOT LIKE 'C%' 
                      AND sc.combinationCode NOT LIKE 'D%' 
                      AND sc.combinationCode NOT LIKE 'X%' THEN 1L ELSE 0L END)
        FROM SubjectCombination sc
    """)
    List<Object[]> getCategoryCountsRaw();
}
