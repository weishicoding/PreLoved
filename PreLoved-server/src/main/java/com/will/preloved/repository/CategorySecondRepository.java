package com.will.preloved.repository;


import com.will.preloved.model.CategorySecond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorySecondRepository extends JpaRepository<CategorySecond, Long> {
}
