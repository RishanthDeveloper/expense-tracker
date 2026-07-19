package com.expensetracker.dto;

public record CategoryBreakdown(
        String category,
        String displayName,
        String icon,
        String color,
        Double totalSpent,
        Double budgetLimit,
        Double percentage
) {
}
