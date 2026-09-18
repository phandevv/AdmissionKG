package com.admissions.backend.user.dto;

import com.admissions.backend.user.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO quản trị người dùng. Trường password chỉ dùng để nhận
 * mật khẩu mới khi tạo/cập nhật qua CRUD — không bao giờ trả về client.
 */
public record UserDto(
    Long id,

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Định dạng email không hợp lệ")
    String email,

    @NotBlank(message = "Họ và tên không được để trống")
    String fullName,

    String role,

    String password
) {
    public boolean hasPassword() {
        return password != null && !password.isBlank();
    }

    public static UserDto from(User entity) {
        if (entity == null) {
            return null;
        }
        return new UserDto(
            entity.getId(),
            entity.getEmail(),
            entity.getFullName(),
            entity.getRole(),
            null
        );
    }
}
