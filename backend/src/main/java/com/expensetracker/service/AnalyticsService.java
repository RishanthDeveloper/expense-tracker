package com.expensetracker.service;

import com.expensetracker.dto.CategoryBreakdown;
import com.expensetracker.dto.DashboardSummary;
import com.expensetracker.model.Budget;
import com.expensetracker.model.Category;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    public AnalyticsService(ExpenseRepository expenseRepository, BudgetRepository budgetRepository) {
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
    }

    public DashboardSummary getDashboardSummary() {
        YearMonth currentMonth = YearMonth.now();
        LocalDate start = currentMonth.atDay(1);
        LocalDate end = currentMonth.atEndOfMonth();

        Double totalSpent = expenseRepository.sumAmountByDateBetween(start, end);
        long transactionCount = expenseRepository.countByDateBetween(start, end);

        // Calculate total budget
        double totalBudget = budgetRepository.findAll().stream()
                .mapToDouble(Budget::getMonthlyLimit)
                .sum();
        double budgetRemaining = totalBudget - totalSpent;

        // Average per day (days elapsed in the month so far)
        int daysElapsed = Math.max(1, LocalDate.now().getDayOfMonth());
        double avgPerDay = Math.round((totalSpent / daysElapsed) * 100.0) / 100.0;

        // Top category
        List<Object[]> breakdown = expenseRepository.getCategoryBreakdown(start, end);
        String topCategory = null;
        Double topCategoryAmount = 0.0;

        for (Object[] row : breakdown) {
            Category cat = (Category) row[0];
            Double amount = (Double) row[1];
            if (amount > topCategoryAmount) {
                topCategory = cat.getDisplayName();
                topCategoryAmount = amount;
            }
        }

        return new DashboardSummary(
                Math.round(totalSpent * 100.0) / 100.0,
                Math.round(totalBudget * 100.0) / 100.0,
                Math.round(budgetRemaining * 100.0) / 100.0,
                transactionCount,
                avgPerDay,
                topCategory,
                Math.round(topCategoryAmount * 100.0) / 100.0
        );
    }

    public List<CategoryBreakdown> getCategoryBreakdown() {
        YearMonth currentMonth = YearMonth.now();
        LocalDate start = currentMonth.atDay(1);
        LocalDate end = currentMonth.atEndOfMonth();

        List<Object[]> breakdownData = expenseRepository.getCategoryBreakdown(start, end);
        Double totalSpent = expenseRepository.sumAmountByDateBetween(start, end);

        return breakdownData.stream()
                .map(row -> {
                    Category cat = (Category) row[0];
                    Double spent = (Double) row[1];
                    Double budgetLimit = budgetRepository.findByCategory(cat)
                            .map(Budget::getMonthlyLimit)
                            .orElse(0.0);
                    double percentage = totalSpent > 0
                            ? Math.round((spent / totalSpent) * 10000.0) / 100.0
                            : 0.0;
                    return new CategoryBreakdown(
                            cat.name(),
                            cat.getDisplayName(),
                            cat.getIcon(),
                            cat.getColor(),
                            Math.round(spent * 100.0) / 100.0,
                            budgetLimit,
                            percentage
                    );
                })
                .sorted((a, b) -> Double.compare(b.totalSpent(), a.totalSpent()))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getMonthlyTrend() {
        List<Object[]> monthlyData = expenseRepository.getMonthlyTotals();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : monthlyData) {
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("month", row[0] != null ? row[0].toString() : "Unknown");
            entry.put("total", row[1] != null ? ((Number) row[1]).doubleValue() : 0.0);
            result.add(entry);
        }

        return result;
    }

    public List<Map<String, Object>> getDailySpending() {
        YearMonth currentMonth = YearMonth.now();
        String start = currentMonth.atDay(1).toString();
        String end = currentMonth.atEndOfMonth().toString();

        List<Object[]> dailyData = expenseRepository.getDailyTotals(start, end);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : dailyData) {
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("date", row[0] != null ? row[0].toString() : "Unknown");
            entry.put("total", row[1] != null ? ((Number) row[1]).doubleValue() : 0.0);
            result.add(entry);
        }

        return result;
    }
}
