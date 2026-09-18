package com.admissions.backend.major.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.major.dto.MajorDto;
import com.admissions.backend.major.entity.AcademicField;
import com.admissions.backend.major.entity.Major;
import com.admissions.backend.major.repository.AcademicFieldRepository;
import com.admissions.backend.major.repository.MajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MajorService {

    private final MajorRepository majorRepository;
    private final AcademicFieldRepository academicFieldRepository;

    @Transactional(readOnly = true)
    public List<MajorDto> getAll() {
        return majorRepository.findAll().stream()
                .map(MajorDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public MajorDto getById(String majorCode) {
        Major major = majorRepository.findById(majorCode)
                .orElseThrow(() -> new ResourceNotFoundException("Ngành đào tạo", "majorCode", majorCode));
        return MajorDto.from(major);
    }

    @Transactional(readOnly = true)
    public List<MajorDto> getByField(String fieldCode) {
        return majorRepository.findByAcademicField_FieldCode(fieldCode).stream()
                .map(MajorDto::from)
                .toList();
    }

    @Transactional
    public MajorDto create(MajorDto dto) {
        AcademicField field = null;
        if (dto.fieldCode() != null && !dto.fieldCode().isBlank()) {
            field = academicFieldRepository.findById(dto.fieldCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Lĩnh vực đào tạo", "fieldCode", dto.fieldCode()));
        }

        Major major = Major.builder()
                .majorCode(dto.majorCode())
                .academicField(field)
                .majorName(dto.majorName())
                .degreeType(dto.degreeType())
                .build();

        return MajorDto.from(majorRepository.save(major));
    }

    @Transactional
    public MajorDto update(String majorCode, MajorDto dto) {
        Major major = majorRepository.findById(majorCode)
                .orElseThrow(() -> new ResourceNotFoundException("Ngành đào tạo", "majorCode", majorCode));

        if (dto.fieldCode() != null && !dto.fieldCode().isBlank()) {
            AcademicField field = academicFieldRepository.findById(dto.fieldCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Lĩnh vực đào tạo", "fieldCode", dto.fieldCode()));
            major.setAcademicField(field);
        } else {
            major.setAcademicField(null);
        }

        major.setMajorName(dto.majorName());
        major.setDegreeType(dto.degreeType());

        return MajorDto.from(majorRepository.save(major));
    }

    @Transactional
    public void delete(String majorCode) {
        if (!majorRepository.existsById(majorCode)) {
            throw new ResourceNotFoundException("Ngành đào tạo", "majorCode", majorCode);
        }
        majorRepository.deleteById(majorCode);
    }
}
