package com.dreamwell.controller;

import com.dreamwell.dto.ApiResponse;
import com.dreamwell.dto.MoodEntryRequest;
import com.dreamwell.dto.MoodEntryResponse;
import com.dreamwell.service.MoodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/moods")
public class MoodController {
    
    @Autowired
    private MoodService moodService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<MoodEntryResponse>> createMoodEntry(@Valid @RequestBody MoodEntryRequest request) {
        MoodEntryResponse response = moodService.createMoodEntry(request);
        return ResponseEntity.ok(ApiResponse.success("Mood entry created successfully", response));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<MoodEntryResponse>>> getAllMoodEntries() {
        List<MoodEntryResponse> entries = moodService.getAllMoodEntries();
        return ResponseEntity.ok(ApiResponse.success(entries));
    }
    
    @GetMapping("/range")
    public ResponseEntity<ApiResponse<List<MoodEntryResponse>>> getMoodEntriesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<MoodEntryResponse> entries = moodService.getMoodEntriesByDateRange(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(entries));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MoodEntryResponse>> updateMoodEntry(
            @PathVariable Long id, 
            @Valid @RequestBody MoodEntryRequest request) {
        MoodEntryResponse response = moodService.updateMoodEntry(id, request);
        return ResponseEntity.ok(ApiResponse.success("Mood entry updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteMoodEntry(@PathVariable Long id) {
        moodService.deleteMoodEntry(id);
        return ResponseEntity.ok(ApiResponse.success("Mood entry deleted successfully", null));
    }
}
