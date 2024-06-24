package com.will.preloved.controller;


import com.will.preloved.payload.category.CategoryTreeFist;
import com.will.preloved.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoriesController {

    @Autowired
    private CategoryService service;

    @GetMapping("/getCategoryTree")
    public List<CategoryTreeFist> getCategoryBar() {
        return service.getCategoryTree();
    }
}
