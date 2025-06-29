package com.task.hbs.service.strategy;

import com.task.hbs.dto.PostSearchDto;
import com.task.hbs.repository.PostRepository;

public interface LoadStrategy {
    Object loadPosts(PostSearchDto condition, PostRepository postRepository);
}
