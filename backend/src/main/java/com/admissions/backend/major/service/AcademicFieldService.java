package com.admissions.backend.major.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.major.dto.AcademicFieldDto;
import com.admissions.backend.major.entity.AcademicField;
import com.admissions.backend.major.repository.AcademicFieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicFieldService {

    private final AcademicFieldRepository academicFieldRepository;

    @Transactional(readOnly = true)
    public List<AcademicFieldDto> getAll() {
        return academicFieldRepository.findAll().stream()
                .map(AcademicFieldDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public AcademicFieldDto getById(String fieldCode) {
        AcademicField field = academicFieldRepository.findById(fieldCode)
                .orElseThrow(() -> new ResourceNotFoundException("Lĩnh vực đào tạo", "fieldCode", fieldCode));
        return AcademicFieldDto.from(field);
    }

    @Transactional
    public AcademicFieldDto create(AcademicFieldDto dto) {
        AcademicField entity = AcademicField.builder()
                .fieldCode(dto.fieldCode())
                .fieldName(dto.fieldName())
                .build();
        return AcademicFieldDto.from(academicFieldRepository.save(entity));
    }

    @Transactional
    public AcademicFieldDto update(String fieldCode, AcademicFieldDto dto) {
        AcademicField entity = academicFieldRepository.findById(fieldCode)
                .orElseThrow(() -> new ResourceNotFoundException("Lĩnh vực đào tạo", "fieldCode", fieldCode));

        entity.setFieldName(dto.fieldName());

        return AcademicFieldDto.from(academicFieldRepository.save(entity));
    }

    @Transactional
    public void delete(String fieldCode) {
        if (!academicFieldRepository.existsById(fieldCode)) {
            throw new ResourceNotFoundException("Lĩnh vực đào tạo", "fieldCode", fieldCode);
        }
        academicFieldRepository.deleteById(fieldCode);
    }
}
