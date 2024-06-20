package com.will.emmy.model.category;

import lombok.Data;

import java.util.List;

@Data
public class CategoryTreeFist {

    private Long levelOneId;

    private String levelOneName;

    private List<CategoryTreeSecond> categoryTreeSeconds;
}
