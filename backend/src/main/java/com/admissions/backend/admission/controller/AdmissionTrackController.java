package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.AdmissionTrackDto;
import com.admissions.backend.admission.service.AdmissionTrackService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admission-tracks")
@RequiredArgsConstructor
public class AdmissionTrackController {

    private final AdmissionTrackService trackService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdmissionTrackDto>>> getAll(@RequestParam(required = false) String schemeId) {
        List<AdmissionTrackDto> tracks = (schemeId != null && !schemeId.isBlank())
                ? trackService.getByScheme(schemeId)
                : trackService.getAll();
        return ResponseEntity.ok(ApiResponse.success(tracks));
    }

    @GetMapping("/{trackId}")
    public ResponseEntity<ApiResponse<AdmissionTrackDto>> getById(@PathVariable String trackId) {
        return ResponseEntity.ok(ApiResponse.success(trackService.getById(trackId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdmissionTrackDto>> create(@Valid @RequestBody AdmissionTrackDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo chương trình tuyển sinh thành công", trackService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{trackId}")
    public ResponseEntity<ApiResponse<AdmissionTrackDto>> update(
            @PathVariable String trackId,
            @Valid @RequestBody AdmissionTrackDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật chương trình tuyển sinh thành công", trackService.update(trackId, dto)));
    }

    @DeleteMapping("/{trackId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String trackId) {
        trackService.delete(trackId);
        return ResponseEntity.ok(ApiResponse.success("Xóa chương trình tuyển sinh thành công", null));
    }
}
