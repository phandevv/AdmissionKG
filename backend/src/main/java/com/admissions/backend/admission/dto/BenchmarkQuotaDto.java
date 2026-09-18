package com.admissions.backend.admission.dto;

import com.admissions.backend.admission.entity.BenchmarkQuota;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record BenchmarkQuotaDto(
    Long id,

    @NotNull(message = "Mã liên kết phương thức - tổ hợp (TMC ID) không được để trống")
    Long tmcId,

    @NotNull(message = "Năm tuyển sinh không được để trống")
    Integer academicYear,

    Integer quota,

    Integer admittedCount,

    @NotNull(message = "Điểm chuẩn trúng tuyển không được để trống")
    BigDecimal benchmarkScore,

    @NotNull(message = "Thang điểm không được để trống")
    BigDecimal scoreScale
) {
    public static BenchmarkQuotaDto from(BenchmarkQuota entity) {
        if (entity == null) {
            return null;
        }
        return new BenchmarkQuotaDto(
            entity.getId(),
            entity.getTrackMethodCombination() != null ? entity.getTrackMethodCombination().getId() : null,
            entity.getAcademicYear(),
            entity.getQuota(),
            entity.getAdmittedCount(),
            entity.getBenchmarkScore(),
            entity.getScoreScale()
        );
    }
}
