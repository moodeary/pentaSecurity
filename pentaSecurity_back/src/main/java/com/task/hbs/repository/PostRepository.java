package com.task.hbs.repository;

import com.task.hbs.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("""
        select p from Post p
        where (:keyword is null or :keyword = '' or p.title like %:keyword% or p.content like %:keyword% or p.author like %:keyword%)
    """)
    Page<Post> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("""
        select p from Post p
        where (:keyword is null or :keyword = '' or p.title like %:keyword% or p.content like %:keyword% or p.author like %:keyword%)
    """)
    Slice<Post> findSliceByKeyword(@Param("keyword") String keyword, Pageable pageable);
}

