package com.dreamwell.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private Boolean isEmailVerified = false;
    
    private String emailVerificationToken;
    
    private LocalDateTime emailVerificationTokenExpiry;
    
    private String passwordResetToken;
    
    private LocalDateTime passwordResetTokenExpiry;
    
    @Column(nullable = false)
    private String theme = "light";
    
    @Column(nullable = false)
    private Boolean notificationsEnabled = true;
    
    @Column(nullable = false)
    private String language = "en";
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    public enum Role {
        USER, ADMIN, SUPER_ADMIN
    }
}
