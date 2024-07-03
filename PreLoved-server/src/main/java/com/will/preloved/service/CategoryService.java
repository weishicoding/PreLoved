package com.will.preloved.service;



import com.will.preloved.payload.category.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getCategoryTree(Long categoryId);

    List<Category> getCategoryFirst();
}
