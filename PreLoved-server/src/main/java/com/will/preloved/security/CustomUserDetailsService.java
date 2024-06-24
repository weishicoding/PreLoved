package com.will.preloved.security;

import com.will.preloved.model.User;
import com.will.preloved.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        // Let people login with either username or email
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email : " + userName)
                );
        return CustomUserDetail.create(user);
    }
}
