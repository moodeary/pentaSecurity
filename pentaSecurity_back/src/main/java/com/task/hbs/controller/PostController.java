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

    @GetMapping
    public ApiResponse<?> getPosts(@RequestParam String strategy, PostSearchDto condition) {

        // 서비스 호출 시 검색 조건과 페이징 정보 전달
        Object posts = postService.loadPostsByStrategy(strategy, condition);
        //zee
        return ApiResponse.success(posts, "게시글 목록 조회 SUCCESS");

    }
}
