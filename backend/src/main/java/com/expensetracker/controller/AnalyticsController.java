package com.expensetracker.controller;

import com.expensetracker.dto.CategoryBreakdown;
import com.expensetracker.dto.DashboardSummary;
import com.expensetracker.security.UserPrincipal;
import com.expensetracker.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummary> getDashboardSummary(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(analyticsService.getDashboardSummary(currentUser.getId()));
    }

    @GetMapping("/category-breakdown")
    public ResponseEntity<List<CategoryBreakdown>> getCategoryBreakdown(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(analyticsService.getCategoryBreakdown(currentUser.getId()));
    }
}
