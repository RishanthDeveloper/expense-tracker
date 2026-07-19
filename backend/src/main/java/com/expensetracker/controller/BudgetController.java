package com.expensetracker.controller;

import com.expensetracker.dto.BudgetRequest;
import com.expensetracker.dto.BudgetResponse;
import com.expensetracker.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<List<BudgetResponse>> getAllBudgets() {
        return ResponseEntity.ok(budgetService.getAllBudgets());
    }

    @PutMapping("/{category}")
    public ResponseEntity<BudgetResponse> setBudget(@PathVariable String category,
                                                     @Valid @RequestBody BudgetRequest request) {
        return ResponseEntity.ok(budgetService.setBudget(category, request));
    }
}
