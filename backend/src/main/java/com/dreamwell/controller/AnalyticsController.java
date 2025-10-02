package com.dreamwell.controller;

import com.dreamwell.dto.ApiResponse;
import com.dreamwell.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {
    
    @Autowired
    private AnalyticsService analyticsService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAnalytics() {
        Map<String, Object> analytics = analyticsService.getUserAnalytics();
        return ResponseEntity.ok(ApiResponse.success(analytics));
    }
    
    @GetMapping("/export")
    public ResponseEntity<String> exportData() {
        String csvData = analyticsService.exportUserData();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", "dreamwell-data.csv");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvData);
    }
}
