package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.ScoreFormulaDto;
import com.admissions.backend.admission.entity.ScoreFormula;
import com.admissions.backend.admission.repository.ScoreFormulaRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreFormulaService {

    private final ScoreFormulaRepository formulaRepository;

    @Transactional(readOnly = true)
    public List<ScoreFormulaDto> getAll() {
        return formulaRepository.findAll().stream()
                .map(ScoreFormulaDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ScoreFormulaDto getById(Long id) {
        ScoreFormula formula = formulaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Công thức tính điểm", "id", id));
        return ScoreFormulaDto.from(formula);
    }

    @Transactional
    public ScoreFormulaDto create(ScoreFormulaDto dto) {
        ScoreFormula formula = ScoreFormula.builder()
                .formulaCode(dto.formulaCode())
                .targetScale(dto.targetScale())
                .formulaExpression(dto.formulaExpression())
                .subjectWeights(dto.subjectWeights())
                .build();
        return ScoreFormulaDto.from(formulaRepository.save(formula));
    }

    @Transactional
    public ScoreFormulaDto update(Long id, ScoreFormulaDto dto) {
        ScoreFormula formula = formulaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Công thức tính điểm", "id", id));

        formula.setFormulaCode(dto.formulaCode());
        formula.setTargetScale(dto.targetScale());
        formula.setFormulaExpression(dto.formulaExpression());
        formula.setSubjectWeights(dto.subjectWeights());

        return ScoreFormulaDto.from(formulaRepository.save(formula));
    }

    @Transactional
    public void delete(Long id) {
        if (!formulaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Công thức tính điểm", "id", id);
        }
        formulaRepository.deleteById(id);
    }
}
