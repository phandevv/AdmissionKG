package com.admissions.backend.institution.repository;

import com.admissions.backend.institution.entity.AdmissionScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionSchemeRepository extends JpaRepository<AdmissionScheme, String> {
    List<AdmissionScheme> findByInstitution_InstitutionId(String institutionId);
    Optional<AdmissionScheme> findByInstitution_InstitutionIdAndAcademicYear(String institutionId, Integer academicYear);
    List<AdmissionScheme> findByAcademicYear(Integer academicYear);
}
