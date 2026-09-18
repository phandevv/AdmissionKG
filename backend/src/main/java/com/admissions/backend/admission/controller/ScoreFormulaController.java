package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.ScoreFormulaDto;
import com.admissions.backend.admission.service.ScoreFormulaService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/score-formulas")
@RequiredArgsConstructor
public class ScoreFormulaController {

    private final ScoreFormulaService formulaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ScoreFormulaDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(formulaService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ScoreFormulaDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(formulaService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ScoreFormulaDto>> create(@Valid @RequestBody ScoreFormulaDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo công thức tính điểm thành công", formulaService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ScoreFormulaDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody ScoreFormulaDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật công thức tính điểm thành công", formulaService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        formulaService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa công thức tính điểm thành công", null));
    }
}
