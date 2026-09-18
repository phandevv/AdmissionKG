package com.admissions.backend.institution.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.institution.dto.CampusDto;
import com.admissions.backend.institution.service.CampusService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campuses")
@RequiredArgsConstructor
public class CampusController {

    private final CampusService campusService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CampusDto>>> getAll(@RequestParam(required = false) String institutionId) {
        List<CampusDto> campuses = (institutionId != null && !institutionId.isBlank())
                ? campusService.getByInstitution(institutionId)
                : campusService.getAll();
        return ResponseEntity.ok(ApiResponse.success(campuses));
    }

    @GetMapping("/{campusId}")
    public ResponseEntity<ApiResponse<CampusDto>> getById(@PathVariable String campusId) {
        return ResponseEntity.ok(ApiResponse.success(campusService.getById(campusId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CampusDto>> create(@Valid @RequestBody CampusDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo cơ sở đào tạo thành công", campusService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{campusId}")
    public ResponseEntity<ApiResponse<CampusDto>> update(
            @PathVariable String campusId,
            @Valid @RequestBody CampusDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật cơ sở đào tạo thành công", campusService.update(campusId, dto)));
    }

    @DeleteMapping("/{campusId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String campusId) {
        campusService.delete(campusId);
        return ResponseEntity.ok(ApiResponse.success("Xóa cơ sở đào tạo thành công", null));
    }
}
