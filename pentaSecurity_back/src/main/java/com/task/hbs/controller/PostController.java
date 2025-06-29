package com.task.hbs.controller;

import com.task.hbs.common.response.ApiResponse;
import com.task.hbs.dto.PostReqDto;
import com.task.hbs.dto.PostResDto;
import com.task.hbs.dto.PostSearchDto;
import com.task.hbs.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ApiResponse<PostResDto> create(@Valid @RequestBody PostReqDto postReqDto) {
        PostResDto newPost = postService.create(postReqDto);
        return ApiResponse.success(newPost, "게시글 생성 성공");
    }

    @PutMapping("/{id}")
    public ApiResponse<PostResDto> updatePost(
            @PathVariable Long id,               // URL에서 id 추출
            @RequestBody @Valid PostReqDto dto   // Body에서 JSON 파싱
    ) {
        PostResDto updated = postService.update(id, dto);
        return ApiResponse.success(updated, "게시글 수정 성공");
    }

    @GetMapping
    public ApiResponse<?> getPosts(@RequestParam String strategy, PostSearchDto condition) {

        // 서비스 호출 시 검색 조건과 페이징 정보 전달
        Object posts = postService.loadPostsByStrategy(strategy, condition);
        //zee
        return ApiResponse.success(posts, "게시글 목록 조회 SUCCESS");

    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deletePost(@PathVariable Long id) {
        postService.delete(id);
        return ApiResponse.success(null, "게시글 삭제 성공");
    }

}
