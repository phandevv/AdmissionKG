package com.admissions.backend.major.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.major.dto.MajorDto;
import com.admissions.backend.major.service.MajorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/majors")
@RequiredArgsConstructor
public class MajorController {

    private final MajorService majorService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MajorDto>>> getAll(@RequestParam(required = false) String fieldCode) {
        List<MajorDto> majors = (fieldCode != null && !fieldCode.isBlank())
                ? majorService.getByField(fieldCode)
                : majorService.getAll();
        return ResponseEntity.ok(ApiResponse.success(majors));
    }

    @GetMapping("/{majorCode}")
    public ResponseEntity<ApiResponse<MajorDto>> getById(@PathVariable String majorCode) {
        return ResponseEntity.ok(ApiResponse.success(majorService.getById(majorCode)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MajorDto>> create(@Valid @RequestBody MajorDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo ngành đào tạo thành công", majorService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{majorCode}")
    public ResponseEntity<ApiResponse<MajorDto>> update(
            @PathVariable String majorCode,
            @Valid @RequestBody MajorDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật ngành đào tạo thành công", majorService.update(majorCode, dto)));
    }

    @DeleteMapping("/{majorCode}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String majorCode) {
        majorService.delete(majorCode);
        return ResponseEntity.ok(ApiResponse.success("Xóa ngành đào tạo thành công", null));
    }
}
