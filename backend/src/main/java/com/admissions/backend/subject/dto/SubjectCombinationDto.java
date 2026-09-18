package com.admissions.backend.subject.dto;

import com.admissions.backend.subject.entity.SubjectCombination;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record SubjectCombinationDto(
    @NotBlank(message = "Mã tổ hợp môn không được để trống")
    String combinationCode,

    @NotBlank(message = "Tên tổ hợp môn không được để trống")
    String combinationName,

    List<String> subjectCodes,
    List<SubjectItemDto> subjects
) {
    public record SubjectItemDto(String subjectCode, String subjectName, String subjectCategory) {}

    public SubjectCombinationDto(String combinationCode, String combinationName, List<String> subjectCodes) {
        this(combinationCode, combinationName, subjectCodes, List.of());
    }

    public static SubjectCombinationDto from(SubjectCombination entity) {
        if (entity == null) {
            return null;
        }
        List<String> codes = (entity.getCombinationSubjects() != null)
                ? entity.getCombinationSubjects().stream()
                    .map(cs -> cs.getId().getSubjectCode())
                    .toList()
                : List.of();

        List<SubjectItemDto> subjectItems = (entity.getCombinationSubjects() != null)
                ? entity.getCombinationSubjects().stream()
                    .filter(cs -> cs.getSubject() != null)
                    .map(cs -> new SubjectItemDto(
                        cs.getSubject().getSubjectCode(),
                        cs.getSubject().getSubjectName(),
                        cs.getSubject().getSubjectCategory()
                    ))
                    .toList()
                : List.of();

        return new SubjectCombinationDto(
            entity.getCombinationCode(),
            entity.getCombinationName(),
            codes,
            subjectItems
        );
    }
}
