package com.admissions.backend.examscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidateLookupResponse {
    private Short year;
    private String sbd;
    private String province;
    private String region;

    // Điểm các môn gốc
    private Map<String, BigDecimal> subjectScores;

    // Danh sách các tổ hợp đủ điều kiện xét tuyển cùng thứ hạng
    private List<SubjectGroupScoreDto> groupScores;
}
