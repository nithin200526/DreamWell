package com.dreamwell.controller;

import com.dreamwell.dto.ApiResponse;
import com.dreamwell.dto.UserDTO;
import com.dreamwell.entity.Dream;
import com.dreamwell.entity.SupportTicket;
import com.dreamwell.entity.SystemSettings;
import com.dreamwell.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }
    
    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long userId) {
        UserDTO user = adminService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    @PutMapping("/users/{userId}/toggle-status")
    public ResponseEntity<ApiResponse<UserDTO>> toggleUserStatus(@PathVariable Long userId) {
        UserDTO user = adminService.toggleUserStatus(userId);
        return ResponseEntity.ok(ApiResponse.success("User status updated", user));
    }
    
    @GetMapping("/users/{userId}/data")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserData(@PathVariable Long userId) {
        Map<String, Object> data = adminService.getUserDreamsAndMoods(userId);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
    
    @GetMapping("/dreams/flagged")
    public ResponseEntity<ApiResponse<List<Dream>>> getFlaggedDreams() {
        List<Dream> dreams = adminService.getFlaggedDreams();
        return ResponseEntity.ok(ApiResponse.success(dreams));
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSystemAnalytics() {
        Map<String, Object> analytics = adminService.getSystemAnalytics();
        return ResponseEntity.ok(ApiResponse.success(analytics));
    }
    
    @GetMapping("/support/tickets")
    public ResponseEntity<ApiResponse<List<SupportTicket>>> getAllTickets() {
        List<SupportTicket> tickets = adminService.getAllSupportTickets();
        return ResponseEntity.ok(ApiResponse.success(tickets));
    }
    
    @GetMapping("/support/tickets/status/{status}")
    public ResponseEntity<ApiResponse<List<SupportTicket>>> getTicketsByStatus(@PathVariable String status) {
        SupportTicket.Status ticketStatus = SupportTicket.Status.valueOf(status.toUpperCase());
        List<SupportTicket> tickets = adminService.getSupportTicketsByStatus(ticketStatus);
        return ResponseEntity.ok(ApiResponse.success(tickets));
    }
    
    @PostMapping("/support/tickets/{ticketId}/reply")
    public ResponseEntity<ApiResponse<SupportTicket>> replyToTicket(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> request) {
        String reply = request.get("reply");
        SupportTicket ticket = adminService.replyToTicket(ticketId, reply);
        return ResponseEntity.ok(ApiResponse.success("Reply sent successfully", ticket));
    }
    
    @PutMapping("/support/tickets/{ticketId}/status")
    public ResponseEntity<ApiResponse<SupportTicket>> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> request) {
        SupportTicket.Status status = SupportTicket.Status.valueOf(request.get("status").toUpperCase());
        SupportTicket ticket = adminService.updateTicketStatus(ticketId, status);
        return ResponseEntity.ok(ApiResponse.success("Ticket status updated", ticket));
    }
    
    @GetMapping("/settings/{key}")
    public ResponseEntity<ApiResponse<SystemSettings>> getSystemSetting(@PathVariable String key) {
        SystemSettings setting = adminService.getSystemSetting(key);
        return ResponseEntity.ok(ApiResponse.success(setting));
    }
    
    @PutMapping("/settings/{key}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SystemSettings>> updateSystemSetting(
            @PathVariable String key,
            @RequestBody Map<String, String> request) {
        String value = request.get("value");
        SystemSettings setting = adminService.updateSystemSetting(key, value);
        return ResponseEntity.ok(ApiResponse.success("Setting updated", setting));
    }
}
