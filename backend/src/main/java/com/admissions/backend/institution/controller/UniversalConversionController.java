package com.admissions.backend.institution.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.institution.dto.UniversalConversionDto;
import com.admissions.backend.institution.service.UniversalConversionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/universal-conversions")
@RequiredArgsConstructor
public class UniversalConversionController {

    private final UniversalConversionService conversionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UniversalConversionDto>>> getAll(@RequestParam(required = false) String institutionId) {
        List<UniversalConversionDto> list = (institutionId != null && !institutionId.isBlank())
                ? conversionService.getByInstitution(institutionId)
                : conversionService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UniversalConversionDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(conversionService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UniversalConversionDto>> create(@Valid @RequestBody UniversalConversionDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo quy tắc quy đổi thành công", conversionService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UniversalConversionDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody UniversalConversionDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật quy tắc quy đổi thành công", conversionService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        conversionService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa quy tắc quy đổi thành công", null));
    }
}
