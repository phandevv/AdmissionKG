package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.TrackTieBreakerDto;
import com.admissions.backend.admission.service.TrackTieBreakerService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tie-breakers")
@RequiredArgsConstructor
public class TrackTieBreakerController {

    private final TrackTieBreakerService tieBreakerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TrackTieBreakerDto>>> getAll(@RequestParam(required = false) String trackId) {
        List<TrackTieBreakerDto> list = (trackId != null && !trackId.isBlank())
                ? tieBreakerService.getByTrack(trackId)
                : tieBreakerService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TrackTieBreakerDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(tieBreakerService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TrackTieBreakerDto>> create(@Valid @RequestBody TrackTieBreakerDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo tiêu chí phụ khi hòa điểm thành công", tieBreakerService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TrackTieBreakerDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody TrackTieBreakerDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật tiêu chí phụ khi hòa điểm thành công", tieBreakerService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        tieBreakerService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa tiêu chí phụ khi hòa điểm thành công", null));
    }
}
