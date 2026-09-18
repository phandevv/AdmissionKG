package com.admissions.backend.institution.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.institution.dto.UniversalConversionDto;
import com.admissions.backend.institution.entity.Institution;
import com.admissions.backend.institution.entity.UniversalConversion;
import com.admissions.backend.institution.repository.InstitutionRepository;
import com.admissions.backend.institution.repository.UniversalConversionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UniversalConversionService {

    private final UniversalConversionRepository conversionRepository;
    private final InstitutionRepository institutionRepository;

    @Transactional(readOnly = true)
    public List<UniversalConversionDto> getAll() {
        return conversionRepository.findAll().stream()
                .map(UniversalConversionDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UniversalConversionDto getById(Long id) {
        UniversalConversion conversion = conversionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quy tắc quy đổi", "id", id));
        return UniversalConversionDto.from(conversion);
    }

    @Transactional(readOnly = true)
    public List<UniversalConversionDto> getByInstitution(String institutionId) {
        return conversionRepository.findByInstitution_InstitutionId(institutionId).stream()
                .map(UniversalConversionDto::from)
                .toList();
    }

    @Transactional
    public UniversalConversionDto create(UniversalConversionDto dto) {
        Institution institution = null;
        if (dto.institutionId() != null && !dto.institutionId().isBlank()) {
            institution = institutionRepository.findById(dto.institutionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));
        }

        UniversalConversion conversion = UniversalConversion.builder()
                .institution(institution)
                .certOrAchievementType(dto.certOrAchievementType())
                .minInputValue(dto.minInputValue())
                .actionType(dto.actionType())
                .convertedScore(dto.convertedScore())
                .bonusPoint(dto.bonusPoint())
                .build();

        return UniversalConversionDto.from(conversionRepository.save(conversion));
    }

    @Transactional
    public UniversalConversionDto update(Long id, UniversalConversionDto dto) {
        UniversalConversion conversion = conversionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quy tắc quy đổi", "id", id));

        Institution institution = null;
        if (dto.institutionId() != null && !dto.institutionId().isBlank()) {
            institution = institutionRepository.findById(dto.institutionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));
        }

        conversion.setInstitution(institution);
        conversion.setCertOrAchievementType(dto.certOrAchievementType());
        conversion.setMinInputValue(dto.minInputValue());
        conversion.setActionType(dto.actionType());
        conversion.setConvertedScore(dto.convertedScore());
        conversion.setBonusPoint(dto.bonusPoint());

        return UniversalConversionDto.from(conversionRepository.save(conversion));
    }

    @Transactional
    public void delete(Long id) {
        if (!conversionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Quy tắc quy đổi", "id", id);
        }
        conversionRepository.deleteById(id);
    }
}
