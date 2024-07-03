package com.will.preloved.repository;


import com.will.preloved.model.CategorySecond;
import com.will.preloved.model.CategoryThird;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryThirdRepository extends JpaRepository<CategoryThird, Long> {

    List<CategoryThird> findByCategory1id(Long categoryId);
}
