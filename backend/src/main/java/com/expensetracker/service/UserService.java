package com.expensetracker.service;

import com.expensetracker.dto.UserProfileDto;
import com.expensetracker.dto.UserSettingsDto;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.User;
import com.expensetracker.model.UserProfile;
import com.expensetracker.model.UserSettings;
import com.expensetracker.repository.UserProfileRepository;
import com.expensetracker.repository.UserSettingsRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserSettingsRepository userSettingsRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserProfileDto getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseGet(() -> userProfileRepository.save(UserProfile.builder().user(user).currency("INR").build()));

        return UserProfileDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(profile.getPhone())
                .currency(profile.getCurrency() != null ? profile.getCurrency() : "INR")
                .timezone(profile.getTimezone() != null ? profile.getTimezone() : "Asia/Kolkata")
                .avatarUrl(profile.getAvatarUrl())
                .createdAt(user.getCreatedAt().toString())
                .build();
    }

    @Transactional
    public UserProfileDto updateProfile(String userId, UserProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (dto.getFullName() != null) {
            user.setFullName(dto.getFullName());
            userRepository.save(user);
        }

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseGet(() -> UserProfile.builder().user(user).build());

        if (dto.getPhone() != null) profile.setPhone(dto.getPhone());
        if (dto.getCurrency() != null) profile.setCurrency(dto.getCurrency());
        if (dto.getTimezone() != null) profile.setTimezone(dto.getTimezone());
        if (dto.getAvatarUrl() != null) profile.setAvatarUrl(dto.getAvatarUrl());

        UserProfile updated = userProfileRepository.save(profile);

        return UserProfileDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(updated.getPhone())
                .currency(updated.getCurrency())
                .timezone(updated.getTimezone())
                .avatarUrl(updated.getAvatarUrl())
                .createdAt(user.getCreatedAt().toString())
                .build();
    }

    @Transactional(readOnly = true)
    public UserSettingsDto getSettings(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserSettings settings = userSettingsRepository.findByUserId(userId)
                .orElseGet(() -> userSettingsRepository.save(UserSettings.builder().user(user).build()));

        return UserSettingsDto.builder()
                .userId(userId)
                .theme(settings.getTheme())
                .language(settings.getLanguage())
                .currency(settings.getCurrency())
                .emailNotifications(settings.getEmailNotifications())
                .pushNotifications(settings.getPushNotifications())
                .budgetAlerts(settings.getBudgetAlerts())
                .aiEnabled(settings.getAiEnabled())
                .build();
    }

    @Transactional
    public UserSettingsDto updateSettings(String userId, UserSettingsDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserSettings settings = userSettingsRepository.findByUserId(userId)
                .orElseGet(() -> UserSettings.builder().user(user).build());

        if (dto.getTheme() != null) settings.setTheme(dto.getTheme());
        if (dto.getLanguage() != null) settings.setLanguage(dto.getLanguage());
        if (dto.getCurrency() != null) settings.setCurrency(dto.getCurrency());
        if (dto.getEmailNotifications() != null) settings.setEmailNotifications(dto.getEmailNotifications());
        if (dto.getPushNotifications() != null) settings.setPushNotifications(dto.getPushNotifications());
        if (dto.getBudgetAlerts() != null) settings.setBudgetAlerts(dto.getBudgetAlerts());
        if (dto.getAiEnabled() != null) settings.setAiEnabled(dto.getAiEnabled());

        UserSettings saved = userSettingsRepository.save(settings);

        return UserSettingsDto.builder()
                .userId(userId)
                .theme(saved.getTheme())
                .language(saved.getLanguage())
                .currency(saved.getCurrency())
                .emailNotifications(saved.getEmailNotifications())
                .pushNotifications(saved.getPushNotifications())
                .budgetAlerts(saved.getBudgetAlerts())
                .aiEnabled(saved.getAiEnabled())
                .build();
    }

    @Transactional
    public void updatePassword(String userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
