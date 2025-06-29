package com.task.hbs.service.strategy;

import com.task.hbs.dto.PostResDto;
import com.task.hbs.dto.PostSearchDto;
import com.task.hbs.entity.Post;
import com.task.hbs.repository.PostRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service("infinite")
public class InfiniteLoadStrategy implements LoadStrategy{
    @Override
    public Slice<PostResDto> loadPosts(PostSearchDto condition, PostRepository postRepository) {
        Sort sort = Sort.by(Sort.Direction.fromString(condition.getSortDir()), condition.getSortBy());
        Pageable pageable = PageRequest.of(condition.getPage(), condition.getSize(), sort);
        Slice<Post> slice = postRepository.findSliceByKeyword(condition.getKeyword(), pageable); // findSliceBy... 메서드 필요
        return slice.map(PostResDto::fromEntity);
    }
}
