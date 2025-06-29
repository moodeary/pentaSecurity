package com.task.hbs.service;

import com.task.hbs.common.exception.PostNotFoundException;
import com.task.hbs.dto.PostReqDto;
import com.task.hbs.dto.PostResDto;
import com.task.hbs.dto.PostSearchDto;
import com.task.hbs.entity.Post;
import com.task.hbs.repository.PostRepository;
import com.task.hbs.service.strategy.LoadStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PostService {

    private final Map<String, LoadStrategy> loadStrategies;
    private final PostRepository postRepository;

    public PostResDto create(PostReqDto dto) {
        Post saved = postRepository.save(dto.toEntity());
        return PostResDto.fromEntity(saved);
    }

    public Object loadPostsByStrategy(String strategy, PostSearchDto condition) {

        LoadStrategy loadStrategy = loadStrategies.get(strategy);
        if (loadStrategy == null) throw new IllegalArgumentException("존재하지 않는 전략입니다.");
        return loadStrategy.loadPosts(condition, postRepository);
    }

    @Transactional
    public void delete(Long id) {
        // 존재하지 않는 경우 예외 처리 등 추가 가능
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
        postRepository.delete(post);
    }

    @Transactional
    public PostResDto update(Long id, PostReqDto dto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
        // 필요한 필드만 수정 (전체 수정)
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());

        // JPA의 Dirty Checking으로 자동 업데이트
        return PostResDto.fromEntity(post);
    }
}
