package com.expensetracker.controller;

import com.expensetracker.dto.IncomeRequest;
import com.expensetracker.dto.IncomeResponse;
import com.expensetracker.security.UserPrincipal;
import com.expensetracker.service.IncomeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/income")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;

    @GetMapping
    public ResponseEntity<List<IncomeResponse>> getAllIncome(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(incomeService.getAllIncome(currentUser.getId()));
    }

    @PostMapping
    public ResponseEntity<IncomeResponse> createIncome(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody IncomeRequest request
    ) {
        return ResponseEntity.ok(incomeService.createIncome(currentUser.getId(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IncomeResponse> updateIncome(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable String id,
            @Valid @RequestBody IncomeRequest request
    ) {
        return ResponseEntity.ok(incomeService.updateIncome(currentUser.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable String id
    ) {
        incomeService.deleteIncome(currentUser.getId(), id);
        return ResponseEntity.noContent().build();
    }
}
