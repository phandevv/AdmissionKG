package com.admissions.backend.institution.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.institution.dto.InstitutionDto;
import com.admissions.backend.institution.service.InstitutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/institutions")
@RequiredArgsConstructor
public class InstitutionController {

    private final InstitutionService institutionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<InstitutionDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(institutionService.getAll()));
    }

    @GetMapping("/{institutionId}")
    public ResponseEntity<ApiResponse<InstitutionDto>> getById(@PathVariable String institutionId) {
        return ResponseEntity.ok(ApiResponse.success(institutionService.getById(institutionId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InstitutionDto>> create(@Valid @RequestBody InstitutionDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo trường / đơn vị đào tạo thành công", institutionService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{institutionId}")
    public ResponseEntity<ApiResponse<InstitutionDto>> update(
            @PathVariable String institutionId,
            @Valid @RequestBody InstitutionDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trường / đơn vị đào tạo thành công", institutionService.update(institutionId, dto)));
    }

    @DeleteMapping("/{institutionId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String institutionId) {
        institutionService.delete(institutionId);
        return ResponseEntity.ok(ApiResponse.success("Xóa trường / đơn vị đào tạo thành công", null));
    }
}
