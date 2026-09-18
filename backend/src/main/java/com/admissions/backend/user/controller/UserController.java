package com.admissions.backend.user.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.user.dto.UserDto;
import com.admissions.backend.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(userService.getAll()));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> getById(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success(userService.getById(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> create(@Valid @RequestBody UserDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Tạo người dùng thành công", userService.create(dto)), HttpStatus.CREATED);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> update(
            @PathVariable Long userId,
            @Valid @RequestBody UserDto dto
    ) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật người dùng thành công", userService.update(userId, dto)));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok(ApiResponse.success("Xóa người dùng thành công", null));
    }
}
