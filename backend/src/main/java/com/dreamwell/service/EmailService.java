package com.dreamwell.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.frontend.url}")
    private String frontendUrl;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Async
    public void sendVerificationEmail(String to, String name, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("DreamWell - Verify Your Email");
            message.setText(String.format("""
                Hello %s,
                
                Welcome to DreamWell! Please verify your email address by clicking the link below:
                
                %s/verify-email?token=%s
                
                This link will expire in 24 hours.
                
                If you didn't create an account, please ignore this email.
                
                Best regards,
                DreamWell Team
                """, name, frontendUrl, token));
            
            mailSender.send(message);
        } catch (Exception e) {
            // Log error but don't throw exception to prevent signup failure
            System.err.println("Failed to send verification email: " + e.getMessage());
        }
    }
    
    @Async
    public void sendPasswordResetEmail(String to, String name, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("DreamWell - Reset Your Password");
            message.setText(String.format("""
                Hello %s,
                
                We received a request to reset your password. Click the link below to reset it:
                
                %s/reset-password?token=%s
                
                This link will expire in 1 hour.
                
                If you didn't request a password reset, please ignore this email.
                
                Best regards,
                DreamWell Team
                """, name, frontendUrl, token));
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send password reset email: " + e.getMessage());
        }
    }
}
