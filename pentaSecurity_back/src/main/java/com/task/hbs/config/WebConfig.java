package com.task.hbs.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 엔드포인트에 대해 CORS 설정
                .allowedOrigins("*")  // 모든 출처 허용 (보안에 주의)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메서드
                .allowedHeaders("Content-Type", "Authorization")  // 허용할 헤더
                .exposedHeaders("Authorization") // 헤더 노출 추가
                .maxAge(3600);  // CORS 응답을 캐시할 시간 (초)
    }
}