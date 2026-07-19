package com.expensetracker.service;

import com.expensetracker.dto.ExpenseRequest;
import com.expensetracker.dto.ExpenseResponse;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.Category;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<ExpenseResponse> getAllExpenses(String category, String from, String to, String search) {
        List<Expense> expenses;

        Category cat = (category != null && !category.isBlank()) ? Category.fromString(category) : null;
        LocalDate fromDate = (from != null && !from.isBlank()) ? LocalDate.parse(from) : null;
        LocalDate toDate = (to != null && !to.isBlank()) ? LocalDate.parse(to) : null;

        if (cat != null && fromDate != null && toDate != null) {
            expenses = expenseRepository.findByCategoryAndDateBetween(cat, fromDate, toDate);
        } else if (cat != null) {
            expenses = expenseRepository.findByCategory(cat);
        } else if (fromDate != null && toDate != null) {
            expenses = expenseRepository.findByDateBetween(fromDate, toDate);
        } else if (search != null && !search.isBlank()) {
            expenses = expenseRepository.findByTitleContainingIgnoreCase(search);
        } else {
            expenses = expenseRepository.findAll();
        }

        return expenses.stream()
                .map(ExpenseResponse::from)
                .collect(Collectors.toList());
    }

    public ExpenseResponse getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        return ExpenseResponse.from(expense);
    }

    public ExpenseResponse createExpense(ExpenseRequest request) {
        Expense expense = Expense.builder()
                .title(request.title())
                .amount(request.amount())
                .category(Category.fromString(request.category()))
                .date(LocalDate.parse(request.date()))
                .notes(request.notes())
                .build();

        Expense saved = expenseRepository.save(expense);
        return ExpenseResponse.from(saved);
    }

    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        expense.setTitle(request.title());
        expense.setAmount(request.amount());
        expense.setCategory(Category.fromString(request.category()));
        expense.setDate(LocalDate.parse(request.date()));
        expense.setNotes(request.notes());

        Expense updated = expenseRepository.save(expense);
        return ExpenseResponse.from(updated);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }

    public List<ExpenseResponse> getRecentExpenses() {
        return expenseRepository.findTop5ByOrderByDateDescIdDesc()
                .stream()
                .map(ExpenseResponse::from)
                .collect(Collectors.toList());
    }
}
