package com.expensetracker.controller;

import com.expensetracker.model.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @GetMapping
    public ResponseEntity<List<Map<String, String>>> getAllCategories() {
        List<Map<String, String>> categories = new ArrayList<>();
        for (Category category : Category.values()) {
            Map<String, String> entry = new LinkedHashMap<>();
            entry.put("name", category.name());
            entry.put("displayName", category.getDisplayName());
            entry.put("icon", category.getIcon());
            entry.put("color", category.getColor());
            categories.add(entry);
        }
        return ResponseEntity.ok(categories);
    }
}
