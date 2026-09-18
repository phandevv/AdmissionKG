package com.admissions.backend.examscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BatchImportResultDto {
    private String status;
    private String message;
    private Integer totalRowsProcessed;
    private Integer totalInserted;
    private Long executionTimeMs;
    private Boolean distributionRecalculated;
}
