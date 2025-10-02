package com.dreamwell.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dream_interpretations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DreamInterpretation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dream_id", nullable = false)
    private Dream dream;
    
    @Column(columnDefinition = "TEXT")
    private String shortSummary;
    
    @Column(columnDefinition = "TEXT")
    private String detailedExplanation;
    
    @Column(columnDefinition = "TEXT")
    private String predictedEmotions;
    
    @Column(columnDefinition = "TEXT")
    private String whyOccurred;
    
    @Column(columnDefinition = "TEXT")
    private String suggestedActions;
    
    @Column(columnDefinition = "TEXT")
    private String riskFlags;
    
    @Column(nullable = false)
    private Boolean hasRiskFlag = false;
    
    @Column(columnDefinition = "TEXT")
    private String symbols;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
