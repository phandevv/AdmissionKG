package com.admissions.backend.subject.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.common.dto.PageResponse;
import com.admissions.backend.subject.dto.CategoryCountsDto;
import com.admissions.backend.subject.dto.SubjectCombinationDto;
import com.admissions.backend.subject.service.SubjectCombinationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subject-combinations")
@RequiredArgsConstructor
public class SubjectCombinationController {

    private final SubjectCombinationService combinationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SubjectCombinationDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(combinationService.getAll()));
    }

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<PageResponse<SubjectCombinationDto>>> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subject
    ) {
        return ResponseEntity.ok(ApiResponse.success(combinationService.getPaginated(page, size, keyword, category, subject)));
    }

    @GetMapping("/category-counts")
    public ResponseEntity<ApiResponse<CategoryCountsDto>> getCategoryCounts() {
        return ResponseEntity.ok(ApiResponse.success(combinationService.getCategoryCounts()));
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<SubjectCombinationDto>> getById(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(combinationService.getById(code)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SubjectCombinationDto>> create(@Valid @RequestBody SubjectCombinationDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo tổ hợp môn thành công", combinationService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{code}")
    public ResponseEntity<ApiResponse<SubjectCombinationDto>> update(
            @PathVariable String code,
            @Valid @RequestBody SubjectCombinationDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật tổ hợp môn thành công", combinationService.update(code, dto)));
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String code) {
        combinationService.delete(code);
        return ResponseEntity.ok(ApiResponse.success("Xóa tổ hợp môn thành công", null));
    }
}
