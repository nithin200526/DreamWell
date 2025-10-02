package com.dreamwell.config;

import com.dreamwell.entity.SystemSettings;
import com.dreamwell.entity.User;
import com.dreamwell.repository.SystemSettingsRepository;
import com.dreamwell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SystemSettingsRepository systemSettingsRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Value("${app.admin.email}")
    private String adminEmail;
    
    @Value("${app.admin.password}")
    private String adminPassword;
    
    @Override
    public void run(String... args) {
        // Create default admin user if not exists
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(User.Role.SUPER_ADMIN);
            admin.setIsActive(true);
            admin.setIsEmailVerified(true);
            userRepository.save(admin);
            System.out.println("Default admin user created: " + adminEmail);
        }
        
        // Initialize system settings
        initializeSystemSettings();
    }
    
    private void initializeSystemSettings() {
        createSettingIfNotExists("app.name", "DreamWell", "Application name");
        createSettingIfNotExists("app.logo", "/logo.png", "Application logo path");
        createSettingIfNotExists("app.footer.text", "© 2025 DreamWell. All rights reserved.", "Footer text");
        createSettingIfNotExists("emergency.helpline", "National Suicide Prevention Lifeline: 988", "Emergency helpline information");
    }
    
    private void createSettingIfNotExists(String key, String value, String description) {
        if (!systemSettingsRepository.findBySettingKey(key).isPresent()) {
            SystemSettings setting = new SystemSettings();
            setting.setSettingKey(key);
            setting.setSettingValue(value);
            setting.setDescription(description);
            systemSettingsRepository.save(setting);
        }
    }
}
