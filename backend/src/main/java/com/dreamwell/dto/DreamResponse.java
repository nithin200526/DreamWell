package com.dreamwell.dto;

import com.dreamwell.entity.Dream;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DreamResponse {
    private Long id;
    private String title;
    private String dreamText;
    private String tags;
    private String moodAtWake;
    private Integer sleepQuality;
    private LocalDateTime dreamDate;
    private Boolean isPrivate;
    private String userNotes;
    private Boolean isFlagged;
    private String flagReason;
    private LocalDateTime createdAt;
    private DreamInterpretationDTO interpretation;
    
    public static DreamResponse fromEntity(Dream dream) {
        return new DreamResponse(
            dream.getId(),
            dream.getTitle(),
            dream.getDreamText(),
            dream.getTags(),
            dream.getMoodAtWake().name(),
            dream.getSleepQuality(),
            dream.getDreamDate(),
            dream.getIsPrivate(),
            dream.getUserNotes(),
            dream.getIsFlagged(),
            dream.getFlagReason(),
            dream.getCreatedAt(),
            null
        );
    }
}
