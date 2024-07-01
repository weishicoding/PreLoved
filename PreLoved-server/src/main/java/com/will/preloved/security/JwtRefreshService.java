package com.will.preloved.security;

import com.will.preloved.exception.AppException;
import com.will.preloved.model.RefreshToken;
import com.will.preloved.model.User;
import com.will.preloved.repository.RefreshTokenRepository;
import com.will.preloved.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtRefreshService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.refreshTokenExpirationInMs}")
    private long refreshTokenExpirationInMs;

    @Transactional
    public RefreshToken genarateRefreshToken(User user) {

        var refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString().replace("-", ""))
                .expiryDate(Instant.now().plusMillis(refreshTokenExpirationInMs))
                .build();
        return refreshTokenRepository.save(refreshToken);

    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new AppException(" Refresh token is expired. Please make a new login..");
        }
        return token;
    }
}
