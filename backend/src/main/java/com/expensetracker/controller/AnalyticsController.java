package com.expensetracker.controller;

import com.expensetracker.dto.CategoryBreakdown;
import com.expensetracker.dto.DashboardSummary;
import com.expensetracker.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummary> getDashboardSummary() {
        return ResponseEntity.ok(analyticsService.getDashboardSummary());
    }

    @GetMapping("/category-breakdown")
    public ResponseEntity<List<CategoryBreakdown>> getCategoryBreakdown() {
        return ResponseEntity.ok(analyticsService.getCategoryBreakdown());
    }

    @GetMapping("/monthly-trend")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyTrend() {
        return ResponseEntity.ok(analyticsService.getMonthlyTrend());
    }

    @GetMapping("/daily-spending")
    public ResponseEntity<List<Map<String, Object>>> getDailySpending() {
        return ResponseEntity.ok(analyticsService.getDailySpending());
    }
}
