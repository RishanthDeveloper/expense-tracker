package com.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {

    private String id;
    private String email;
    private String fullName;
    private String phone;
    private String currency;
    private String timezone;
    private String avatarUrl;
    private String createdAt;
}
