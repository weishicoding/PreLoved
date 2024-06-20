package com.will.emmy.model.personal;

import lombok.Data;

import java.util.List;

@Data
public class Cart {

    private String cartName;

    private String totalAmount;

    private List<GoodsItem> goodsItems;
}
