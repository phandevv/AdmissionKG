package com.admissions.backend.user.dto;

import com.admissions.backend.user.entity.UserCombinationScore;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

public record UserCombinationScoreDto(
        Long id,
        Long profileId,
        String combinationCode,
        String combinationName,
        String methodType,
        BigDecimal rawScore,
        BigDecimal baseBonus,
        BigDecimal effectiveBonus,
        BigDecimal totalScore,
        Boolean isReduced,
        Map<String, Object> subjectScores,
        OffsetDateTime updatedAt
) {
    public static UserCombinationScoreDto from(UserCombinationScore entity) {
        if (entity == null) return null;
        return new UserCombinationScoreDto(
                entity.getId(),
                entity.getAcademicProfile() != null ? entity.getAcademicProfile().getId() : null,
                entity.getSubjectCombination() != null ? entity.getSubjectCombination().getCombinationCode() : null,
                entity.getSubjectCombination() != null ? entity.getSubjectCombination().getCombinationName() : null,
                entity.getMethodType(),
                entity.getRawScore(),
                entity.getBaseBonus(),
                entity.getEffectiveBonus(),
                entity.getTotalScore(),
                entity.getIsReduced(),
                entity.getSubjectScores(),
                entity.getUpdatedAt()
        );
    }
}
