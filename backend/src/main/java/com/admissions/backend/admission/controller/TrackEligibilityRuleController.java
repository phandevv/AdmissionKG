package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.TrackEligibilityRuleDto;
import com.admissions.backend.admission.service.TrackEligibilityRuleService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/eligibility-rules")
@RequiredArgsConstructor
public class TrackEligibilityRuleController {

    private final TrackEligibilityRuleService ruleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TrackEligibilityRuleDto>>> getAll(@RequestParam(required = false) String trackId) {
        List<TrackEligibilityRuleDto> list = (trackId != null && !trackId.isBlank())
                ? ruleService.getByTrack(trackId)
                : ruleService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TrackEligibilityRuleDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(ruleService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TrackEligibilityRuleDto>> create(@Valid @RequestBody TrackEligibilityRuleDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo quy tắc điều kiện sàn thành công", ruleService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TrackEligibilityRuleDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody TrackEligibilityRuleDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật quy tắc điều kiện sàn thành công", ruleService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        ruleService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa quy tắc điều kiện sàn thành công", null));
    }
}
