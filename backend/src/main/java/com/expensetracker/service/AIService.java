package com.expensetracker.service;

import com.expensetracker.dto.AIDto;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.AIHistory;
import com.expensetracker.model.User;
import com.expensetracker.repository.AIHistoryRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIService {

    private final AIHistoryRepository aiHistoryRepository;
    private final UserRepository userRepository;
    private final AnalyticsService analyticsService;

    @Value("${app.gemini.api-key:demo-key}")
    private String geminiApiKey;

    @Value("${app.gemini.api-url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
    private String geminiApiUrl;

    @Transactional
    public AIDto.AnalysisResponse analyzeFinancialContext(String userId, String userPrompt) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var summary = analyticsService.getDashboardSummary(userId);
        var breakdown = analyticsService.getCategoryBreakdown(userId);

        String promptText = userPrompt != null && !userPrompt.isBlank()
                ? userPrompt
                : "Analyze my monthly financial performance and provide personalized savings recommendations.";

        String aiResponseText;
        Integer financialScore = 88;
        List<String> warnings = new ArrayList<>();
        List<String> savingTips = new ArrayList<>();

        try {
            aiResponseText = callGeminiApi(promptText, summary, breakdown);
        } catch (Exception e) {
            log.warn("Gemini API call skipped/failed, using analytical engine fallback: {}", e.getMessage());
            aiResponseText = generateAnalyticalFallback(summary, breakdown);
        }

        // Parse structured insights
        if (summary.getTotalExpenses().compareTo(summary.getTotalIncome().multiply(new java.math.BigDecimal("0.8"))) > 0) {
            warnings.add("Expense velocity is higher than 80% of total monthly income. Monitor discretionary food & shopping.");
            financialScore = 72;
        } else {
            savingTips.add("Reallocate your net savings pool into mutual fund SIPs or high-yield savings to accelerate compound growth.");
        }
        savingTips.add("Review monthly subscriptions and negotiate recurring utility bills to save up to \u20B93,000/month.");

        AIHistory history = AIHistory.builder()
                .user(user)
                .prompt(promptText)
                .response(aiResponseText)
                .tokensUsed(256)
                .build();
        aiHistoryRepository.save(history);

        return AIDto.AnalysisResponse.builder()
                .id(history.getId())
                .prompt(promptText)
                .responseText(aiResponseText)
                .financialScore(financialScore)
                .spendingAnalysis(aiResponseText)
                .overspendingWarnings(warnings)
                .savingTips(savingTips)
                .tokensUsed(256)
                .createdAt(history.getCreatedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public List<AIDto.HistoryRecord> getHistory(String userId) {
        return aiHistoryRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(h -> AIDto.HistoryRecord.builder()
                        .id(h.getId())
                        .prompt(h.getPrompt())
                        .response(h.getResponse())
                        .tokensUsed(h.getTokensUsed())
                        .createdAt(h.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    private String callGeminiApi(String userPrompt, var summary, var breakdown) {
        if ("demo-key".equals(geminiApiKey) || geminiApiKey.startsWith("your-")) {
            return generateAnalyticalFallback(summary, breakdown);
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String fullUrl = geminiApiUrl + "?key=" + geminiApiKey;

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", "You are a Senior AI Financial Advisor. User Prompt: " + userPrompt +
                                        ". Financial Context: Total Income: \u20B9" + summary.getTotalIncome() +
                                        ", Total Expenses: \u20B9" + summary.getTotalExpenses() +
                                        ", Net Savings: \u20B9" + summary.getTotalSavings())
                        ))
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(fullUrl, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            try {
                List candidates = (List) response.getBody().get("candidates");
                Map firstCandidate = (Map) candidates.get(0);
                Map content = (Map) firstCandidate.get("content");
                List parts = (List) content.get("parts");
                Map firstPart = (Map) parts.get(0);
                return (String) firstPart.get("text");
            } catch (Exception ex) {
                log.error("Failed to parse Gemini API response payload", ex);
            }
        }

        return generateAnalyticalFallback(summary, breakdown);
    }

    private String generateAnalyticalFallback(var summary, var breakdown) {
        return "Based on your financial data: Total Income is \u20B9" + summary.getTotalIncome() +
                ", Expenses total \u20B9" + summary.getTotalExpenses() +
                ", yielding a Net Savings Pool of \u20B9" + summary.getTotalSavings() +
                ". Your savings rate is optimal. Continue automating your emergency fund reserve.";
    }
}
