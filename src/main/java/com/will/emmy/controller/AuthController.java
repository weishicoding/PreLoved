package com.will.emmy.controller;

import com.will.emmy.enums.RoleName;
import com.will.emmy.exception.AppException;
import com.will.emmy.model.RefreshToken;
import com.will.emmy.model.Role;
import com.will.emmy.model.User;
import com.will.emmy.payload.ApiResponse;
import com.will.emmy.payload.login.JwtAuthenticationResponse;
import com.will.emmy.payload.login.LoginRequest;
import com.will.emmy.payload.login.RegisterRequest;
import com.will.emmy.repository.RoleRepository;
import com.will.emmy.repository.UserRepository;
import com.will.emmy.security.CustomUserDetail;
import com.will.emmy.security.JwtRefreshService;
import com.will.emmy.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.net.URI;
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
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateToken((CustomUserDetail)authentication.getPrincipal());
        return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                .accessToken(jwt)
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUserName())) {
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
                .username(registerRequest.getUserName())
                .roles(Collections.singleton(userRole))
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/user/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User register successfully"));
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
