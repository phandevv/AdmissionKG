package com.admissions.backend.major.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.major.dto.AcademicFieldDto;
import com.admissions.backend.major.service.AcademicFieldService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic-fields")
@RequiredArgsConstructor
public class AcademicFieldController {

    private final AcademicFieldService academicFieldService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AcademicFieldDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(academicFieldService.getAll()));
    }

    @GetMapping("/{fieldCode}")
    public ResponseEntity<ApiResponse<AcademicFieldDto>> getById(@PathVariable String fieldCode) {
        return ResponseEntity.ok(ApiResponse.success(academicFieldService.getById(fieldCode)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AcademicFieldDto>> create(@Valid @RequestBody AcademicFieldDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo lĩnh vực đào tạo thành công", academicFieldService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{fieldCode}")
    public ResponseEntity<ApiResponse<AcademicFieldDto>> update(
            @PathVariable String fieldCode,
            @Valid @RequestBody AcademicFieldDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật lĩnh vực đào tạo thành công", academicFieldService.update(fieldCode, dto)));
    }

    @DeleteMapping("/{fieldCode}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String fieldCode) {
        academicFieldService.delete(fieldCode);
        return ResponseEntity.ok(ApiResponse.success("Xóa lĩnh vực đào tạo thành công", null));
    }
}
