package com.will.emmy.service.impl;

import com.will.emmy.model.CategoryFist;
import com.will.emmy.model.CategorySecond;
import com.will.emmy.model.CategoryThird;
import com.will.emmy.payload.category.CategoryTreeFist;
import com.will.emmy.payload.category.CategoryTreeSecond;
import com.will.emmy.payload.category.CategoryTreeThird;
import com.will.emmy.repository.CategoryFirstRepository;
import com.will.emmy.repository.CategorySecondRepository;
import com.will.emmy.repository.CategoryThirdRepository;
import com.will.emmy.service.CategoryService;
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
    public List<CategoryTreeFist> getCategoryTree() {

        // Fetch all categories from the repositories
        List<CategoryFist> categoryFists = firstRepository.findAll();
        List<CategorySecond> categorySeconds = secondRepository.findAll();
        List<CategoryThird> categoryThirds = thirdRepository.findAll();

        // Group the second and third level categories by their parent IDs
        Map<Long, List<CategorySecond>> secondListMap = categorySeconds.stream()
                .collect(Collectors.groupingBy(CategorySecond::getCategory1id));

        Map<Long, List<CategoryThird>> thirdListMap = categoryThirds.stream()
                .collect(Collectors.groupingBy(CategoryThird::getCategory2id));

        // Construct the category tree
        return categoryFists.stream().map(categoryFist -> {
            CategoryTreeFist categoryTreeFist = new CategoryTreeFist();
            categoryTreeFist.setLevelOneId(categoryFist.getId());
            categoryTreeFist.setLevelOneName(categoryFist.getName());

            List<CategoryTreeSecond> categoryTreeSeconds = secondListMap.getOrDefault(categoryFist.getId(), Collections.emptyList()).stream()
                    .map(categorySecond -> {
                        CategoryTreeSecond categoryTreeSecond = CategoryTreeSecond.builder()
                                .levelTwoId(categorySecond.getId())
                                .levelTwoName(categorySecond.getName())
                                .build();

                        List<CategoryTreeThird> categoryTreeThirds = thirdListMap.getOrDefault(categorySecond.getId(), Collections.emptyList()).stream()
                                .map(categoryThird -> CategoryTreeThird.builder()
                                        .levelThreeId(categoryThird.getId())
                                        .levelThreeName(categoryThird.getName())
                                        .build())
                                .collect(Collectors.toList());

                        categoryTreeSecond.setCategoryTreeThirds(categoryTreeThirds);
                        return categoryTreeSecond;
                    })
                    .collect(Collectors.toList());

            categoryTreeFist.setCategoryTreeSeconds(categoryTreeSeconds);
            return categoryTreeFist;
        }).collect(Collectors.toList());
    }
}
