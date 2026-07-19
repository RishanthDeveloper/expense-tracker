package com.expensetracker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record BudgetRequest(
        @NotNull(message = "Monthly limit is required")
        @Positive(message = "Monthly limit must be positive")
        Double monthlyLimit
) {
}
