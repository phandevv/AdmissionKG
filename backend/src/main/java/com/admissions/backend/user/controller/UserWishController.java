package com.admissions.backend.user.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.user.dto.UserWishDto;
import com.admissions.backend.user.service.UserWishService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishes")
@RequiredArgsConstructor
public class UserWishController {

    private final UserWishService wishService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserWishDto>>> getAll(@RequestParam(required = false) Long userId) {
        List<UserWishDto> list = (userId != null)
                ? wishService.getByUser(userId)
                : wishService.getAll();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{wishId}")
    public ResponseEntity<ApiResponse<UserWishDto>> getById(@PathVariable Long wishId) {
        return ResponseEntity.ok(ApiResponse.success(wishService.getById(wishId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserWishDto>> create(@Valid @RequestBody UserWishDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo nguyện vọng thành công", wishService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{wishId}")
    public ResponseEntity<ApiResponse<UserWishDto>> update(
            @PathVariable Long wishId,
            @Valid @RequestBody UserWishDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật nguyện vọng thành công", wishService.update(wishId, dto)));
    }

    @DeleteMapping("/{wishId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long wishId) {
        wishService.delete(wishId);
        return ResponseEntity.ok(ApiResponse.success("Xóa nguyện vọng thành công", null));
    }
}
