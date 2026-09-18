package com.admissions.backend.common.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.jwt")
@Getter
@Setter
public class JwtProperties {

    /**
     * Khóa bí mật ký JWT (tối thiểu 32 ký tự cho HS256).
     */
    private String secret;

    /**
     * Thời gian sống của token (ms).
     */
    private long expirationMs = 86_400_000L;
}
