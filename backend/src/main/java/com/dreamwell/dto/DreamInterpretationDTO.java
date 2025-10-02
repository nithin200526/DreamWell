package com.dreamwell.dto;

import com.dreamwell.entity.DreamInterpretation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DreamInterpretationDTO {
    private Long id;
    private String shortSummary;
    private String detailedExplanation;
    private String predictedEmotions;
    private String whyOccurred;
    private String suggestedActions;
    private String riskFlags;
    private Boolean hasRiskFlag;
    private String symbols;
    private LocalDateTime createdAt;
    
    public static DreamInterpretationDTO fromEntity(DreamInterpretation interpretation) {
        return new DreamInterpretationDTO(
            interpretation.getId(),
            interpretation.getShortSummary(),
            interpretation.getDetailedExplanation(),
            interpretation.getPredictedEmotions(),
            interpretation.getWhyOccurred(),
            interpretation.getSuggestedActions(),
            interpretation.getRiskFlags(),
            interpretation.getHasRiskFlag(),
            interpretation.getSymbols(),
            interpretation.getCreatedAt()
        );
    }
}
