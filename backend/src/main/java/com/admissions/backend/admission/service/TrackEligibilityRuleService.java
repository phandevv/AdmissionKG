package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.TrackEligibilityRuleDto;
import com.admissions.backend.admission.entity.AdmissionMethod;
import com.admissions.backend.admission.entity.AdmissionTrack;
import com.admissions.backend.admission.entity.TrackEligibilityRule;
import com.admissions.backend.admission.repository.AdmissionMethodRepository;
import com.admissions.backend.admission.repository.AdmissionTrackRepository;
import com.admissions.backend.admission.repository.TrackEligibilityRuleRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackEligibilityRuleService {

    private final TrackEligibilityRuleRepository ruleRepository;
    private final AdmissionTrackRepository trackRepository;
    private final AdmissionMethodRepository methodRepository;

    @Transactional(readOnly = true)
    public List<TrackEligibilityRuleDto> getAll() {
        return ruleRepository.findAll().stream()
                .map(TrackEligibilityRuleDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TrackEligibilityRuleDto getById(Long id) {
        TrackEligibilityRule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quy tắc điều kiện sàn", "id", id));
        return TrackEligibilityRuleDto.from(rule);
    }

    @Transactional(readOnly = true)
    public List<TrackEligibilityRuleDto> getByTrack(String trackId) {
        return ruleRepository.findByAdmissionTrack_TrackId(trackId).stream()
                .map(TrackEligibilityRuleDto::from)
                .toList();
    }

    @Transactional
    public TrackEligibilityRuleDto create(TrackEligibilityRuleDto dto) {
        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));

        AdmissionMethod method = null;
        if (dto.methodId() != null && !dto.methodId().isBlank()) {
            method = methodRepository.findById(dto.methodId())
                    .orElseThrow(() -> new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", dto.methodId()));
        }

        TrackEligibilityRule rule = TrackEligibilityRule.builder()
                .admissionTrack(track)
                .admissionMethod(method)
                .ruleType(dto.ruleType())
                .ruleValue(dto.ruleValue())
                .errorMessageVi(dto.errorMessageVi())
                .build();

        return TrackEligibilityRuleDto.from(ruleRepository.save(rule));
    }

    @Transactional
    public TrackEligibilityRuleDto update(Long id, TrackEligibilityRuleDto dto) {
        TrackEligibilityRule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quy tắc điều kiện sàn", "id", id));

        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));

        AdmissionMethod method = null;
        if (dto.methodId() != null && !dto.methodId().isBlank()) {
            method = methodRepository.findById(dto.methodId())
                    .orElseThrow(() -> new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", dto.methodId()));
        }

        rule.setAdmissionTrack(track);
        rule.setAdmissionMethod(method);
        rule.setRuleType(dto.ruleType());
        rule.setRuleValue(dto.ruleValue());
        rule.setErrorMessageVi(dto.errorMessageVi());

        return TrackEligibilityRuleDto.from(ruleRepository.save(rule));
    }

    @Transactional
    public void delete(Long id) {
        if (!ruleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Quy tắc điều kiện sàn", "id", id);
        }
        ruleRepository.deleteById(id);
    }
}
