package com.expensetracker.service;

import com.expensetracker.dto.BudgetRequest;
import com.expensetracker.dto.BudgetResponse;
import com.expensetracker.model.Budget;
import com.expensetracker.model.Category;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;

    public BudgetService(BudgetRepository budgetRepository, ExpenseRepository expenseRepository) {
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
    }

    public List<BudgetResponse> getAllBudgets() {
        YearMonth currentMonth = YearMonth.now();
        LocalDate start = currentMonth.atDay(1);
        LocalDate end = currentMonth.atEndOfMonth();

        return budgetRepository.findAll().stream()
                .map(budget -> {
                    Double spent = expenseRepository.sumAmountByCategoryAndDateBetween(
                            budget.getCategory(), start, end);
                    return BudgetResponse.from(budget, spent);
                })
                .collect(Collectors.toList());
    }

    public BudgetResponse setBudget(String categoryStr, BudgetRequest request) {
        Category category = Category.fromString(categoryStr);

        Budget budget = budgetRepository.findByCategory(category)
                .orElse(Budget.builder().category(category).build());

        budget.setMonthlyLimit(request.monthlyLimit());
        Budget saved = budgetRepository.save(budget);

        YearMonth currentMonth = YearMonth.now();
        LocalDate start = currentMonth.atDay(1);
        LocalDate end = currentMonth.atEndOfMonth();
        Double spent = expenseRepository.sumAmountByCategoryAndDateBetween(category, start, end);

        return BudgetResponse.from(saved, spent);
    }
}
