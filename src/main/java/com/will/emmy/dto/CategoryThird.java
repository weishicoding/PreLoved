package com.will.emmy.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Table(name = "category_3")
@Getter
@Setter
@Entity
public class CategoryThird {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Size(min = 1, max = 30)
    private String name;

    @NotNull
    private Long category1id;

    @NotNull
    private Long category2id;

}
