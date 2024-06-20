package com.will.emmy.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.util.Date;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@JsonIgnoreProperties(value = {"createAt", "updateAt"}, allowGetters = true)
@Getter
@Setter
public abstract class Audit implements Serializable {

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at", nullable = false, updatable = false)
    private Date createAt;

    @LastModifiedDate
    @Column(name = "update_at", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date updateAt;

}
