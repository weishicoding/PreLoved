package com.will.preloved.payload.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryTreeSecond {

    private Long levelTwoId;

    private String levelTwoName;

    private List<CategoryTreeThird> categoryTreeThirds;
}
