package com.will.emmy.repository;


import com.will.emmy.model.CategoryThird;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryThirdRepository extends JpaRepository<CategoryThird, Long> {
}
