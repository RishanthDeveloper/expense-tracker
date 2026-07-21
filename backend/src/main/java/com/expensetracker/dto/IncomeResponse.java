package com.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncomeResponse {

    private String id;
    private BigDecimal amount;
    private String categoryId;
    private String categoryName;
    private String description;
    private LocalDate transactionDate;
    private LocalDateTime createdAt;
}
