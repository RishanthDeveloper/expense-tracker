package com.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettingsDto {

    private String userId;
    private String theme;
    private String language;
    private String currency;
    private Boolean emailNotifications;
    private Boolean pushNotifications;
    private Boolean budgetAlerts;
    private Boolean aiEnabled;
}
