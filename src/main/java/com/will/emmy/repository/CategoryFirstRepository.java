package com.will.emmy.repository;


import com.will.emmy.model.CategoryFist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryFirstRepository extends JpaRepository<CategoryFist, Long> {
}