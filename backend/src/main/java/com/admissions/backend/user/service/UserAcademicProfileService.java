package com.admissions.backend.user.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.subject.entity.SubjectCombination;
import com.admissions.backend.subject.repository.SubjectCombinationRepository;
import com.admissions.backend.user.dto.UserAcademicProfileDto;
import com.admissions.backend.user.entity.User;
import com.admissions.backend.user.entity.UserAcademicProfile;
import com.admissions.backend.user.entity.UserCombinationScore;
import com.admissions.backend.user.repository.UserAcademicProfileRepository;
import com.admissions.backend.user.repository.UserCombinationScoreRepository;
import com.admissions.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserAcademicProfileService {

    private final UserAcademicProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final UserCombinationScoreRepository combinationScoreRepository;
    private final SubjectCombinationRepository subjectCombinationRepository;


    @Transactional(readOnly = true)
    public List<UserAcademicProfileDto> getAll() {
        return profileRepository.findAll().stream()
                .map(UserAcademicProfileDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserAcademicProfileDto getById(Long id) {
        UserAcademicProfile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hồ sơ học tập", "profileId", id));
        return UserAcademicProfileDto.from(profile);
    }

    @Transactional(readOnly = true)
    public List<UserAcademicProfileDto> getByUser(Long userId) {
        return profileRepository.findByUser_Id(userId).stream()
                .map(UserAcademicProfileDto::from)
                .toList();
    }

    @Transactional
    public UserAcademicProfileDto create(UserAcademicProfileDto dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", dto.userId()));

        UserAcademicProfile profile = UserAcademicProfile.builder()
                .user(user)
                .thptScores(dto.thptScores())
                .hocbaScores(dto.hocbaScores())
                .aptitudeTestScores(dto.aptitudeTestScores())
                .internationalCertificates(dto.internationalCertificates())
                .achievements(dto.achievements())
                .priorityArea(dto.priorityArea())
                .priorityGroup(dto.priorityGroup())
                .provinceCity(dto.provinceCity())
                .region(dto.region())
                .build();

        UserAcademicProfile savedProfile = profileRepository.save(profile);
        syncCombinationScores(savedProfile, dto.hocbaScores(), dto.thptScores());

        return UserAcademicProfileDto.from(savedProfile);
    }

    @Transactional
    public UserAcademicProfileDto update(Long id, UserAcademicProfileDto dto) {
        UserAcademicProfile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hồ sơ học tập", "profileId", id));

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", dto.userId()));

        profile.setUser(user);
        profile.setThptScores(dto.thptScores());
        profile.setHocbaScores(dto.hocbaScores());
        profile.setAptitudeTestScores(dto.aptitudeTestScores());
        profile.setInternationalCertificates(dto.internationalCertificates());
        profile.setAchievements(dto.achievements());
        profile.setPriorityArea(dto.priorityArea());
        profile.setPriorityGroup(dto.priorityGroup());
        profile.setProvinceCity(dto.provinceCity());
        profile.setRegion(dto.region());

        UserAcademicProfile savedProfile = profileRepository.save(profile);
        syncCombinationScores(savedProfile, dto.hocbaScores(), dto.thptScores());

        return UserAcademicProfileDto.from(savedProfile);
    }

    private void syncCombinationScores(UserAcademicProfile profile, Map<String, Object> hocbaScores, Map<String, Object> thptScores) {
        if (profile == null || profile.getId() == null) return;

        // Process HOC_BA (PT200)
        if (hocbaScores != null && hocbaScores.get("combinationScores") instanceof Map<?, ?> hocbaCombos && !hocbaCombos.isEmpty()) {
            saveCombos(profile, hocbaCombos, "HOC_BA");
        } else {
            combinationScoreRepository.deleteByAcademicProfileIdAndMethodType(profile.getId(), "HOC_BA");
        }

        // Process THPT_EXAM (PT100)
        if (thptScores != null && thptScores.get("combinationScores") instanceof Map<?, ?> thptCombos && !thptCombos.isEmpty()) {
            saveCombos(profile, thptCombos, "THPT_EXAM");
        } else {
            combinationScoreRepository.deleteByAcademicProfileIdAndMethodType(profile.getId(), "THPT_EXAM");
        }
    }

    private void saveCombos(UserAcademicProfile profile, Map<?, ?> comboMap, String methodType) {
        List<String> validCodes = new ArrayList<>();

        for (Map.Entry<?, ?> entry : comboMap.entrySet()) {
            String code = String.valueOf(entry.getKey()).trim();
            if (code.isEmpty() || !(entry.getValue() instanceof Map<?, ?> valMap)) continue;

            BigDecimal totalScore = toBigDecimal(valMap.get("totalScore"));
            if (totalScore == null) continue;

            validCodes.add(code);

            SubjectCombination combination = subjectCombinationRepository.findById(code).orElseGet(() -> {
                SubjectCombination newComb = SubjectCombination.builder()
                        .combinationCode(code)
                        .combinationName("Tổ hợp " + code)
                        .build();
                return subjectCombinationRepository.save(newComb);
            });

            BigDecimal rawScore = toBigDecimal(valMap.get("rawScore"));
            BigDecimal baseBonus = toBigDecimal(valMap.get("baseBonus"));
            BigDecimal effectiveBonus = toBigDecimal(valMap.get("effectiveBonus"));
            Boolean isReduced = valMap.get("isReduced") instanceof Boolean b ? b : false;

            @SuppressWarnings("unchecked")
            Map<String, Object> subjectScores = valMap.get("subjectScores") instanceof Map<?, ?> sMap
                    ? (Map<String, Object>) sMap : null;

            UserCombinationScore scoreEntity = combinationScoreRepository
                    .findByAcademicProfile_IdAndSubjectCombination_CombinationCodeAndMethodType(profile.getId(), code, methodType)
                    .orElseGet(() -> UserCombinationScore.builder()
                            .academicProfile(profile)
                            .subjectCombination(combination)
                            .methodType(methodType)
                            .build());

            scoreEntity.setRawScore(rawScore);
            scoreEntity.setBaseBonus(baseBonus);
            scoreEntity.setEffectiveBonus(effectiveBonus);
            scoreEntity.setTotalScore(totalScore);
            scoreEntity.setIsReduced(isReduced);
            scoreEntity.setSubjectScores(subjectScores);

            combinationScoreRepository.save(scoreEntity);
        }

        // Xóa các tổ hợp môn cũ không còn hợp lệ do thí sinh đã đổi môn học/môn thi
        if (!validCodes.isEmpty()) {
            combinationScoreRepository.deleteObsoleteScores(profile.getId(), methodType, validCodes);
        } else {
            combinationScoreRepository.deleteByAcademicProfileIdAndMethodType(profile.getId(), methodType);
        }
    }

    private BigDecimal toBigDecimal(Object obj) {
        if (obj == null) return null;
        if (obj instanceof Number num) return BigDecimal.valueOf(num.doubleValue());
        try {
            return new BigDecimal(String.valueOf(obj));
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public void delete(Long id) {
        if (!profileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hồ sơ học tập", "profileId", id);
        }
        profileRepository.deleteById(id);
    }
}
