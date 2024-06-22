package com.will.emmy.security;

import com.will.emmy.exception.AppException;
import com.will.emmy.model.RefreshToken;
import com.will.emmy.model.User;
import com.will.emmy.repository.RefreshTokenRepository;
import com.will.emmy.repository.UserRepository;
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

    private final UserRepository userRepository;

    @Value("${app.refreshTokenExpirationInMs}")
    private long refreshTokenExpirationInMs;

    public RefreshToken genarateRefreshToken(String username) {

        var user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email : " + username)
                );

        var refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshTokenExpirationInMs))
                .build();
        return refreshTokenRepository.save(refreshToken);

    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new AppException(" Refresh token is expired. Please make a new login..");
        }
        return token;
    }
}
