package com.expensetracker.service;

import com.expensetracker.dto.ExpenseRequest;
import com.expensetracker.dto.ExpenseResponse;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.Category;
import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ExpenseResponse> getAllExpenses(String userId) {
        return expenseRepository.findByUserIdOrderByTransactionDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExpenseResponse createExpense(String userId, ExpenseRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        } else if (request.getCategoryName() != null) {
            category = categoryRepository.findByUserIdAndNameAndType(userId, request.getCategoryName(), "expense")
                    .orElseGet(() -> categoryRepository.save(Category.builder().user(user).name(request.getCategoryName()).type("expense").build()));
        }

        Expense expense = Expense.builder()
                .user(user)
                .category(category)
                .amount(request.getAmount())
                .description(request.getDescription())
                .paymentMethod(request.getPaymentMethod())
                .receiptUrl(request.getReceiptUrl())
                .transactionDate(request.getTransactionDate())
                .build();

        Expense saved = expenseRepository.save(expense);
        return mapToResponse(saved);
    }

    @Transactional
    public ExpenseResponse updateExpense(String userId, String id, ExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to resource");
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            expense.setCategory(category);
        }

        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        if (request.getPaymentMethod() != null) expense.setPaymentMethod(request.getPaymentMethod());
        if (request.getReceiptUrl() != null) expense.setReceiptUrl(request.getReceiptUrl());
        expense.setTransactionDate(request.getTransactionDate());

        Expense saved = expenseRepository.save(expense);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteExpense(String userId, String id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to resource");
        }

        expenseRepository.delete(expense);
    }

    private ExpenseResponse mapToResponse(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .amount(expense.getAmount())
                .categoryId(expense.getCategory() != null ? expense.getCategory().getId() : null)
                .categoryName(expense.getCategory() != null ? expense.getCategory().getName() : "General Expense")
                .description(expense.getDescription())
                .paymentMethod(expense.getPaymentMethod())
                .receiptUrl(expense.getReceiptUrl())
                .transactionDate(expense.getTransactionDate())
                .createdAt(expense.getCreatedAt())
                .build();
    }
}
