package com.admissions.backend.institution.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.institution.dto.AdmissionSchemeDto;
import com.admissions.backend.institution.entity.AdmissionScheme;
import com.admissions.backend.institution.entity.Institution;
import com.admissions.backend.institution.repository.AdmissionSchemeRepository;
import com.admissions.backend.institution.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdmissionSchemeService {

    private final AdmissionSchemeRepository schemeRepository;
    private final InstitutionRepository institutionRepository;

    @Transactional(readOnly = true)
    public List<AdmissionSchemeDto> getAll() {
        return schemeRepository.findAll().stream()
                .map(AdmissionSchemeDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdmissionSchemeDto getById(String schemeId) {
        AdmissionScheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new ResourceNotFoundException("Đề án tuyển sinh", "schemeId", schemeId));
        return AdmissionSchemeDto.from(scheme);
    }

    @Transactional(readOnly = true)
    public List<AdmissionSchemeDto> getByInstitution(String institutionId) {
        return schemeRepository.findByInstitution_InstitutionId(institutionId).stream()
                .map(AdmissionSchemeDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AdmissionSchemeDto> getByYear(Integer year) {
        return schemeRepository.findByAcademicYear(year).stream()
                .map(AdmissionSchemeDto::from)
                .toList();
    }

    @Transactional
    public AdmissionSchemeDto create(AdmissionSchemeDto dto) {
        Institution institution = institutionRepository.findById(dto.institutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));

        AdmissionScheme scheme = AdmissionScheme.builder()
                .schemeId(dto.schemeId())
                .institution(institution)
                .academicYear(dto.academicYear())
                .totalQuota(dto.totalQuota())
                .build();

        return AdmissionSchemeDto.from(schemeRepository.save(scheme));
    }

    @Transactional
    public AdmissionSchemeDto update(String schemeId, AdmissionSchemeDto dto) {
        AdmissionScheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new ResourceNotFoundException("Đề án tuyển sinh", "schemeId", schemeId));

        Institution institution = institutionRepository.findById(dto.institutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));

        scheme.setInstitution(institution);
        scheme.setAcademicYear(dto.academicYear());
        scheme.setTotalQuota(dto.totalQuota());

        return AdmissionSchemeDto.from(schemeRepository.save(scheme));
    }

    @Transactional
    public void delete(String schemeId) {
        if (!schemeRepository.existsById(schemeId)) {
            throw new ResourceNotFoundException("Đề án tuyển sinh", "schemeId", schemeId);
        }
        schemeRepository.deleteById(schemeId);
    }
}
