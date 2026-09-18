package com.admissions.backend.institution.repository;

import com.admissions.backend.institution.entity.Campus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampusRepository extends JpaRepository<Campus, String> {
    List<Campus> findByInstitution_InstitutionId(String institutionId);
}
