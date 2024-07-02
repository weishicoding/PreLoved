package com.will.preloved.model;

import com.will.preloved.model.audit.DateAudit;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "refresh_token")
public class RefreshToken extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private Instant expiryDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
