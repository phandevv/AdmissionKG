package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.TrackTieBreakerDto;
import com.admissions.backend.admission.entity.AdmissionTrack;
import com.admissions.backend.admission.entity.TrackTieBreaker;
import com.admissions.backend.admission.repository.AdmissionTrackRepository;
import com.admissions.backend.admission.repository.TrackTieBreakerRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackTieBreakerService {

    private final TrackTieBreakerRepository tieBreakerRepository;
    private final AdmissionTrackRepository trackRepository;

    @Transactional(readOnly = true)
    public List<TrackTieBreakerDto> getAll() {
        return tieBreakerRepository.findAll().stream()
                .map(TrackTieBreakerDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TrackTieBreakerDto getById(Long id) {
        TrackTieBreaker item = tieBreakerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tiêu chí phụ khi hòa điểm", "id", id));
        return TrackTieBreakerDto.from(item);
    }

    @Transactional(readOnly = true)
    public List<TrackTieBreakerDto> getByTrack(String trackId) {
        return tieBreakerRepository.findByAdmissionTrack_TrackIdOrderByPriorityOrderAsc(trackId).stream()
                .map(TrackTieBreakerDto::from)
                .toList();
    }

    @Transactional
    public TrackTieBreakerDto create(TrackTieBreakerDto dto) {
        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));

        TrackTieBreaker item = TrackTieBreaker.builder()
                .admissionTrack(track)
                .priorityOrder(dto.priorityOrder())
                .criterionType(dto.criterionType())
                .sortDirection(dto.sortDirection() != null ? dto.sortDirection() : "DESC")
                .build();

        return TrackTieBreakerDto.from(tieBreakerRepository.save(item));
    }

    @Transactional
    public TrackTieBreakerDto update(Long id, TrackTieBreakerDto dto) {
        TrackTieBreaker item = tieBreakerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tiêu chí phụ khi hòa điểm", "id", id));

        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));

        item.setAdmissionTrack(track);
        item.setPriorityOrder(dto.priorityOrder());
        item.setCriterionType(dto.criterionType());
        if (dto.sortDirection() != null) {
            item.setSortDirection(dto.sortDirection());
        }

        return TrackTieBreakerDto.from(tieBreakerRepository.save(item));
    }

    @Transactional
    public void delete(Long id) {
        if (!tieBreakerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tiêu chí phụ khi hòa điểm", "id", id);
        }
        tieBreakerRepository.deleteById(id);
    }
}
