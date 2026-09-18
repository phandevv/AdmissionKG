package com.admissions.backend.institution.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.institution.dto.CampusDto;
import com.admissions.backend.institution.entity.Campus;
import com.admissions.backend.institution.entity.Institution;
import com.admissions.backend.institution.repository.CampusRepository;
import com.admissions.backend.institution.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CampusService {

    private final CampusRepository campusRepository;
    private final InstitutionRepository institutionRepository;

    @Transactional(readOnly = true)
    public List<CampusDto> getAll() {
        return campusRepository.findAll().stream()
                .map(CampusDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CampusDto getById(String campusId) {
        Campus campus = campusRepository.findById(campusId)
                .orElseThrow(() -> new ResourceNotFoundException("Cơ sở đào tạo", "campusId", campusId));
        return CampusDto.from(campus);
    }

    @Transactional(readOnly = true)
    public List<CampusDto> getByInstitution(String institutionId) {
        return campusRepository.findByInstitution_InstitutionId(institutionId).stream()
                .map(CampusDto::from)
                .toList();
    }

    @Transactional
    public CampusDto create(CampusDto dto) {
        Institution institution = institutionRepository.findById(dto.institutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));

        Campus campus = Campus.builder()
                .campusId(dto.campusId())
                .institution(institution)
                .campusCode(dto.campusCode())
                .campusName(dto.campusName())
                .provinceCity(dto.provinceCity())
                .region(dto.region())
                .build();

        return CampusDto.from(campusRepository.save(campus));
    }

    @Transactional
    public CampusDto update(String campusId, CampusDto dto) {
        Campus campus = campusRepository.findById(campusId)
                .orElseThrow(() -> new ResourceNotFoundException("Cơ sở đào tạo", "campusId", campusId));

        Institution institution = institutionRepository.findById(dto.institutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));

        campus.setInstitution(institution);
        campus.setCampusCode(dto.campusCode());
        campus.setCampusName(dto.campusName());
        campus.setProvinceCity(dto.provinceCity());
        campus.setRegion(dto.region());

        return CampusDto.from(campusRepository.save(campus));
    }

    @Transactional
    public void delete(String campusId) {
        if (!campusRepository.existsById(campusId)) {
            throw new ResourceNotFoundException("Cơ sở đào tạo", "campusId", campusId);
        }
        campusRepository.deleteById(campusId);
    }
}
