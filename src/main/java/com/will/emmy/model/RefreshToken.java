package com.will.emmy.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue
    private Long id;

    private String token;

    private Instant expiryDate;

    @OneToOne
    @JoinColumn(name = "id")
    private User user;
}
