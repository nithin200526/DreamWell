package com.dreamwell.dto;

import com.dreamwell.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private Boolean isActive;
    private Boolean isEmailVerified;
    private String theme;
    private Boolean notificationsEnabled;
    private String language;
    private LocalDateTime createdAt;
    
    public static UserDTO fromEntity(User user) {
        return new UserDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name(),
            user.getIsActive(),
            user.getIsEmailVerified(),
            user.getTheme(),
            user.getNotificationsEnabled(),
            user.getLanguage(),
            user.getCreatedAt()
        );
    }
}
