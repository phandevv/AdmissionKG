package com.admissions.backend.institution.repository;

import com.admissions.backend.institution.entity.UniversalConversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversalConversionRepository extends JpaRepository<UniversalConversion, Long> {
    List<UniversalConversion> findByInstitution_InstitutionId(String institutionId);
}
