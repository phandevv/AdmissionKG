package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.AdmissionMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdmissionMethodRepository extends JpaRepository<AdmissionMethod, String> {
    Optional<AdmissionMethod> findByMethodCode(String methodCode);
}
