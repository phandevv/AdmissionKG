package com.admissions.backend.institution.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.institution.dto.AdmissionSchemeDto;
import com.admissions.backend.institution.service.AdmissionSchemeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admission-schemes")
@RequiredArgsConstructor
public class AdmissionSchemeController {

    private final AdmissionSchemeService schemeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdmissionSchemeDto>>> getAll(
            @RequestParam(required = false) String institutionId,
            @RequestParam(required = false) Integer year
    ) {
        if (institutionId != null && !institutionId.isBlank()) {
            return ResponseEntity.ok(ApiResponse.success(schemeService.getByInstitution(institutionId)));
        }
        if (year != null) {
            return ResponseEntity.ok(ApiResponse.success(schemeService.getByYear(year)));
        }
        return ResponseEntity.ok(ApiResponse.success(schemeService.getAll()));
    }

    @GetMapping("/{schemeId}")
    public ResponseEntity<ApiResponse<AdmissionSchemeDto>> getById(@PathVariable String schemeId) {
        return ResponseEntity.ok(ApiResponse.success(schemeService.getById(schemeId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdmissionSchemeDto>> create(@Valid @RequestBody AdmissionSchemeDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo đề án tuyển sinh thành công", schemeService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{schemeId}")
    public ResponseEntity<ApiResponse<AdmissionSchemeDto>> update(
            @PathVariable String schemeId,
            @Valid @RequestBody AdmissionSchemeDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật đề án tuyển sinh thành công", schemeService.update(schemeId, dto)));
    }

    @DeleteMapping("/{schemeId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String schemeId) {
        schemeService.delete(schemeId);
        return ResponseEntity.ok(ApiResponse.success("Xóa đề án tuyển sinh thành công", null));
    }
}
