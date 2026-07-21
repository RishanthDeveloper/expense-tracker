package com.expensetracker.controller;

import com.expensetracker.model.Category;
import com.expensetracker.security.UserPrincipal;
import com.expensetracker.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(@AuthenticationPrincipal UserPrincipal currentUser) {
        String userId = currentUser != null ? currentUser.getId() : "default";
        return ResponseEntity.ok(categoryService.getAllCategories(userId));
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody Category category
    ) {
        return ResponseEntity.ok(categoryService.createCategory(currentUser.getId(), category));
    }
}
