package com.expensetracker.service;

import com.expensetracker.dto.IncomeRequest;
import com.expensetracker.dto.IncomeResponse;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.Category;
import com.expensetracker.model.Income;
import com.expensetracker.model.User;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.repository.IncomeRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<IncomeResponse> getAllIncome(String userId) {
        return incomeRepository.findByUserIdOrderByTransactionDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public IncomeResponse createIncome(String userId, IncomeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        } else if (request.getCategoryName() != null) {
            category = categoryRepository.findByUserIdAndNameAndType(userId, request.getCategoryName(), "income")
                    .orElseGet(() -> categoryRepository.save(Category.builder().user(user).name(request.getCategoryName()).type("income").build()));
        }

        Income income = Income.builder()
                .user(user)
                .category(category)
                .amount(request.getAmount())
                .description(request.getDescription())
                .transactionDate(request.getTransactionDate())
                .build();

        Income saved = incomeRepository.save(income);
        return mapToResponse(saved);
    }

    @Transactional
    public IncomeResponse updateIncome(String userId, String id, IncomeRequest request) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found with id: " + id));

        if (!income.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to resource");
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            income.setCategory(category);
        }

        income.setAmount(request.getAmount());
        income.setDescription(request.getDescription());
        income.setTransactionDate(request.getTransactionDate());

        Income saved = incomeRepository.save(income);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteIncome(String userId, String id) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found with id: " + id));

        if (!income.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to resource");
        }

        incomeRepository.delete(income);
    }

    private IncomeResponse mapToResponse(Income income) {
        return IncomeResponse.builder()
                .id(income.getId())
                .amount(income.getAmount())
                .categoryId(income.getCategory() != null ? income.getCategory().getId() : null)
                .categoryName(income.getCategory() != null ? income.getCategory().getName() : "General Income")
                .description(income.getDescription())
                .transactionDate(income.getTransactionDate())
                .createdAt(income.getCreatedAt())
                .build();
    }
}
