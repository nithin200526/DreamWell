package com.dreamwell.controller;

import com.dreamwell.dto.ApiResponse;
import com.dreamwell.entity.SupportTicket;
import com.dreamwell.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/support")
public class SupportController {
    
    @Autowired
    private SupportService supportService;
    
    @PostMapping("/tickets")
    public ResponseEntity<ApiResponse<SupportTicket>> createTicket(@RequestBody Map<String, String> request) {
        SupportTicket ticket = supportService.createTicket(request);
        return ResponseEntity.ok(ApiResponse.success("Ticket created successfully", ticket));
    }
    
    @GetMapping("/tickets")
    public ResponseEntity<ApiResponse<List<SupportTicket>>> getUserTickets() {
        List<SupportTicket> tickets = supportService.getUserTickets();
        return ResponseEntity.ok(ApiResponse.success(tickets));
    }
    
    @GetMapping("/tickets/{ticketId}")
    public ResponseEntity<ApiResponse<SupportTicket>> getTicketById(@PathVariable Long ticketId) {
        SupportTicket ticket = supportService.getTicketById(ticketId);
        return ResponseEntity.ok(ApiResponse.success(ticket));
    }
}
