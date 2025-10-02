package com.dreamwell.service;

import com.dreamwell.dto.MoodEntryRequest;
import com.dreamwell.dto.MoodEntryResponse;
import com.dreamwell.entity.MoodEntry;
import com.dreamwell.entity.User;
import com.dreamwell.repository.MoodEntryRepository;
import com.dreamwell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoodService {
    
    @Autowired
    private MoodEntryRepository moodEntryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public MoodEntryResponse createMoodEntry(MoodEntryRequest request) {
        User user = getCurrentUser();
        
        // Check if entry already exists for this date
        moodEntryRepository.findByUserAndEntryDate(user, request.getEntryDate())
                .ifPresent(entry -> {
                    throw new RuntimeException("Mood entry already exists for this date");
                });
        
        MoodEntry entry = new MoodEntry();
        entry.setUser(user);
        entry.setEntryDate(request.getEntryDate());
        entry.setMood(MoodEntry.Mood.valueOf(request.getMood()));
        entry.setNotes(request.getNotes());
        entry.setTriggers(request.getTriggers());
        
        entry = moodEntryRepository.save(entry);
        return MoodEntryResponse.fromEntity(entry);
    }
    
    public List<MoodEntryResponse> getAllMoodEntries() {
        User user = getCurrentUser();
        List<MoodEntry> entries = moodEntryRepository.findByUserOrderByEntryDateDesc(user);
        return entries.stream()
                .map(MoodEntryResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    public List<MoodEntryResponse> getMoodEntriesByDateRange(LocalDate startDate, LocalDate endDate) {
        User user = getCurrentUser();
        List<MoodEntry> entries = moodEntryRepository.findByUserAndDateRange(user, startDate, endDate);
        return entries.stream()
                .map(MoodEntryResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public MoodEntryResponse updateMoodEntry(Long id, MoodEntryRequest request) {
        User user = getCurrentUser();
        MoodEntry entry = moodEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mood entry not found"));
        
        if (!entry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        entry.setEntryDate(request.getEntryDate());
        entry.setMood(MoodEntry.Mood.valueOf(request.getMood()));
        entry.setNotes(request.getNotes());
        entry.setTriggers(request.getTriggers());
        
        entry = moodEntryRepository.save(entry);
        return MoodEntryResponse.fromEntity(entry);
    }
    
    @Transactional
    public void deleteMoodEntry(Long id) {
        User user = getCurrentUser();
        MoodEntry entry = moodEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mood entry not found"));
        
        if (!entry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        moodEntryRepository.delete(entry);
    }
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
