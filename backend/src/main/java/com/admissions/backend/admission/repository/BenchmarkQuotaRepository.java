package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.BenchmarkQuota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenchmarkQuotaRepository extends JpaRepository<BenchmarkQuota, Long> {
    List<BenchmarkQuota> findByTrackMethodCombination_Id(Long tmcId);
    List<BenchmarkQuota> findByAcademicYear(Integer year);
}
