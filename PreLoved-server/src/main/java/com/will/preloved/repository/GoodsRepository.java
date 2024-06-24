package com.will.preloved.repository;


import com.will.preloved.model.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long> {

    List<Goods> getGoodsById(Long id);
}
