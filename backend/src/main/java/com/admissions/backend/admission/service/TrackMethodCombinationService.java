package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.TrackMethodCombinationDto;
import com.admissions.backend.admission.entity.AdmissionMethod;
import com.admissions.backend.admission.entity.AdmissionTrack;
import com.admissions.backend.admission.entity.ScoreFormula;
import com.admissions.backend.admission.entity.TrackMethodCombination;
import com.admissions.backend.admission.repository.AdmissionMethodRepository;
import com.admissions.backend.admission.repository.AdmissionTrackRepository;
import com.admissions.backend.admission.repository.ScoreFormulaRepository;
import com.admissions.backend.admission.repository.TrackMethodCombinationRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.subject.entity.SubjectCombination;
import com.admissions.backend.subject.repository.SubjectCombinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackMethodCombinationService {

    private final TrackMethodCombinationRepository tmcRepository;
    private final AdmissionTrackRepository trackRepository;
    private final AdmissionMethodRepository methodRepository;
    private final SubjectCombinationRepository combinationRepository;
    private final ScoreFormulaRepository formulaRepository;

    @Transactional(readOnly = true)
    public List<TrackMethodCombinationDto> getAll() {
        return tmcRepository.findAll().stream()
                .map(TrackMethodCombinationDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TrackMethodCombinationDto getById(Long id) {
        TrackMethodCombination tmc = tmcRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp xét tuyển theo chương trình", "id", id));
        return TrackMethodCombinationDto.from(tmc);
    }

    @Transactional(readOnly = true)
    public List<TrackMethodCombinationDto> getByTrack(String trackId) {
        return tmcRepository.findByAdmissionTrack_TrackId(trackId).stream()
                .map(TrackMethodCombinationDto::from)
                .toList();
    }

    @Transactional
    public TrackMethodCombinationDto create(TrackMethodCombinationDto dto) {
        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));
        AdmissionMethod method = methodRepository.findById(dto.methodId())
                .orElseThrow(() -> new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", dto.methodId()));
        SubjectCombination combination = combinationRepository.findById(dto.combinationCode())
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp môn", "combinationCode", dto.combinationCode()));

        ScoreFormula formula = null;
        if (dto.formulaId() != null) {
            formula = formulaRepository.findById(dto.formulaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Công thức tính điểm", "id", dto.formulaId()));
        }

        TrackMethodCombination tmc = TrackMethodCombination.builder()
                .admissionTrack(track)
                .admissionMethod(method)
                .subjectCombination(combination)
                .scoreFormula(formula)
                .specificQuota(dto.specificQuota())
                .build();

        return TrackMethodCombinationDto.from(tmcRepository.save(tmc));
    }

    @Transactional
    public TrackMethodCombinationDto update(Long id, TrackMethodCombinationDto dto) {
        TrackMethodCombination tmc = tmcRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp xét tuyển theo chương trình", "id", id));

        AdmissionTrack track = trackRepository.findById(dto.trackId())
                .orElseThrow(() -> new ResourceNotFoundException("Chương trình tuyển sinh", "trackId", dto.trackId()));
        AdmissionMethod method = methodRepository.findById(dto.methodId())
                .orElseThrow(() -> new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", dto.methodId()));
        SubjectCombination combination = combinationRepository.findById(dto.combinationCode())
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp môn", "combinationCode", dto.combinationCode()));

        ScoreFormula formula = null;
        if (dto.formulaId() != null) {
            formula = formulaRepository.findById(dto.formulaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Công thức tính điểm", "id", dto.formulaId()));
        }

        tmc.setAdmissionTrack(track);
        tmc.setAdmissionMethod(method);
        tmc.setSubjectCombination(combination);
        tmc.setScoreFormula(formula);
        tmc.setSpecificQuota(dto.specificQuota());

        return TrackMethodCombinationDto.from(tmcRepository.save(tmc));
    }

    @Transactional
    public void delete(Long id) {
        if (!tmcRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tổ hợp xét tuyển theo chương trình", "id", id);
        }
        tmcRepository.deleteById(id);
    }
}
