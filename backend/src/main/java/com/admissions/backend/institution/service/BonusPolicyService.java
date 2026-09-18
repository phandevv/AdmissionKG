package com.admissions.backend.institution.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.institution.dto.BonusPolicyDto;
import com.admissions.backend.institution.entity.BonusPolicy;
import com.admissions.backend.institution.entity.Institution;
import com.admissions.backend.institution.repository.BonusPolicyRepository;
import com.admissions.backend.institution.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BonusPolicyService {

    private final BonusPolicyRepository policyRepository;
    private final InstitutionRepository institutionRepository;

    @Transactional(readOnly = true)
    public List<BonusPolicyDto> getAll() {
        return policyRepository.findAll().stream()
                .map(BonusPolicyDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public BonusPolicyDto getById(Long id) {
        BonusPolicy policy = policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chính sách điểm cộng", "id", id));
        return BonusPolicyDto.from(policy);
    }

    @Transactional(readOnly = true)
    public List<BonusPolicyDto> getByInstitution(String institutionId) {
        return policyRepository.findByInstitution_InstitutionId(institutionId).stream()
                .map(BonusPolicyDto::from)
                .toList();
    }

    @Transactional
    public BonusPolicyDto create(BonusPolicyDto dto) {
        Institution institution = institutionRepository.findById(dto.institutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));

        BonusPolicy policy = BonusPolicy.builder()
                .institution(institution)
                .achievementCategory(dto.achievementCategory())
                .prizeLevel(dto.prizeLevel())
                .bonusPoints(dto.bonusPoints())
                .maxAccumulatedBonus(dto.maxAccumulatedBonus())
                .build();

        return BonusPolicyDto.from(policyRepository.save(policy));
    }

    @Transactional
    public BonusPolicyDto update(Long id, BonusPolicyDto dto) {
        BonusPolicy policy = policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chính sách điểm cộng", "id", id));

        Institution institution = institutionRepository.findById(dto.institutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Trường / đơn vị đào tạo", "institutionId", dto.institutionId()));

        policy.setInstitution(institution);
        policy.setAchievementCategory(dto.achievementCategory());
        policy.setPrizeLevel(dto.prizeLevel());
        policy.setBonusPoints(dto.bonusPoints());
        policy.setMaxAccumulatedBonus(dto.maxAccumulatedBonus());

        return BonusPolicyDto.from(policyRepository.save(policy));
    }

    @Transactional
    public void delete(Long id) {
        if (!policyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Chính sách điểm cộng", "id", id);
        }
        policyRepository.deleteById(id);
    }
}
