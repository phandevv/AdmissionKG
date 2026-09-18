package com.admissions.backend.common.exception;

import lombok.*;

import java.time.OffsetDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {

    private int status;
    private String error;
    private String message;
    private String path;
    private Map<String, String> validationErrors;
    @Builder.Default
    private OffsetDateTime timestamp = OffsetDateTime.now();
}
