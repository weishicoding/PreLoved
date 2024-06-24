package com.will.preloved.repository;


import com.will.preloved.model.CategoryFist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryFirstRepository extends JpaRepository<CategoryFist, Long> {
}
