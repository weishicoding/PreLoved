package com.will.preloved.controller;

import com.will.preloved.enums.RoleName;
import com.will.preloved.exception.AppException;
import com.will.preloved.model.RefreshToken;
import com.will.preloved.model.Role;
import com.will.preloved.model.User;
import com.will.preloved.payload.ApiResponse;
import com.will.preloved.payload.login.JwtAuthenticationResponse;
import com.will.preloved.payload.login.LoginRequest;
import com.will.preloved.payload.login.RegisterRequest;
import com.will.preloved.repository.RoleRepository;
import com.will.preloved.repository.UserRepository;
import com.will.preloved.security.CustomUserDetail;
import com.will.preloved.security.JwtRefreshService;
import com.will.preloved.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final JwtRefreshService jwtRefreshService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateToken((CustomUserDetail)authentication.getPrincipal());
        // generate the refresh token
        var refreshToken = jwtRefreshService.genarateRefreshToken(loginRequest.getUsername());
        return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken.getToken())
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken"), HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address is already taken"), HttpStatus.BAD_REQUEST);
        }

        // create user's account
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set"));

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .username(registerRequest.getUsername())
                .roles(Collections.singleton(userRole))
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        userRepository.save(user);

        var customUserDetail = CustomUserDetail.builder()
                .username(user.getUsername())
                .build();

        String jwt = jwtService.generateToken(customUserDetail);
        // generate the refresh token
        var refreshToken = jwtRefreshService.genarateRefreshToken(user.getUsername());

        return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken.getToken())
                .build());
    }

    @PostMapping("/refreshToken/{token}")
    public ResponseEntity<?> refreshToken(@PathVariable String token) {

        return jwtRefreshService.findByToken(token)
                .map(jwtRefreshService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    var customUserDetail = CustomUserDetail.builder()
                            .username(user.getUsername())
                            .build();
                    String accessToken = jwtService.generateToken(customUserDetail);
                    return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(token)
                            .build());
                }).orElseThrow(() -> new AppException("Refresh Token is not in DB.."));
    }

}
