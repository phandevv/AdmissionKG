package com.admissions.backend.subject.dto;

import com.admissions.backend.subject.entity.Subject;
import jakarta.validation.constraints.NotBlank;

public record SubjectDto(
    @NotBlank(message = "Mã môn học không được để trống")
    String subjectCode,

    @NotBlank(message = "Tên môn học không được để trống")
    String subjectName,

    String subjectCategory
) {
    public static SubjectDto from(Subject entity) {
        if (entity == null) {
            return null;
        }
        return new SubjectDto(
            entity.getSubjectCode(),
            entity.getSubjectName(),
            entity.getSubjectCategory()
        );
    }
}
