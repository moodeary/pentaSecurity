package com.task.hbs.dto;

import java.time.LocalDateTime;

import com.task.hbs.entity.Post;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;

    // Post 엔티티로부터 응답 DTO로 변환
    public static PostResDto fromEntity(Post post) {
        return PostResDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
