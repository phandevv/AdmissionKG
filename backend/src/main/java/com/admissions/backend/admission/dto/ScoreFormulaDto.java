package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.ScoreFormula;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Map;

public record ScoreFormulaDto(
    Long id,

    @NotBlank(message = "Mã công thức tính điểm không được để trống")
    String formulaCode,

    @NotNull(message = "Thang điểm chuẩn không được để trống")
    BigDecimal targetScale,

    String formulaExpression,

    Map<String, Object> subjectWeights
) {
    public static ScoreFormulaDto from(ScoreFormula entity) {
        if (entity == null) {
            return null;
        }
        return new ScoreFormulaDto(
            entity.getId(),
            entity.getFormulaCode(),
            entity.getTargetScale(),
            entity.getFormulaExpression(),
            entity.getSubjectWeights()
        );
    }
}
