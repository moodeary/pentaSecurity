package com.task.hbs.service.strategy;

import com.task.hbs.dto.PostResDto;
import com.task.hbs.dto.PostSearchDto;
import com.task.hbs.repository.PostRepository;

import java.util.List;

public interface LoadStrategy {
    Object loadPosts(PostSearchDto condition, PostRepository postRepository);
}
