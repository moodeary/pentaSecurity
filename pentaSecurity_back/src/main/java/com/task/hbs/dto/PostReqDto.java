package com.task.hbs.dto;

import java.time.LocalDateTime;

import com.task.hbs.entity.Post;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostReqDto {

    private Long id;

    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 100, message = "제목은 100자 이내로 입력하세요.")
    private String title;

    @NotBlank(message = "내용은 필수입니다.")
    private String content;

    @NotBlank(message = "작성자는 필수입니다.")
    private String author;

    public Post toEntity() {
        return Post.builder()
                .id(this.id)
                .title(this.title)
                .content(this.content)
                .author(this.author)
                .build();
    }
}

