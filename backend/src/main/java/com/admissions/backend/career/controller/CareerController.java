package com.admissions.backend.career.controller;

import com.admissions.backend.career.dto.CareerDto;
import com.admissions.backend.career.service.CareerService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/careers")
@RequiredArgsConstructor
public class CareerController {

    private final CareerService careerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CareerDto>>> getAll(@RequestParam(required = false) String industry) {
        List<CareerDto> careers = (industry != null && !industry.isBlank())
                ? careerService.getByIndustry(industry)
                : careerService.getAll();
        return ResponseEntity.ok(ApiResponse.success(careers));
    }

    @GetMapping("/{careerId}")
    public ResponseEntity<ApiResponse<CareerDto>> getById(@PathVariable String careerId) {
        return ResponseEntity.ok(ApiResponse.success(careerService.getById(careerId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CareerDto>> create(@Valid @RequestBody CareerDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo nghề nghiệp thành công", careerService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{careerId}")
    public ResponseEntity<ApiResponse<CareerDto>> update(
            @PathVariable String careerId,
            @Valid @RequestBody CareerDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật nghề nghiệp thành công", careerService.update(careerId, dto)));
    }

    @DeleteMapping("/{careerId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String careerId) {
        careerService.delete(careerId);
        return ResponseEntity.ok(ApiResponse.success("Xóa nghề nghiệp thành công", null));
    }
}
