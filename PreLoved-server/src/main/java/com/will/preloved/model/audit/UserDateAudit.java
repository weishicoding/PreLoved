package com.will.preloved.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy", "updatedBy"},
        allowGetters = true
)
@Setter
@Getter
public class UserDateAudit extends DateAudit{

    @CreatedBy
    private Long createdBy;

    @LastModifiedBy
    private Long updatedBy;
}
