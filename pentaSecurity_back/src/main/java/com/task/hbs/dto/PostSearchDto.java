package com.task.hbs.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostSearchDto {

    private String keyword = "";
    private String sortBy = "createdAt";
    private String sortDir = "ASC";
    private int page = 0;
    private int size = 10;
}
