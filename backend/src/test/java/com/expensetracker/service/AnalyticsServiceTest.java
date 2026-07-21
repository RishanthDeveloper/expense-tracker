package com.expensetracker.service;

import com.expensetracker.dto.DashboardSummary;
import com.expensetracker.model.Expense;
import com.expensetracker.model.Income;
import com.expensetracker.model.User;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.IncomeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AnalyticsServiceTest {

    @Mock
    private IncomeRepository incomeRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private BudgetRepository budgetRepository;

    @InjectMocks
    private AnalyticsService analyticsService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = User.builder().id("user-123").email("test@example.com").build();
    }

    @Test
    void getDashboardSummary_ShouldCalculateTotalsCorrectly() {
        Income inc = Income.builder().user(testUser).amount(new BigDecimal("250000.00")).build();
        Expense exp = Expense.builder().user(testUser).amount(new BigDecimal("100150.00")).build();

        when(incomeRepository.findByUserIdOrderByTransactionDateDesc("user-123")).thenReturn(List.of(inc));
        when(expenseRepository.findByUserIdOrderByTransactionDateDesc("user-123")).thenReturn(List.of(exp));

        DashboardSummary summary = analyticsService.getDashboardSummary("user-123");

        assertNotNull(summary);
        assertEquals(new BigDecimal("250000.00"), summary.getTotalIncome());
        assertEquals(new BigDecimal("100150.00"), summary.getTotalExpenses());
        assertEquals(new BigDecimal("149850.00"), summary.getTotalSavings());
    }
}
