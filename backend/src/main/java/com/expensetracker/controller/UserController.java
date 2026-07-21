package com.expensetracker.controller;

import com.expensetracker.dto.UserProfileDto;
import com.expensetracker.dto.UserSettingsDto;
import com.expensetracker.security.UserPrincipal;
import com.expensetracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(userService.getProfile(currentUser.getId()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateProfile(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody UserProfileDto dto
    ) {
        return ResponseEntity.ok(userService.updateProfile(currentUser.getId(), dto));
    }

    @GetMapping("/settings")
    public ResponseEntity<UserSettingsDto> getSettings(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(userService.getSettings(currentUser.getId()));
    }

    @PutMapping("/settings")
    public ResponseEntity<UserSettingsDto> updateSettings(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody UserSettingsDto dto
    ) {
        return ResponseEntity.ok(userService.updateSettings(currentUser.getId(), dto));
    }

    @PostMapping("/password")
    public ResponseEntity<Map<String, String>> updatePassword(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody Map<String, String> body
    ) {
        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters"));
        }
        userService.updatePassword(currentUser.getId(), newPassword);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}
