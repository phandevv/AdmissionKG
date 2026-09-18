package com.admissions.backend.major.repository;

import com.admissions.backend.major.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorRepository extends JpaRepository<Major, String> {
    List<Major> findByAcademicField_FieldCode(String fieldCode);
}
