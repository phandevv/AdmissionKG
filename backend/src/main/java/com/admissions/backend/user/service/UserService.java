package com.admissions.backend.user.service;

import com.admissions.backend.common.exception.BadRequestException;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.user.dto.UserDto;
import com.admissions.backend.user.entity.User;
import com.admissions.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserDto> getAll() {
        return userRepository.findAll().stream()
                .map(UserDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserDto getById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", userId));
        return UserDto.from(user);
    }

    @Transactional(readOnly = true)
    public UserDto getByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "email", email));
        return UserDto.from(user);
    }

    @Transactional
    public UserDto create(UserDto dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new BadRequestException("Email đã được sử dụng: " + dto.email());
        }

        User user = User.builder()
                .email(dto.email().trim().toLowerCase())
                .fullName(dto.fullName())
                .password(dto.hasPassword() ? passwordEncoder.encode(dto.password()) : null)
                .role(dto.role() != null ? dto.role() : "ROLE_STUDENT")
                .build();

        return UserDto.from(userRepository.save(user));
    }

    @Transactional
    public UserDto update(Long userId, UserDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", userId));

        user.setFullName(dto.fullName());
        if (dto.hasPassword()) {
            user.setPassword(passwordEncoder.encode(dto.password()));
        }
        if (dto.role() != null) {
            user.setRole(dto.role());
        }

        return UserDto.from(userRepository.save(user));
    }

    @Transactional
    public void delete(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("Người dùng", "userId", userId);
        }
        userRepository.deleteById(userId);
    }
}
