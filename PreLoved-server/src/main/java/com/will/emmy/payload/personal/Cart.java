package com.will.emmy.payload.personal;

import lombok.Data;

import java.util.List;

@Data
public class Cart {

    private String cartName;

    private String totalAmount;

    private List<GoodsItem> goodsItems;
}
