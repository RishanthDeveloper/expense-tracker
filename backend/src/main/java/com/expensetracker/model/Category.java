package com.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum Category {

    FOOD("Food", "fa-utensils", "#EF4444"),
    TRANSPORT("Transport", "fa-car", "#3B82F6"),
    SHOPPING("Shopping", "fa-cart-shopping", "#8B5CF6"),
    ENTERTAINMENT("Entertainment", "fa-film", "#EC4899"),
    BILLS("Bills", "fa-file-invoice-dollar", "#F59E0B"),
    HEALTH("Health", "fa-heart-pulse", "#10B981"),
    EDUCATION("Education", "fa-graduation-cap", "#06B6D4"),
    OTHER("Other", "fa-ellipsis", "#6B7280");

    private final String displayName;
    private final String icon;
    private final String color;

    Category(String displayName, String icon, String color) {
        this.displayName = displayName;
        this.icon = icon;
        this.color = color;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getIcon() {
        return icon;
    }

    public String getColor() {
        return color;
    }

    public static Category fromString(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        for (Category category : Category.values()) {
            if (category.name().equalsIgnoreCase(value) || category.displayName.equalsIgnoreCase(value)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown category: " + value);
    }
}
