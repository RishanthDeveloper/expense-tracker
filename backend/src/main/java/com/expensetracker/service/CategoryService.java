package com.expensetracker.service;

import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.Category;
import com.expensetracker.model.User;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Category> getAllCategories(String userId) {
        List<Category> categories = categoryRepository.findByUserOrGlobal(userId);
        if (categories.isEmpty()) {
            // Seed default global categories if database is empty
            seedDefaultCategories();
            return categoryRepository.findByUserOrGlobal(userId);
        }
        return categories;
    }

    @Transactional
    public Category createCategory(String userId, Category category) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        category.setUser(user);
        return categoryRepository.save(category);
    }

    private void seedDefaultCategories() {
        List<Category> defaults = List.of(
                Category.builder().name("Salary & Wages").type("income").icon("wallet").color("emerald").build(),
                Category.builder().name("Freelance Consulting").type("income").icon("briefcase").color("indigo").build(),
                Category.builder().name("Investments & Dividends").type("income").icon("trending-up").color("teal").build(),
                Category.builder().name("Housing & Rent").type("expense").icon("home").color("emerald").build(),
                Category.builder().name("Food & Groceries").type("expense").icon("shopping-cart").color("indigo").build(),
                Category.builder().name("Utilities & Bills").type("expense").icon("zap").color("teal").build(),
                Category.builder().name("Shopping & Apparel").type("expense").icon("tag").color("amber").build(),
                Category.builder().name("Transport & Fuel").type("expense").icon("car").color("red").build()
        );
        categoryRepository.saveAll(defaults);
    }
}
