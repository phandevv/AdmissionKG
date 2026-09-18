package com.admissions.backend.user.dto;

import com.admissions.backend.user.entity.UserWish;
import jakarta.validation.constraints.NotNull;

public record UserWishDto(
    Long id,

    @NotNull(message = "ID người dùng không được để trống")
    Long userId,

    Long profileId,

    @NotNull(message = "Thứ tự nguyện vọng không được để trống")
    Integer wishOrder,

    @NotNull(message = "ID tổ hợp phương thức xét tuyển không được để trống")
    Long tmcId
) {
    public static UserWishDto from(UserWish entity) {
        if (entity == null) {
            return null;
        }
        return new UserWishDto(
            entity.getId(),
            entity.getUser() != null ? entity.getUser().getId() : null,
            entity.getAcademicProfile() != null ? entity.getAcademicProfile().getId() : null,
            entity.getWishOrder(),
            entity.getTrackMethodCombination() != null ? entity.getTrackMethodCombination().getId() : null
        );
    }
}
