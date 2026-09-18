package com.admissions.backend.examscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectGroupScoreDto {
    private String groupCode;        // 'A00', 'A01', 'D01'...
    private String groupName;        // 'Toán, Vật lí, Hóa học'
    private String subjects;         // 'Toán - Lý - Hóa'
    private BigDecimal totalScore;   // 26.75
    
    // Thứ hạng của thí sinh trên tổ hợp này
    private Integer nationalRank;
    private Integer nationalHigherCount;
    private Integer nationalTotal;
    private BigDecimal nationalPercentile;

    private Integer regionRank;
    private Integer regionHigherCount;
    private Integer regionTotal;

    private Integer provinceRank;
    private Integer provinceHigherCount;
    private Integer provinceTotal;
}
