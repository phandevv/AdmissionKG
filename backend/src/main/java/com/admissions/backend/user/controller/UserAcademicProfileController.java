package com.admissions.backend.user.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.user.dto.UserAcademicProfileDto;
import com.admissions.backend.user.service.UserAcademicProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic-profiles")
@RequiredArgsConstructor
public class UserAcademicProfileController {

    private final UserAcademicProfileService profileService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserAcademicProfileDto>>> getAll(@RequestParam(required = false) Long userId) {
        List<UserAcademicProfileDto> list = (userId != null)
                ? profileService.getByUser(userId)
                : profileService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserAcademicProfileDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(profileService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserAcademicProfileDto>> create(@Valid @RequestBody UserAcademicProfileDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo hồ sơ học tập thành công", profileService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserAcademicProfileDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody UserAcademicProfileDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật hồ sơ học tập thành công", profileService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        profileService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa hồ sơ học tập thành công", null));
    }
}
