package com.dreamwell.controller;

import com.dreamwell.dto.ApiResponse;
import com.dreamwell.dto.DreamInterpretationDTO;
import com.dreamwell.dto.DreamRequest;
import com.dreamwell.dto.DreamResponse;
import com.dreamwell.service.DreamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dreams")
public class DreamController {
    
    @Autowired
    private DreamService dreamService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<DreamResponse>> createDream(@Valid @RequestBody DreamRequest request) {
        DreamResponse response = dreamService.createDream(request);
        return ResponseEntity.ok(ApiResponse.success("Dream logged successfully", response));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<DreamResponse>>> getAllDreams() {
        List<DreamResponse> dreams = dreamService.getAllDreams();
        return ResponseEntity.ok(ApiResponse.success(dreams));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DreamResponse>> getDreamById(@PathVariable Long id) {
        DreamResponse dream = dreamService.getDreamById(id);
        return ResponseEntity.ok(ApiResponse.success(dream));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DreamResponse>> updateDream(
            @PathVariable Long id, 
            @Valid @RequestBody DreamRequest request) {
        DreamResponse response = dreamService.updateDream(id, request);
        return ResponseEntity.ok(ApiResponse.success("Dream updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDream(@PathVariable Long id) {
        dreamService.deleteDream(id);
        return ResponseEntity.ok(ApiResponse.success("Dream deleted successfully", null));
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<DreamResponse>>> searchDreams(@RequestParam String keyword) {
        List<DreamResponse> dreams = dreamService.searchDreams(keyword);
        return ResponseEntity.ok(ApiResponse.success(dreams));
    }
    
    @PostMapping("/{id}/reinterpret")
    public ResponseEntity<ApiResponse<DreamInterpretationDTO>> reinterpretDream(@PathVariable Long id) {
        DreamInterpretationDTO interpretation = dreamService.reinterpretDream(id);
        return ResponseEntity.ok(ApiResponse.success("Dream reinterpreted successfully", interpretation));
    }
}
