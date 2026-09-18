package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.AdmissionMethodDto;
import com.admissions.backend.admission.service.AdmissionMethodService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admission-methods")
@RequiredArgsConstructor
public class AdmissionMethodController {

    private final AdmissionMethodService methodService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdmissionMethodDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(methodService.getAll()));
    }

    @GetMapping("/{methodId}")
    public ResponseEntity<ApiResponse<AdmissionMethodDto>> getById(@PathVariable String methodId) {
        return ResponseEntity.ok(ApiResponse.success(methodService.getById(methodId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdmissionMethodDto>> create(@Valid @RequestBody AdmissionMethodDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo phương thức tuyển sinh thành công", methodService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{methodId}")
    public ResponseEntity<ApiResponse<AdmissionMethodDto>> update(
            @PathVariable String methodId,
            @Valid @RequestBody AdmissionMethodDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật phương thức tuyển sinh thành công", methodService.update(methodId, dto)));
    }

    @DeleteMapping("/{methodId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String methodId) {
        methodService.delete(methodId);
        return ResponseEntity.ok(ApiResponse.success("Xóa phương thức tuyển sinh thành công", null));
    }
}
