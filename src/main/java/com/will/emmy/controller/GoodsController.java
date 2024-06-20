package com.will.emmy.controller;

import com.will.emmy.dto.Goods;
import com.will.emmy.exception.ResourceNotFoundException;
import com.will.emmy.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/goods")
public class GoodsController {

    @Autowired
    private GoodsRepository goodsRepository;

    @GetMapping("/getAllGoods")
    public Page<Goods> getAllGoods(Pageable pageable) {
        return goodsRepository.findAll(pageable);
    }

    @GetMapping("/getGoodsById/{id}")
    public List<Goods> getGoodsById(@PathVariable Long id) {
        return goodsRepository.getGoodsById(id);
    }

    @PostMapping("/saveGoods")
    public Goods createQuestion(@Valid @RequestBody Goods Goods) {
        return goodsRepository.save(Goods);
    }

    @PutMapping("/updateGoodsById/{id}")
    public Goods updateQuestion(@PathVariable Long id,
                                   @Valid @RequestBody Goods Goods) {
        return goodsRepository.findById(id)
                .map(goods -> {
                    goods.setGoodsName(Goods.getGoodsName());
                    goods.setGoodsDescription(Goods.getGoodsDescription());
                    return goodsRepository.save(goods);
                }).orElseThrow(() -> new ResourceNotFoundException("Goods not found with id " + id));
    }

    @DeleteMapping("/deleteGoodsById/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        return goodsRepository.findById(id)
                .map(goods -> {
                    goodsRepository.delete(goods);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Goods not found with id " + id));
    }
}
