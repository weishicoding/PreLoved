package com.will.emmy.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.time.Instant;

@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "refresh_token")
public class RefreshToken {

    @Id
    @GeneratedValue
    private Long id;

    private String token;

    private Instant expiryDate;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @OneToOne
    @JoinColumn(name = "id")
    private User user;
}
