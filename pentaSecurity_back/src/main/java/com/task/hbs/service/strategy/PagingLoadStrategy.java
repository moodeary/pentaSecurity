package com.task.hbs.service.strategy;

import com.task.hbs.dto.PostResDto;
import com.task.hbs.dto.PostSearchDto;
import com.task.hbs.entity.Post;
import com.task.hbs.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("paging")
public class PagingLoadStrategy implements LoadStrategy{
    @Override
    public Page<PostResDto> loadPosts(PostSearchDto condition, PostRepository postRepository) {
        Sort sort = Sort.by(Sort.Direction.fromString(condition.getSortDir()), condition.getSortBy());
        Pageable pageable = PageRequest.of(condition.getPage(), condition.getSize(), sort);
        Page<Post> page = postRepository.findByKeyword(condition.getKeyword(), pageable);
        return page.map(PostResDto::fromEntity);
    }
}
