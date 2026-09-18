package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.BenchmarkQuotaDto;
import com.admissions.backend.admission.service.BenchmarkQuotaService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/benchmarks-quotas")
@RequiredArgsConstructor
public class BenchmarkQuotaController {

    private final BenchmarkQuotaService benchmarkService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BenchmarkQuotaDto>>> getAll(
            @RequestParam(required = false) Long tmcId,
            @RequestParam(required = false) Integer year
    ) {
        if (tmcId != null) {
            return ResponseEntity.ok(ApiResponse.success(benchmarkService.getByTmc(tmcId)));
        }
        if (year != null) {
            return ResponseEntity.ok(ApiResponse.success(benchmarkService.getByYear(year)));
        }
        return ResponseEntity.ok(ApiResponse.success(benchmarkService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BenchmarkQuotaDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(benchmarkService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BenchmarkQuotaDto>> create(@Valid @RequestBody BenchmarkQuotaDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo điểm chuẩn / chỉ tiêu thành công", benchmarkService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BenchmarkQuotaDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody BenchmarkQuotaDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật điểm chuẩn / chỉ tiêu thành công", benchmarkService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        benchmarkService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa điểm chuẩn / chỉ tiêu thành công", null));
    }
}
