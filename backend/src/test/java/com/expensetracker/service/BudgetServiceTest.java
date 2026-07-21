package com.expensetracker.service;

import com.expensetracker.dto.BudgetRequest;
import com.expensetracker.dto.BudgetResponse;
import com.expensetracker.model.Budget;
import com.expensetracker.model.Category;
import com.expensetracker.model.User;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BudgetServiceTest {

    @Mock
    private BudgetRepository budgetRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BudgetService budgetService;

    private User testUser;
    private Category testCategory;
    private Budget testBudget;

    @BeforeEach
    void setUp() {
        testUser = User.builder().id("user-123").email("test@example.com").build();
        testCategory = Category.builder().id("cat-1").name("Housing").type("expense").build();
        testBudget = Budget.builder()
                .id("bgt-1")
                .user(testUser)
                .category(testCategory)
                .amount(new BigDecimal("50000.00"))
                .month(7)
                .year(2026)
                .build();
    }

    @Test
    void createOrUpdateBudget_ShouldSaveAndReturnResponse() {
        BudgetRequest request = BudgetRequest.builder()
                .categoryId("cat-1")
                .amount(new BigDecimal("50000.00"))
                .month(7)
                .year(2026)
                .build();

        when(userRepository.findById("user-123")).thenReturn(Optional.of(testUser));
        when(categoryRepository.findById("cat-1")).thenReturn(Optional.of(testCategory));
        when(budgetRepository.findByUserIdAndCategoryIdAndMonthAndYear("user-123", "cat-1", 7, 2026))
                .thenReturn(Optional.empty());
        when(budgetRepository.save(any(Budget.class))).thenReturn(testBudget);
        when(expenseRepository.findByUserIdAndTransactionDateBetween(any(), any(), any()))
                .thenReturn(Collections.emptyList());

        BudgetResponse response = budgetService.createOrUpdateBudget("user-123", request);

        assertNotNull(response);
        assertEquals("bgt-1", response.getId());
        assertEquals(new BigDecimal("50000.00"), response.getBudgetAmount());
        assertEquals("Good", response.getStatus());
    }
}
