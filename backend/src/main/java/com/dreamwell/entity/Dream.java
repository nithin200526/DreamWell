package com.dreamwell.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dreams")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dream {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String dreamText;
    
    @Column(columnDefinition = "TEXT")
    private String tags;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Mood moodAtWake;
    
    @Column(nullable = false)
    private Integer sleepQuality;
    
    @Column(nullable = false)
    private LocalDateTime dreamDate;
    
    @Column(nullable = false)
    private Boolean isPrivate = true;
    
    private String audioFilePath;
    
    @Column(columnDefinition = "TEXT")
    private String userNotes;
    
    @Column(nullable = false)
    private Boolean isFlagged = false;
    
    @Column(columnDefinition = "TEXT")
    private String flagReason;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    public enum Mood {
        VERY_HAPPY, HAPPY, NEUTRAL, SAD, VERY_SAD, ANXIOUS, PEACEFUL, CONFUSED
    }
}
