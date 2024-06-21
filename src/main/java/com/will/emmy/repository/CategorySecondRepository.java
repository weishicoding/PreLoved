package com.will.emmy.repository;


import com.will.emmy.model.CategorySecond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorySecondRepository extends JpaRepository<CategorySecond, Long> {
}
