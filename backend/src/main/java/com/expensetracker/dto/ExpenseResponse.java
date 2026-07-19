package com.expensetracker.dto;

import com.expensetracker.model.Expense;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExpenseResponse(
        Long id,
        String title,
        Double amount,
        String category,
        String categoryDisplayName,
        String categoryIcon,
        String categoryColor,
        LocalDate date,
        String notes,
        LocalDateTime createdAt
) {
    public static ExpenseResponse from(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getTitle(),
                expense.getAmount(),
                expense.getCategory().name(),
                expense.getCategory().getDisplayName(),
                expense.getCategory().getIcon(),
                expense.getCategory().getColor(),
                expense.getDate(),
                expense.getNotes(),
                expense.getCreatedAt()
        );
    }
}
