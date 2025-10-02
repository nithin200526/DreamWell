package com.dreamwell.controller;

import com.dreamwell.dto.ApiResponse;
import com.dreamwell.dto.UserDTO;
import com.dreamwell.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDTO>> getProfile() {
        UserDTO user = userService.getCurrentUserProfile();
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody Map<String, String> updates) {
        UserDTO user = userService.updateProfile(updates);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", user));
    }
    
    @PutMapping("/password")
    public ResponseEntity<ApiResponse<String>> updatePassword(@RequestBody Map<String, String> request) {
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");
        userService.updatePassword(currentPassword, newPassword);
        return ResponseEntity.ok(ApiResponse.success("Password updated successfully", null));
    }
    
    @DeleteMapping("/account")
    public ResponseEntity<ApiResponse<String>> deleteAccount() {
        userService.deleteAccount();
        return ResponseEntity.ok(ApiResponse.success("Account deleted successfully", null));
    }
}
