package com.dreamwell.service;

import com.dreamwell.dto.UserDTO;
import com.dreamwell.entity.User;
import com.dreamwell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public UserDTO getCurrentUserProfile() {
        User user = getCurrentUser();
        return UserDTO.fromEntity(user);
    }
    
    @Transactional
    public UserDTO updateProfile(Map<String, String> updates) {
        User user = getCurrentUser();
        
        if (updates.containsKey("name")) {
            user.setName(updates.get("name"));
        }
        if (updates.containsKey("theme")) {
            user.setTheme(updates.get("theme"));
        }
        if (updates.containsKey("language")) {
            user.setLanguage(updates.get("language"));
        }
        if (updates.containsKey("notificationsEnabled")) {
            user.setNotificationsEnabled(Boolean.parseBoolean(updates.get("notificationsEnabled")));
        }
        
        user = userRepository.save(user);
        return UserDTO.fromEntity(user);
    }
    
    @Transactional
    public void updatePassword(String currentPassword, String newPassword) {
        User user = getCurrentUser();
        
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    @Transactional
    public void deleteAccount() {
        User user = getCurrentUser();
        userRepository.delete(user);
    }
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
