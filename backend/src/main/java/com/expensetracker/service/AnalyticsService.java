package com.expensetracker.service;

import com.expensetracker.dto.CategoryBreakdown;
import com.expensetracker.dto.DashboardSummary;
import com.expensetracker.model.Expense;
import com.expensetracker.model.Income;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    @Transactional(readOnly = true)
    public DashboardSummary getDashboardSummary(String userId) {
        List<Income> incomes = incomeRepository.findByUserIdOrderByTransactionDateDesc(userId);
        List<Expense> expenses = expenseRepository.findByUserIdOrderByTransactionDateDesc(userId);

        BigDecimal totalIncome = incomes.stream()
                .map(Income::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpenses = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSavings = totalIncome.subtract(totalExpenses);
        BigDecimal totalBalance = totalSavings;

        return DashboardSummary.builder()
                .totalBalance(totalBalance)
                .totalIncome(totalIncome)
                .totalExpenses(totalExpenses)
                .totalSavings(totalSavings)
                .build();
    }

    @Transactional(readOnly = true)
    public List<CategoryBreakdown> getCategoryBreakdown(String userId) {
        List<Expense> expenses = expenseRepository.findByUserIdOrderByTransactionDateDesc(userId);

        BigDecimal totalExpenses = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalExpenses.compareTo(BigDecimal.ZERO) == 0) {
            return Collections.emptyList();
        }

        Map<String, BigDecimal> categoryTotals = new HashMap<>();
        Map<String, String> categoryColors = new HashMap<>();

        for (Expense expense : expenses) {
            String name = expense.getCategory() != null ? expense.getCategory().getName() : "Uncategorized";
            String color = expense.getCategory() != null ? expense.getCategory().getColor() : "#64748b";

            categoryTotals.put(name, categoryTotals.getOrDefault(name, BigDecimal.ZERO).add(expense.getAmount()));
            categoryColors.put(name, color);
        }

        return categoryTotals.entrySet().stream()
                .map(entry -> {
                    double percentage = entry.getValue()
                            .divide(totalExpenses, 4, RoundingMode.HALF_UP)
                            .doubleValue() * 100;

                    return CategoryBreakdown.builder()
                            .category(entry.getKey())
                            .amount(entry.getValue())
                            .percentage(Math.round(percentage * 100.0) / 100.0)
                            .color(categoryColors.get(entry.getKey()))
                            .build();
                })
                .sorted(Comparator.comparing(CategoryBreakdown::getAmount).reversed())
                .collect(Collectors.toList());
    }
}
