package com.admissions.backend.admission.repository;

import com.admissions.backend.admission.entity.TrackTieBreaker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackTieBreakerRepository extends JpaRepository<TrackTieBreaker, Long> {
    List<TrackTieBreaker> findByAdmissionTrack_TrackIdOrderByPriorityOrderAsc(String trackId);
}
