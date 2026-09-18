package com.admissions.backend.career.repository;

import com.admissions.backend.career.entity.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends JpaRepository<Career, String> {
    List<Career> findByIndustry(String industry);
}
