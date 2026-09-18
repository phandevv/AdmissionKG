package com.admissions.backend.institution.repository;

import com.admissions.backend.institution.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, String> {
    Optional<Institution> findByInstitutionCode(String code);
    List<Institution> findByParentInstitution_InstitutionId(String parentId);
}
