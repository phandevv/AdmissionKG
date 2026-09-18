package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.AdmissionTrackDto;
import com.admissions.backend.admission.entity.AdmissionTrack;
import com.admissions.backend.admission.repository.AdmissionTrackRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.institution.entity.AdmissionScheme;
import com.admissions.backend.institution.entity.Campus;
import com.admissions.backend.institution.repository.AdmissionSchemeRepository;
import com.admissions.backend.institution.repository.CampusRepository;
import com.admissions.backend.major.entity.Major;
import com.admissions.backend.major.repository.MajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdmissionTrackService {

    private final AdmissionTrackRepository trackRepository;
    private final AdmissionSchemeRepository schemeRepository;
    private final CampusRepository campusRepository;
    private final MajorRepository majorRepository;

    @Transactional(readOnly = true)
    public List<AdmissionTrackDto> getAll() {
        return trackRepository.findAll().stream()
                .map(AdmissionTrackDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdmissionTrackDto getById(String trackId) {
        AdmissionTrack track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", trackId));
        return AdmissionTrackDto.from(track);
    }

    @Transactional(readOnly = true)
    public List<AdmissionTrackDto> getByScheme(String schemeId) {
        return trackRepository.findByAdmissionScheme_SchemeId(schemeId).stream()
                .map(AdmissionTrackDto::from)
                .toList();
    }

    @Transactional
    public AdmissionTrackDto create(AdmissionTrackDto dto) {
        AdmissionScheme scheme = schemeRepository.findById(dto.schemeId())
                .orElseThrow(() -> new ResourceNotFoundException("Đề án tuyển sinh", "schemeId", dto.schemeId()));

        Campus campus = null;
        if (dto.campusId() != null && !dto.campusId().isBlank()) {
            campus = campusRepository.findById(dto.campusId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cơ sở đào tạo", "campusId", dto.campusId()));
        }

        Major major = null;
        if (dto.majorCode() != null && !dto.majorCode().isBlank()) {
            major = majorRepository.findById(dto.majorCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Ngành đào tạo", "majorCode", dto.majorCode()));
        }

        AdmissionTrack track = AdmissionTrack.builder()
                .trackId(dto.trackId())
                .admissionScheme(scheme)
                .campus(campus)
                .major(major)
                .admissionCode(dto.admissionCode())
                .trackName(dto.trackName())
                .trackType(dto.trackType())
                .orientationCert(dto.orientationCert())
                .tuitionPolicy(dto.tuitionPolicy())
                .allocatedQuota(dto.allocatedQuota())
                .build();

        return AdmissionTrackDto.from(trackRepository.save(track));
    }

    @Transactional
    public AdmissionTrackDto update(String trackId, AdmissionTrackDto dto) {
        AdmissionTrack track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", trackId));

        AdmissionScheme scheme = schemeRepository.findById(dto.schemeId())
                .orElseThrow(() -> new ResourceNotFoundException("Đề án tuyển sinh", "schemeId", dto.schemeId()));

        Campus campus = null;
        if (dto.campusId() != null && !dto.campusId().isBlank()) {
            campus = campusRepository.findById(dto.campusId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cơ sở đào tạo", "campusId", dto.campusId()));
        }

        Major major = null;
        if (dto.majorCode() != null && !dto.majorCode().isBlank()) {
            major = majorRepository.findById(dto.majorCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Ngành đào tạo", "majorCode", dto.majorCode()));
        }

        track.setAdmissionScheme(scheme);
        track.setCampus(campus);
        track.setMajor(major);
        track.setAdmissionCode(dto.admissionCode());
        track.setTrackName(dto.trackName());
        track.setTrackType(dto.trackType());
        track.setOrientationCert(dto.orientationCert());
        track.setTuitionPolicy(dto.tuitionPolicy());
        track.setAllocatedQuota(dto.allocatedQuota());

        return AdmissionTrackDto.from(trackRepository.save(track));
    }

    @Transactional
    public void delete(String trackId) {
        if (!trackRepository.existsById(trackId)) {
            throw new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", trackId);
        }
        trackRepository.deleteById(trackId);
    }
}
