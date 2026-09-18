package com.admissions.backend.subject.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.subject.dto.SubjectDto;
import com.admissions.backend.subject.service.SubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SubjectDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(subjectService.getAll()));
    }

    @GetMapping("/{subjectCode}")
    public ResponseEntity<ApiResponse<SubjectDto>> getById(@PathVariable String subjectCode) {
        return ResponseEntity.ok(ApiResponse.success(subjectService.getById(subjectCode)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SubjectDto>> create(@Valid @RequestBody SubjectDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo môn học thành công", subjectService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{subjectCode}")
    public ResponseEntity<ApiResponse<SubjectDto>> update(
            @PathVariable String subjectCode,
            @Valid @RequestBody SubjectDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật môn học thành công", subjectService.update(subjectCode, dto)));
    }

    @DeleteMapping("/{subjectCode}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String subjectCode) {
        subjectService.delete(subjectCode);
        return ResponseEntity.ok(ApiResponse.success("Xóa môn học thành công", null));
    }
}
