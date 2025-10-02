package com.dreamwell.dto;

import com.dreamwell.entity.MoodEntry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoodEntryResponse {
    private Long id;
    private LocalDate entryDate;
    private String mood;
    private String notes;
    private String triggers;
    private LocalDateTime createdAt;
    
    public static MoodEntryResponse fromEntity(MoodEntry entry) {
        return new MoodEntryResponse(
            entry.getId(),
            entry.getEntryDate(),
            entry.getMood().name(),
            entry.getNotes(),
            entry.getTriggers(),
            entry.getCreatedAt()
        );
    }
}
