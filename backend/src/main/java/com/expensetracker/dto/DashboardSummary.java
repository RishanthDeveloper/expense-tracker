package com.expensetracker.dto;

public record DashboardSummary(
        Double totalSpent,
        Double totalBudget,
        Double budgetRemaining,
        Long transactionCount,
        Double avgPerDay,
        String topCategory,
        Double topCategoryAmount
) {
}
