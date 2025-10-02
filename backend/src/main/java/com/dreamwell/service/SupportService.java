package com.dreamwell.service;

import com.dreamwell.entity.SupportTicket;
import com.dreamwell.entity.User;
import com.dreamwell.repository.SupportTicketRepository;
import com.dreamwell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class SupportService {
    
    @Autowired
    private SupportTicketRepository supportTicketRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public SupportTicket createTicket(Map<String, String> request) {
        User user = null;
        try {
            user = getCurrentUser();
        } catch (Exception e) {
            // Anonymous user
        }
        
        SupportTicket ticket = new SupportTicket();
        ticket.setUser(user);
        ticket.setName(request.get("name"));
        ticket.setEmail(request.get("email"));
        ticket.setSubject(request.get("subject"));
        ticket.setMessage(request.get("message"));
        ticket.setStatus(SupportTicket.Status.OPEN);
        
        return supportTicketRepository.save(ticket);
    }
    
    public List<SupportTicket> getUserTickets() {
        User user = getCurrentUser();
        return supportTicketRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public SupportTicket getTicketById(Long ticketId) {
        User user = getCurrentUser();
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        if (ticket.getUser() != null && !ticket.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        return ticket;
    }
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
