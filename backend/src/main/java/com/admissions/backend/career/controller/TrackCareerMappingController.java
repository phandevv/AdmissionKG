package com.admissions.backend.career.controller;

import com.admissions.backend.career.dto.TrackCareerMappingDto;
import com.admissions.backend.career.service.TrackCareerMappingService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/track-career-mappings")
@RequiredArgsConstructor
public class TrackCareerMappingController {

    private final TrackCareerMappingService mappingService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TrackCareerMappingDto>>> getAll(
            @RequestParam(required = false) String trackId,
            @RequestParam(required = false) String careerId
    ) {
        if (trackId != null && !trackId.isBlank()) {
            return ResponseEntity.ok(ApiResponse.success(mappingService.getByTrack(trackId)));
        }
        if (careerId != null && !careerId.isBlank()) {
            return ResponseEntity.ok(ApiResponse.success(mappingService.getByCareer(careerId)));
        }
        return ResponseEntity.ok(ApiResponse.success(mappingService.getAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TrackCareerMappingDto>> createOrUpdate(@Valid @RequestBody TrackCareerMappingDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Lưu ánh xạ chương trình - nghề nghiệp thành công", mappingService.createOrUpdate(dto)));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> delete(
            @RequestParam String trackId,
            @RequestParam String careerId
    ) {
        mappingService.delete(trackId, careerId);
        return ResponseEntity.ok(ApiResponse.success("Xóa ánh xạ chương trình - nghề nghiệp thành công", null));
    }
}
