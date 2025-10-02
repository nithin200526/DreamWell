package com.dreamwell.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DreamRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Dream text is required")
    private String dreamText;
    
    private String tags;
    
    @NotBlank(message = "Mood at wake is required")
    private String moodAtWake;
    
    @NotNull(message = "Sleep quality is required")
    @Min(value = 1, message = "Sleep quality must be between 1 and 5")
    @Max(value = 5, message = "Sleep quality must be between 1 and 5")
    private Integer sleepQuality;
    
    @NotNull(message = "Dream date is required")
    private LocalDateTime dreamDate;
    
    private Boolean isPrivate = true;
    
    private String userNotes;
}
