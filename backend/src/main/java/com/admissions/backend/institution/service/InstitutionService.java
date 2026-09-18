package com.admissions.backend.institution.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.institution.dto.InstitutionDto;
import com.admissions.backend.institution.entity.Institution;
import com.admissions.backend.institution.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitutionService {

    private final InstitutionRepository institutionRepository;


    @Transactional(readOnly = true)
    public List<InstitutionDto> getAll() {
        return institutionRepository.findAll().stream()
                .map(InstitutionDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public InstitutionDto getById(String institutionId) {
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", institutionId));
        return InstitutionDto.from(institution);
    }

    @Transactional
    public InstitutionDto create(InstitutionDto dto) {
        Institution parent = null;
        if (dto.parentInstitutionId() != null && !dto.parentInstitutionId().isBlank()) {
            parent = institutionRepository.findById(dto.parentInstitutionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trường cấp trên", "institutionId", dto.parentInstitutionId()));
        }

        Institution institution = Institution.builder()
                .institutionId(dto.institutionId())
                .institutionCode(dto.institutionCode())
                .institutionName(dto.institutionName())
                .institutionType(dto.institutionType())
                .provinceCity(dto.provinceCity())
                .region(dto.region())
                .parentInstitution(parent)
                .contactInfo(dto.contactInfo())
                .build();

        return InstitutionDto.from(institutionRepository.save(institution));
    }

    @Transactional
    public InstitutionDto update(String institutionId, InstitutionDto dto) {
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", institutionId));

        Institution parent = null;
        if (dto.parentInstitutionId() != null && !dto.parentInstitutionId().isBlank()) {
            parent = institutionRepository.findById(dto.parentInstitutionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trường cấp trên", "institutionId", dto.parentInstitutionId()));
        }

        institution.setInstitutionCode(dto.institutionCode());
        institution.setInstitutionName(dto.institutionName());
        institution.setInstitutionType(dto.institutionType());
        institution.setProvinceCity(dto.provinceCity());
        institution.setRegion(dto.region());
        institution.setParentInstitution(parent);
        institution.setContactInfo(dto.contactInfo());

        return InstitutionDto.from(institutionRepository.save(institution));
    }

    @Transactional
    public void delete(String institutionId) {
        if (!institutionRepository.existsById(institutionId)) {
            throw new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", institutionId);
        }
        institutionRepository.deleteById(institutionId);
    }
}
