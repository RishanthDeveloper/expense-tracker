package com.expensetracker.dto;

import com.expensetracker.model.Budget;

public record BudgetResponse(
        Long id,
        String category,
        String categoryDisplayName,
        String categoryIcon,
        String categoryColor,
        Double monthlyLimit,
        Double spent,
        Double percentage
) {
    public static BudgetResponse from(Budget budget, Double spent) {
        double spentAmount = spent != null ? spent : 0.0;
        double pct = budget.getMonthlyLimit() > 0
                ? Math.round((spentAmount / budget.getMonthlyLimit()) * 10000.0) / 100.0
                : 0.0;
        return new BudgetResponse(
                budget.getId(),
                budget.getCategory().name(),
                budget.getCategory().getDisplayName(),
                budget.getCategory().getIcon(),
                budget.getCategory().getColor(),
                budget.getMonthlyLimit(),
                spentAmount,
                pct
        );
    }
}
