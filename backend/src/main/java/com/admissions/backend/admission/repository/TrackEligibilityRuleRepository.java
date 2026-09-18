package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.TrackEligibilityRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackEligibilityRuleRepository extends JpaRepository<TrackEligibilityRule, Long> {
    List<TrackEligibilityRule> findByAdmissionTrack_TrackId(String trackId);
}
