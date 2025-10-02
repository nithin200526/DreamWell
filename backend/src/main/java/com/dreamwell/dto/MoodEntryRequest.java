package com.dreamwell.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MoodEntryRequest {
    @NotNull(message = "Entry date is required")
    private LocalDate entryDate;
    
    @NotBlank(message = "Mood is required")
    private String mood;
    
    private String notes;
    private String triggers;
}
