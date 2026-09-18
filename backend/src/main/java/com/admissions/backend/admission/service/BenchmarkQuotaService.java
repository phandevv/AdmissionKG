package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.BenchmarkQuotaDto;
import com.admissions.backend.admission.entity.BenchmarkQuota;
import com.admissions.backend.admission.entity.TrackMethodCombination;
import com.admissions.backend.admission.repository.BenchmarkQuotaRepository;
import com.admissions.backend.admission.repository.TrackMethodCombinationRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BenchmarkQuotaService {

    private final BenchmarkQuotaRepository benchmarkRepository;
    private final TrackMethodCombinationRepository tmcRepository;

    @Transactional(readOnly = true)
    public List<BenchmarkQuotaDto> getAll() {
        return benchmarkRepository.findAll().stream()
                .map(BenchmarkQuotaDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public BenchmarkQuotaDto getById(Long id) {
        BenchmarkQuota item = benchmarkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Điểm chuẩn / chỉ tiêu", "id", id));
        return BenchmarkQuotaDto.from(item);
    }

    @Transactional(readOnly = true)
    public List<BenchmarkQuotaDto> getByTmc(Long tmcId) {
        return benchmarkRepository.findByTrackMethodCombination_Id(tmcId).stream()
                .map(BenchmarkQuotaDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BenchmarkQuotaDto> getByYear(Integer year) {
        return benchmarkRepository.findByAcademicYear(year).stream()
                .map(BenchmarkQuotaDto::from)
                .toList();
    }

    @Transactional
    public BenchmarkQuotaDto create(BenchmarkQuotaDto dto) {
        TrackMethodCombination tmc = tmcRepository.findById(dto.tmcId())
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp xét tuyển theo chương trình", "id", dto.tmcId()));

        BenchmarkQuota item = BenchmarkQuota.builder()
                .trackMethodCombination(tmc)
                .academicYear(dto.academicYear())
                .quota(dto.quota())
                .admittedCount(dto.admittedCount())
                .benchmarkScore(dto.benchmarkScore())
                .scoreScale(dto.scoreScale())
                .build();

        return BenchmarkQuotaDto.from(benchmarkRepository.save(item));
    }

    @Transactional
    public BenchmarkQuotaDto update(Long id, BenchmarkQuotaDto dto) {
        BenchmarkQuota item = benchmarkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Điểm chuẩn / chỉ tiêu", "id", id));

        TrackMethodCombination tmc = tmcRepository.findById(dto.tmcId())
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp xét tuyển theo chương trình", "id", dto.tmcId()));

        item.setTrackMethodCombination(tmc);
        item.setAcademicYear(dto.academicYear());
        item.setQuota(dto.quota());
        item.setAdmittedCount(dto.admittedCount());
        item.setBenchmarkScore(dto.benchmarkScore());
        item.setScoreScale(dto.scoreScale());

        return BenchmarkQuotaDto.from(benchmarkRepository.save(item));
    }

    @Transactional
    public void delete(Long id) {
        if (!benchmarkRepository.existsById(id)) {
            throw new ResourceNotFoundException("Điểm chuẩn / chỉ tiêu", "id", id);
        }
        benchmarkRepository.deleteById(id);
    }
}
