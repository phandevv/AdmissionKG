package com.admissions.backend.institution.repository;

import com.admissions.backend.institution.entity.BonusPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BonusPolicyRepository extends JpaRepository<BonusPolicy, Long> {
    List<BonusPolicy> findByInstitution_InstitutionId(String institutionId);
}
