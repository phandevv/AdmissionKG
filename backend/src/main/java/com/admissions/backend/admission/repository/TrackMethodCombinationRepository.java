package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.TrackMethodCombination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackMethodCombinationRepository extends JpaRepository<TrackMethodCombination, Long> {
    List<TrackMethodCombination> findByAdmissionTrack_TrackId(String trackId);
    List<TrackMethodCombination> findByAdmissionMethod_MethodId(String methodId);
}
