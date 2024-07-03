package com.will.preloved.controller;


import com.will.preloved.payload.category.Category;
import com.will.preloved.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoriesController {

    @Autowired
    private CategoryService service;

    @GetMapping("/getCategoryFirst")
    public List<Category> getCategoryFirst() {
        return service.getCategoryFirst();
    }

    @GetMapping("/getCategoryByMenuId")
    public List<Category> getCategoryByMenuId(@Param("categoryId") Long categoryId) {
        return service.getCategoryTree(categoryId);
    }
}
