package com.admissions.backend.institution.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.institution.dto.BonusPolicyDto;
import com.admissions.backend.institution.service.BonusPolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bonus-policies")
@RequiredArgsConstructor
public class BonusPolicyController {

    private final BonusPolicyService policyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BonusPolicyDto>>> getAll(@RequestParam(required = false) String institutionId) {
        List<BonusPolicyDto> list = (institutionId != null && !institutionId.isBlank())
                ? policyService.getByInstitution(institutionId)
                : policyService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BonusPolicyDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(policyService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BonusPolicyDto>> create(@Valid @RequestBody BonusPolicyDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo chính sách điểm cộng thành công", policyService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BonusPolicyDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody BonusPolicyDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật chính sách điểm cộng thành công", policyService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        policyService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa chính sách điểm cộng thành công", null));
    }
}
