package com.admissions.backend.tao.repository;

import com.admissions.backend.tao.entity.TwdEvaluationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TwdEvaluationLogRepository extends JpaRepository<TwdEvaluationLog, Long> {
    Optional<TwdEvaluationLog> findByUserWish_Id(Long wishId);
}
