package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.AdmissionTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdmissionTrackRepository extends JpaRepository<AdmissionTrack, String> {
    List<AdmissionTrack> findByAdmissionScheme_SchemeId(String schemeId);
    List<AdmissionTrack> findByMajor_MajorCode(String majorCode);
}
