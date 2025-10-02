package com.dreamwell.service;

import com.dreamwell.entity.Dream;
import com.dreamwell.entity.DreamInterpretation;
import com.dreamwell.entity.MoodEntry;
import com.dreamwell.entity.User;
import com.dreamwell.repository.DreamInterpretationRepository;
import com.dreamwell.repository.DreamRepository;
import com.dreamwell.repository.MoodEntryRepository;
import com.dreamwell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    
    @Autowired
    private DreamRepository dreamRepository;
    
    @Autowired
    private MoodEntryRepository moodEntryRepository;
    
    @Autowired
    private DreamInterpretationRepository interpretationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Map<String, Object> getUserAnalytics() {
        User user = getCurrentUser();
        Map<String, Object> analytics = new HashMap<>();
        
        // Total dreams count
        Long totalDreams = dreamRepository.countByUser(user);
        analytics.put("totalDreams", totalDreams);
        
        // Recent dreams (last 7 days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        List<Dream> recentDreams = dreamRepository.findByUserAndDateRange(user, weekAgo, LocalDateTime.now());
        analytics.put("recentDreamsCount", recentDreams.size());
        
        // Mood trends (last 30 days)
        LocalDate monthAgo = LocalDate.now().minusDays(30);
        List<MoodEntry> moodEntries = moodEntryRepository.findByUserAndDateRange(user, monthAgo, LocalDate.now());
        analytics.put("moodTrends", getMoodTrends(moodEntries));
        
        // Top recurring symbols
        analytics.put("topSymbols", getTopSymbols(user));
        
        // Mood vs Sleep quality correlation
        analytics.put("moodSleepCorrelation", getMoodSleepCorrelation(user));
        
        // Average sleep quality
        analytics.put("averageSleepQuality", getAverageSleepQuality(recentDreams));
        
        // Most common mood
        analytics.put("mostCommonMood", getMostCommonMood(moodEntries));
        
        return analytics;
    }
    
    private Map<String, Integer> getMoodTrends(List<MoodEntry> entries) {
        return entries.stream()
                .collect(Collectors.groupingBy(
                    entry -> entry.getMood().name(),
                    Collectors.collectingAndThen(Collectors.counting(), Long::intValue)
                ));
    }
    
    private List<Map<String, Object>> getTopSymbols(User user) {
        List<Dream> dreams = dreamRepository.findByUserOrderByDreamDateDesc(user);
        Map<String, Integer> symbolCount = new HashMap<>();
        
        for (Dream dream : dreams) {
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
    
    private Map<String, Object> getMoodSleepCorrelation(User user) {
        List<Dream> dreams = dreamRepository.findByUserOrderByDreamDateDesc(user);
        Map<String, List<Integer>> moodSleepMap = new HashMap<>();
        
        for (Dream dream : dreams) {
            String mood = dream.getMoodAtWake().name();
            moodSleepMap.computeIfAbsent(mood, k -> new ArrayList<>()).add(dream.getSleepQuality());
        }
        
        Map<String, Object> correlation = new HashMap<>();
        for (Map.Entry<String, List<Integer>> entry : moodSleepMap.entrySet()) {
            double average = entry.getValue().stream()
                    .mapToInt(Integer::intValue)
                    .average()
                    .orElse(0.0);
            correlation.put(entry.getKey(), Math.round(average * 100.0) / 100.0);
        }
        
        return correlation;
    }
    
    private Double getAverageSleepQuality(List<Dream> dreams) {
        if (dreams.isEmpty()) return 0.0;
        
        double average = dreams.stream()
                .mapToInt(Dream::getSleepQuality)
                .average()
                .orElse(0.0);
        
        return Math.round(average * 100.0) / 100.0;
    }
    
    private String getMostCommonMood(List<MoodEntry> entries) {
        if (entries.isEmpty()) return "N/A";
        
        return entries.stream()
                .collect(Collectors.groupingBy(
                    entry -> entry.getMood().name(),
                    Collectors.counting()
                ))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }
    
    public String exportUserData() {
        User user = getCurrentUser();
        StringBuilder csv = new StringBuilder();
        
        // Export dreams
        csv.append("DREAMS\n");
        csv.append("Date,Title,Mood,Sleep Quality,Dream Text,Tags\n");
        
        List<Dream> dreams = dreamRepository.findByUserOrderByDreamDateDesc(user);
        for (Dream dream : dreams) {
            csv.append(String.format("%s,%s,%s,%d,\"%s\",%s\n",
                dream.getDreamDate(),
                escapeCsv(dream.getTitle()),
                dream.getMoodAtWake().name(),
                dream.getSleepQuality(),
                escapeCsv(dream.getDreamText()),
                escapeCsv(dream.getTags())
            ));
        }
        
        // Export mood entries
        csv.append("\nMOOD ENTRIES\n");
        csv.append("Date,Mood,Notes,Triggers\n");
        
        List<MoodEntry> moods = moodEntryRepository.findByUserOrderByEntryDateDesc(user);
        for (MoodEntry mood : moods) {
            csv.append(String.format("%s,%s,\"%s\",\"%s\"\n",
                mood.getEntryDate(),
                mood.getMood().name(),
                escapeCsv(mood.getNotes()),
                escapeCsv(mood.getTriggers())
            ));
        }
        
        return csv.toString();
    }
    
    private String escapeCsv(String value) {
        if (value == null) return "";
        return value.replace("\"", "\"\"");
    }
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
