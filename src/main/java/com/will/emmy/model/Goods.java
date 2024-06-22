package com.will.emmy.model;

import com.will.emmy.model.audit.DateAudit;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Table(name = "goods")
@Entity
@Getter
@Setter
public class Goods extends DateAudit {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Size(min = 1, max = 30)
    private String goodsName;

    @Column(columnDefinition = "text")
    private String goodsDescription;
}
