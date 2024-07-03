package com.will.preloved.service.impl;

import com.will.preloved.model.CategoryFist;
import com.will.preloved.model.CategorySecond;
import com.will.preloved.model.CategoryThird;
import com.will.preloved.payload.category.Category;
import com.will.preloved.repository.CategoryFirstRepository;
import com.will.preloved.repository.CategorySecondRepository;
import com.will.preloved.repository.CategoryThirdRepository;
import com.will.preloved.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryFirstRepository firstRepository;

    @Autowired
    CategorySecondRepository secondRepository;

    @Autowired
    CategoryThirdRepository thirdRepository;


    @Override
    public List<Category> getCategoryFirst() {
        // Fetch all categories from the repositories
        List<CategoryFist> categoryFists = firstRepository.findAll();
        return categoryFists.stream().map(categoryFist -> {
            Category categoryFirst = new Category();
            categoryFirst.setId(categoryFist.getId());
            categoryFirst.setName(categoryFist.getName());
            return categoryFirst;
        }).collect(Collectors.toList());
    }


    @Override
    public List<Category> getCategoryTree(Long categoryId) {

        List<CategorySecond> categorySeconds = secondRepository.findByCategory1id(categoryId);
        List<CategoryThird> categoryThirds = thirdRepository.findByCategory1id(categoryId);

        Map<Long, List<CategoryThird>> thirdListMap = categoryThirds.stream()
                .collect(Collectors.groupingBy(CategoryThird::getCategory2id));

        // Construct the category tree
        return categorySeconds.stream().map(categorySecond -> {
            Category category = new Category();
            category.setName(categorySecond.getName());
            category.setId(categorySecond.getId());

            List<Category> categoryThirdList = thirdListMap.getOrDefault(categorySecond.getId(), Collections.emptyList()).stream()
                    .map(categoryThird -> Category.builder()
                            .id(categoryThird.getId())
                            .name(categoryThird.getName())
                            .build())
                    .collect(Collectors.toList());

            category.setCategoryChildren(categoryThirdList);
            return category;
        }).collect(Collectors.toList());
    }
}
