package com.admissions.backend.tao.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.tao.dto.TwdEvaluationLogDto;
import com.admissions.backend.tao.service.TwdEvaluationLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/twd-evaluation-logs")
@RequiredArgsConstructor
public class TwdEvaluationLogController {

    private final TwdEvaluationLogService logService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TwdEvaluationLogDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(logService.getAll()));
    }

    @GetMapping("/{logId}")
    public ResponseEntity<ApiResponse<TwdEvaluationLogDto>> getById(@PathVariable Long logId) {
        return ResponseEntity.ok(ApiResponse.success(logService.getById(logId)));
    }

    @GetMapping("/wish/{wishId}")
    public ResponseEntity<ApiResponse<TwdEvaluationLogDto>> getByWish(@PathVariable Long wishId) {
        return ResponseEntity.ok(ApiResponse.success(logService.getByWish(wishId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TwdEvaluationLogDto>> save(@Valid @RequestBody TwdEvaluationLogDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Lưu nhật ký đánh giá TWD thành công", logService.createOrUpdate(dto)));
    }

    @DeleteMapping("/{logId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long logId) {
        logService.delete(logId);
        return ResponseEntity.ok(ApiResponse.success("Xóa nhật ký đánh giá TWD thành công", null));
    }
}
