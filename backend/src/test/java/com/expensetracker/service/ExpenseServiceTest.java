package com.expensetracker.service;

import com.expensetracker.dto.ExpenseRequest;
import com.expensetracker.dto.ExpenseResponse;
import com.expensetracker.model.Category;
import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
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
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ExpenseService expenseService;

    private User testUser;
    private Category testCategory;
    private Expense testExpense;

    @BeforeEach
    void setUp() {
        testUser = User.builder().id("user-123").email("test@example.com").fullName("Test User").build();
        testCategory = Category.builder().id("cat-1").name("Housing & Rent").type("expense").build();
        testExpense = Expense.builder()
                .id("exp-1")
                .user(testUser)
                .category(testCategory)
                .amount(new BigDecimal("45000.00"))
                .description("Monthly Rent")
                .transactionDate(LocalDate.now())
                .build();
    }

    @Test
    void getAllExpenses_ShouldReturnExpenseResponses() {
        when(expenseRepository.findByUserIdOrderByTransactionDateDesc("user-123")).thenReturn(List.of(testExpense));

        List<ExpenseResponse> responses = expenseService.getAllExpenses("user-123");

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("exp-1", responses.get(0).getId());
        assertEquals(new BigDecimal("45000.00"), responses.get(0).getAmount());
    }

    @Test
    void createExpense_ShouldSaveAndReturnExpense() {
        ExpenseRequest request = ExpenseRequest.builder()
                .amount(new BigDecimal("45000.00"))
                .categoryId("cat-1")
                .description("Monthly Rent")
                .transactionDate(LocalDate.now())
                .build();

        when(userRepository.findById("user-123")).thenReturn(Optional.of(testUser));
        when(categoryRepository.findById("cat-1")).thenReturn(Optional.of(testCategory));
        when(expenseRepository.save(any(Expense.class))).thenReturn(testExpense);

        ExpenseResponse response = expenseService.createExpense("user-123", request);

        assertNotNull(response);
        assertEquals("exp-1", response.getId());
        verify(expenseRepository, times(1)).save(any(Expense.class));
    }
}
