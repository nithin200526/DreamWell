package com.dreamwell.service;

import com.dreamwell.dto.UserDTO;
import com.dreamwell.entity.Dream;
import com.dreamwell.entity.SupportTicket;
import com.dreamwell.entity.SystemSettings;
import com.dreamwell.entity.User;
import com.dreamwell.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DreamRepository dreamRepository;
    
    @Autowired
    private MoodEntryRepository moodEntryRepository;
    
    @Autowired
    private SupportTicketRepository supportTicketRepository;
    
    @Autowired
    private SystemSettingsRepository systemSettingsRepository;
    
    @Autowired
    private DreamInterpretationRepository interpretationRepository;
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.fromEntity(user);
    }
    
    @Transactional
    public UserDTO toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setIsActive(!user.getIsActive());
        user = userRepository.save(user);
        
        return UserDTO.fromEntity(user);
    }
    
    public Map<String, Object> getUserDreamsAndMoods(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Map<String, Object> data = new HashMap<>();
        data.put("dreams", dreamRepository.findByUserOrderByDreamDateDesc(user));
        data.put("moods", moodEntryRepository.findByUserOrderByEntryDateDesc(user));
        
        return data;
    }
    
    public List<Dream> getFlaggedDreams() {
        return dreamRepository.findByIsFlaggedOrderByCreatedAtDesc(true);
    }
    
    public Map<String, Object> getSystemAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        // Total users
        analytics.put("totalUsers", userRepository.count());
        
        // Active users (logged in last 30 days - simplified as all users for now)
        analytics.put("activeUsers", userRepository.findAll().stream()
                .filter(User::getIsActive)
                .count());
        
        // Total dreams
        analytics.put("totalDreams", dreamRepository.count());
        
        // Flagged dreams
        analytics.put("flaggedDreams", dreamRepository.findByIsFlaggedOrderByCreatedAtDesc(true).size());
        
        // Total mood entries
        analytics.put("totalMoodEntries", moodEntryRepository.count());
        
        // Open support tickets
        analytics.put("openTickets", supportTicketRepository.findByStatusOrderByCreatedAtDesc(SupportTicket.Status.OPEN).size());
        
        // Top dream symbols across all users
        analytics.put("topSymbols", getGlobalTopSymbols());
        
        return analytics;
    }
    
    private List<Map<String, Object>> getGlobalTopSymbols() {
        List<Dream> allDreams = dreamRepository.findAll();
        Map<String, Integer> symbolCount = new HashMap<>();
        
        for (Dream dream : allDreams) {
            interpretationRepository.findByDream(dream).ifPresent(interpretation -> {
                String symbols = interpretation.getSymbols();
                if (symbols != null && !symbols.isEmpty()) {
                    String[] symbolArray = symbols.split(",");
                    for (String symbol : symbolArray) {
                        String trimmedSymbol = symbol.trim();
                        symbolCount.put(trimmedSymbol, symbolCount.getOrDefault(trimmedSymbol, 0) + 1);
                    }
                }
            });
        }
        
        return symbolCount.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(10)
                .map(entry -> {
                    Map<String, Object> symbolData = new HashMap<>();
                    symbolData.put("symbol", entry.getKey());
                    symbolData.put("count", entry.getValue());
                    return symbolData;
                })
                .collect(Collectors.toList());
    }
    
    public List<SupportTicket> getAllSupportTickets() {
        return supportTicketRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public List<SupportTicket> getSupportTicketsByStatus(SupportTicket.Status status) {
        return supportTicketRepository.findByStatusOrderByCreatedAtDesc(status);
    }
    
    @Transactional
    public SupportTicket replyToTicket(Long ticketId, String reply) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        User admin = getCurrentUser();
        
        ticket.setAdminReply(reply);
        ticket.setRepliedBy(admin);
        ticket.setRepliedAt(LocalDateTime.now());
        ticket.setStatus(SupportTicket.Status.RESOLVED);
        
        return supportTicketRepository.save(ticket);
    }
    
    @Transactional
    public SupportTicket updateTicketStatus(Long ticketId, SupportTicket.Status status) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        ticket.setStatus(status);
        return supportTicketRepository.save(ticket);
    }
    
    public SystemSettings getSystemSetting(String key) {
        return systemSettingsRepository.findBySettingKey(key)
                .orElseThrow(() -> new RuntimeException("Setting not found"));
    }
    
    @Transactional
    public SystemSettings updateSystemSetting(String key, String value) {
        SystemSettings setting = systemSettingsRepository.findBySettingKey(key)
                .orElse(new SystemSettings());
        
        setting.setSettingKey(key);
        setting.setSettingValue(value);
        
        return systemSettingsRepository.save(setting);
    }
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
