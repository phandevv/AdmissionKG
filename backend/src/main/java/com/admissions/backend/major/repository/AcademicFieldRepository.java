package com.admissions.backend.major.repository;

import com.admissions.backend.major.entity.AcademicField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademicFieldRepository extends JpaRepository<AcademicField, String> {
}
