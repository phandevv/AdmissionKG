package com.admissions.backend.career.repository;

import com.admissions.backend.career.entity.TrackCareerMapping;
import com.admissions.backend.career.entity.TrackCareerMappingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackCareerMappingRepository extends JpaRepository<TrackCareerMapping, TrackCareerMappingId> {
    List<TrackCareerMapping> findById_TrackId(String trackId);
    List<TrackCareerMapping> findById_CareerId(String careerId);
}
