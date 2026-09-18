package com.admissions.backend.user.controller;

import com.admissions.backend.common.dto.ApiResponse;
import com.admissions.backend.user.dto.AuthResponse;
import com.admissions.backend.user.dto.LoginRequest;
import com.admissions.backend.user.dto.RegisterRequest;
import com.admissions.backend.user.dto.UserDto;
import com.admissions.backend.user.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(
                ApiResponse.success("Đăng ký tài khoản thành công", response),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", authService.login(request)));
    }

    /**
     * Trả về thông tin người dùng hiện tại dựa trên JWT trong header.
     * (principal = userId được JwtAuthenticationFilter nạp vào SecurityContext)
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> me(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(authService.getCurrentUser(userId)));
    }
}
