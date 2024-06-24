package com.will.emmy.service;



import com.will.emmy.payload.category.CategoryTreeFist;

import java.util.List;

public interface CategoryService {

    List<CategoryTreeFist> getCategoryTree();
}
