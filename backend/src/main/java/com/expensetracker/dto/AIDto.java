package com.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class AIDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnalysisRequest {
        private String prompt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnalysisResponse {
        private String id;
        private String prompt;
        private String responseText;
        private Integer financialScore;
        private String spendingAnalysis;
        private List<String> overspendingWarnings;
        private List<String> savingTips;
        private Integer tokensUsed;
        private LocalDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class HistoryRecord {
        private String id;
        private String prompt;
        private String response;
        private Integer tokensUsed;
        private LocalDateTime createdAt;
    }
}
