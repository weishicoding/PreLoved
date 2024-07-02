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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final JwtRefreshService jwtRefreshService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        try {
            var user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() ->
                            new UsernameNotFoundException("User not found with username: " + loginRequest.getUsername())
                    );
            if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new AppException("Invalid credentials");
            }

            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtService.generateToken((CustomUserDetail)authentication.getPrincipal());
            // generate the refresh token
            RefreshToken refreshToken = jwtRefreshService.genarateRefreshToken(user);

            // add refresh token for http-only cookie
            Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken.getId());
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(true); // Use secure cookies in production
            refreshTokenCookie.setPath("/");

            response.addCookie(refreshTokenCookie);
            return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                    .accessToken(jwt)
                    .roles(user.getRoles())
                    .refreshToken(refreshToken.getId())
                    .build());
        } catch (Exception e) {
            log.error("unauthorized", e);
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
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

            return ResponseEntity.ok("User register successfully");
        } catch (Exception e) {
            log.info("Register Failed", e);
            return new ResponseEntity<>("Register Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@CookieValue("refreshToken") String refreshToken, HttpServletRequest request) {

        try {
            return jwtRefreshService.findById(refreshToken)
                    .map(jwtRefreshService::verifyExpiration)
                    .map(RefreshToken::getUser)
                    .map(user -> {
                        var customUserDetail = CustomUserDetail.builder()
                                .username(user.getUsername())
                                .build();
                        String accessToken = jwtService.generateToken(customUserDetail);
                        return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                                .accessToken(accessToken)
                                .roles(user.getRoles())
                                .refreshToken(refreshToken)
                                .build());
                    }).orElseThrow(() -> new AppException("Refresh Token is not in DB.."));
        }catch (Exception e) {
            log.info("Refresh Token Failed", e);
            return new ResponseEntity<>("Refresh Token Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        try {
            // delete the refresh token
            jwtRefreshService.deleteById(refreshToken);
            // Clear the refresh token cookie
            Cookie cookie = new Cookie("refreshToken", null);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
            return ResponseEntity.ok("Logout successfully");
        } catch (Exception e) {
            log.info("Logout failed", e);
            return new ResponseEntity<>("Logout failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
