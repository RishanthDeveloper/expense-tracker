package com.expensetracker.controller;

import com.expensetracker.dto.AIDto;
import com.expensetracker.security.UserPrincipal;
import com.expensetracker.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/analyze")
    public ResponseEntity<AIDto.AnalysisResponse> analyzeFinancialContext(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody(required = false) AIDto.AnalysisRequest request
    ) {
        String prompt = request != null ? request.getPrompt() : null;
        return ResponseEntity.ok(aiService.analyzeFinancialContext(currentUser.getId(), prompt));
    }

    @GetMapping("/history")
    public ResponseEntity<List<AIDto.HistoryRecord>> getHistory(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(aiService.getHistory(currentUser.getId()));
    }
}
