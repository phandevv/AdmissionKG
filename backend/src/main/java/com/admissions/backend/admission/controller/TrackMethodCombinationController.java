package com.admissions.backend.admission.controller;

import com.admissions.backend.admission.dto.TrackMethodCombinationDto;
import com.admissions.backend.admission.service.TrackMethodCombinationService;
import com.admissions.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/track-method-combinations")
@RequiredArgsConstructor
public class TrackMethodCombinationController {

    private final TrackMethodCombinationService tmcService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TrackMethodCombinationDto>>> getAll(@RequestParam(required = false) String trackId) {
        List<TrackMethodCombinationDto> list = (trackId != null && !trackId.isBlank())
                ? tmcService.getByTrack(trackId)
                : tmcService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TrackMethodCombinationDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(tmcService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TrackMethodCombinationDto>> create(@Valid @RequestBody TrackMethodCombinationDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo tổ hợp xét tuyển theo chương trình thành công", tmcService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TrackMethodCombinationDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody TrackMethodCombinationDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật tổ hợp xét tuyển theo chương trình thành công", tmcService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        tmcService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa tổ hợp xét tuyển theo chương trình thành công", null));
    }
}
