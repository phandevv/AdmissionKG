package com.admissions.backend.career.service;

import com.admissions.backend.admission.entity.AdmissionTrack;
import com.admissions.backend.admission.repository.AdmissionTrackRepository;
import com.admissions.backend.career.dto.TrackCareerMappingDto;
import com.admissions.backend.career.entity.Career;
import com.admissions.backend.career.entity.TrackCareerMapping;
import com.admissions.backend.career.entity.TrackCareerMappingId;
import com.admissions.backend.career.repository.CareerRepository;
import com.admissions.backend.career.repository.TrackCareerMappingRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackCareerMappingService {

    private final TrackCareerMappingRepository mappingRepository;
    private final AdmissionTrackRepository trackRepository;
    private final CareerRepository careerRepository;

    @Transactional(readOnly = true)
    public List<TrackCareerMappingDto> getAll() {
        return mappingRepository.findAll().stream()
                .map(TrackCareerMappingDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TrackCareerMappingDto> getByTrack(String trackId) {
        return mappingRepository.findById_TrackId(trackId).stream()
                .map(TrackCareerMappingDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TrackCareerMappingDto> getByCareer(String careerId) {
        return mappingRepository.findById_CareerId(careerId).stream()
                .map(TrackCareerMappingDto::from)
                .toList();
    }

    @Transactional
    public TrackCareerMappingDto createOrUpdate(TrackCareerMappingDto dto) {
        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));
        Career career = careerRepository.findById(dto.careerId())
                .orElseThrow(() -> new ResourceNotFoundException("Nghề nghiệp", "careerId", dto.careerId()));

        TrackCareerMappingId id = new TrackCareerMappingId(dto.trackId(), dto.careerId());
        TrackCareerMapping mapping = TrackCareerMapping.builder()
                .id(id)
                .admissionTrack(track)
                .career(career)
                .suitabilityScore(dto.suitabilityScore())
                .build();

        return TrackCareerMappingDto.from(mappingRepository.save(mapping));
    }

    @Transactional
    public void delete(String trackId, String careerId) {
        TrackCareerMappingId id = new TrackCareerMappingId(trackId, careerId);
        if (!mappingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ánh xạ chương trình - nghề nghiệp", "id", trackId + "-" + careerId);
        }
        mappingRepository.deleteById(id);
    }
}
