package com.admissions.backend.user.service;

import com.admissions.backend.common.exception.BadRequestException;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.common.exception.UnauthorizedException;
import com.admissions.backend.common.security.JwtService;
import com.admissions.backend.user.dto.AuthResponse;
import com.admissions.backend.user.dto.LoginRequest;
import com.admissions.backend.user.dto.RegisterRequest;
import com.admissions.backend.user.dto.UserDto;
import com.admissions.backend.user.entity.User;
import com.admissions.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email đã được sử dụng: " + email);
        }

        User user = User.builder()
                .email(email)
                .fullName(request.fullName().trim())
                .password(passwordEncoder.encode(request.password()))
                .role("ROLE_STUDENT")
                .build();

        user = userRepository.save(user);
        log.info("Đã đăng ký tài khoản mới: {} ({})", email, user.getRole());

        return issueToken(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Email hoặc mật khẩu không đúng"));

        if (user.getPassword() == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
        }

        return issueToken(user);
    }

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", userId));
        return UserDto.from(user);
    }

    private AuthResponse issueToken(User user) {
        String token = jwtService.generateToken(user);
        return AuthResponse.of(token, jwtService.getExpirationMs(), UserDto.from(user));
    }
}
