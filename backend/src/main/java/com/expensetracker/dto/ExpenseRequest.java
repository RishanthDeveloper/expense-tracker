package com.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ExpenseRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 100, message = "Title must be at most 100 characters")
        String title,

        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be positive")
        Double amount,

        @NotBlank(message = "Category is required")
        String category,

        @NotBlank(message = "Date is required")
        String date,

        @Size(max = 500, message = "Notes must be at most 500 characters")
        String notes
) {
}
