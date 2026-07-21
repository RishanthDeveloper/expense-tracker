package com.expensetracker.service;

import com.expensetracker.dto.AuthResponse;
import com.expensetracker.dto.SignUpRequest;
import com.expensetracker.model.User;
import com.expensetracker.repository.RefreshTokenRepository;
import com.expensetracker.repository.UserProfileRepository;
import com.expensetracker.repository.UserSettingsRepository;
import com.expensetracker.repository.UserRepository;
import com.expensetracker.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserProfileRepository userProfileRepository;

    @Mock
    private UserSettingsRepository userSettingsRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void register_ShouldSaveUserAndReturnTokens() {
        SignUpRequest request = SignUpRequest.builder()
                .email("newuser@example.com")
                .password("password123")
                .fullName("New User")
                .build();

        User savedUser = User.builder()
                .id("user-999")
                .email("newuser@example.com")
                .fullName("New User")
                .build();

        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(tokenProvider.generateTokenFromUserId("user-999", "newuser@example.com")).thenReturn("mock-access-token");
        when(refreshTokenRepository.save(any())).thenReturn(com.expensetracker.model.RefreshToken.builder().token("mock-refresh-token").build());

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mock-access-token", response.getAccessToken());
        assertEquals("newuser@example.com", response.getUser().getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
