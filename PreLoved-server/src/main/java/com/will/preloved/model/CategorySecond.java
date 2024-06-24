package com.will.preloved.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;



@Table(name = "category_2")
@Getter
@Setter
@Entity
public class CategorySecond {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Size(min = 1, max = 30)
    private String name;

    @NotNull
    private Long category1id;
}
