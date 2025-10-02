package com.dreamwell.service;

import com.dreamwell.dto.DreamInterpretationDTO;
import com.dreamwell.dto.DreamRequest;
import com.dreamwell.dto.DreamResponse;
import com.dreamwell.entity.Dream;
import com.dreamwell.entity.DreamInterpretation;
import com.dreamwell.entity.User;
import com.dreamwell.repository.DreamInterpretationRepository;
import com.dreamwell.repository.DreamRepository;
import com.dreamwell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DreamService {
    
    @Autowired
    private DreamRepository dreamRepository;
    
    @Autowired
    private DreamInterpretationRepository interpretationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GroqApiService groqApiService;
    
    @Transactional
    public DreamResponse createDream(DreamRequest request) {
        User user = getCurrentUser();
        
        Dream dream = new Dream();
        dream.setUser(user);
        dream.setTitle(request.getTitle());
        dream.setDreamText(request.getDreamText());
        dream.setTags(request.getTags());
        dream.setMoodAtWake(Dream.Mood.valueOf(request.getMoodAtWake()));
        dream.setSleepQuality(request.getSleepQuality());
        dream.setDreamDate(request.getDreamDate());
        dream.setIsPrivate(request.getIsPrivate());
        dream.setUserNotes(request.getUserNotes());
        
        dream = dreamRepository.save(dream);
        
        // Generate AI interpretation
        Map<String, String> interpretation = groqApiService.interpretDream(
            dream.getDreamText(), 
            dream.getMoodAtWake().name(), 
            dream.getSleepQuality()
        );
        
        DreamInterpretation dreamInterpretation = new DreamInterpretation();
        dreamInterpretation.setDream(dream);
        dreamInterpretation.setShortSummary(interpretation.get("shortSummary"));
        dreamInterpretation.setDetailedExplanation(interpretation.get("detailedExplanation"));
        dreamInterpretation.setPredictedEmotions(interpretation.get("predictedEmotions"));
        dreamInterpretation.setWhyOccurred(interpretation.get("whyOccurred"));
        dreamInterpretation.setSuggestedActions(interpretation.get("suggestedActions"));
        dreamInterpretation.setRiskFlags(interpretation.get("riskFlags"));
        dreamInterpretation.setSymbols(interpretation.get("symbols"));
        
        // Check for risk flags
        String riskFlags = interpretation.get("riskFlags").toLowerCase();
        boolean hasRisk = !riskFlags.equals("none") && 
                         (riskFlags.contains("self-harm") || 
                          riskFlags.contains("violence") || 
                          riskFlags.contains("suicide"));
        dreamInterpretation.setHasRiskFlag(hasRisk);
        
        if (hasRisk) {
            dream.setIsFlagged(true);
            dream.setFlagReason(interpretation.get("riskFlags"));
            dreamRepository.save(dream);
        }
        
        dreamInterpretation = interpretationRepository.save(dreamInterpretation);
        
        DreamResponse response = DreamResponse.fromEntity(dream);
        response.setInterpretation(DreamInterpretationDTO.fromEntity(dreamInterpretation));
        
        return response;
    }
    
    public List<DreamResponse> getAllDreams() {
        User user = getCurrentUser();
        List<Dream> dreams = dreamRepository.findByUserOrderByDreamDateDesc(user);
        
        return dreams.stream().map(dream -> {
            DreamResponse response = DreamResponse.fromEntity(dream);
            interpretationRepository.findByDream(dream).ifPresent(interpretation -> 
                response.setInterpretation(DreamInterpretationDTO.fromEntity(interpretation))
            );
            return response;
        }).collect(Collectors.toList());
    }
    
    public DreamResponse getDreamById(Long id) {
        User user = getCurrentUser();
        Dream dream = dreamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dream not found"));
        
        if (!dream.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        DreamResponse response = DreamResponse.fromEntity(dream);
        interpretationRepository.findByDream(dream).ifPresent(interpretation -> 
            response.setInterpretation(DreamInterpretationDTO.fromEntity(interpretation))
        );
        
        return response;
    }
    
    @Transactional
    public DreamResponse updateDream(Long id, DreamRequest request) {
        User user = getCurrentUser();
        Dream dream = dreamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dream not found"));
        
        if (!dream.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        dream.setTitle(request.getTitle());
        dream.setDreamText(request.getDreamText());
        dream.setTags(request.getTags());
        dream.setMoodAtWake(Dream.Mood.valueOf(request.getMoodAtWake()));
        dream.setSleepQuality(request.getSleepQuality());
        dream.setDreamDate(request.getDreamDate());
        dream.setIsPrivate(request.getIsPrivate());
        dream.setUserNotes(request.getUserNotes());
        
        dream = dreamRepository.save(dream);
        
        DreamResponse response = DreamResponse.fromEntity(dream);
        interpretationRepository.findByDream(dream).ifPresent(interpretation -> 
            response.setInterpretation(DreamInterpretationDTO.fromEntity(interpretation))
        );
        
        return response;
    }
    
    @Transactional
    public void deleteDream(Long id) {
        User user = getCurrentUser();
        Dream dream = dreamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dream not found"));
        
        if (!dream.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        dreamRepository.delete(dream);
    }
    
    public List<DreamResponse> searchDreams(String keyword) {
        User user = getCurrentUser();
        List<Dream> dreams = dreamRepository.searchDreams(user, keyword);
        
        return dreams.stream().map(DreamResponse::fromEntity).collect(Collectors.toList());
    }
    
    @Transactional
    public DreamInterpretationDTO reinterpretDream(Long dreamId) {
        User user = getCurrentUser();
        Dream dream = dreamRepository.findById(dreamId)
                .orElseThrow(() -> new RuntimeException("Dream not found"));
        
        if (!dream.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        
        // Generate new interpretation
        Map<String, String> interpretation = groqApiService.interpretDream(
            dream.getDreamText(), 
            dream.getMoodAtWake().name(), 
            dream.getSleepQuality()
        );
        
        DreamInterpretation dreamInterpretation = interpretationRepository.findByDream(dream)
                .orElse(new DreamInterpretation());
        
        dreamInterpretation.setDream(dream);
        dreamInterpretation.setShortSummary(interpretation.get("shortSummary"));
        dreamInterpretation.setDetailedExplanation(interpretation.get("detailedExplanation"));
        dreamInterpretation.setPredictedEmotions(interpretation.get("predictedEmotions"));
        dreamInterpretation.setWhyOccurred(interpretation.get("whyOccurred"));
        dreamInterpretation.setSuggestedActions(interpretation.get("suggestedActions"));
        dreamInterpretation.setRiskFlags(interpretation.get("riskFlags"));
        dreamInterpretation.setSymbols(interpretation.get("symbols"));
        
        String riskFlags = interpretation.get("riskFlags").toLowerCase();
        boolean hasRisk = !riskFlags.equals("none") && 
                         (riskFlags.contains("self-harm") || 
                          riskFlags.contains("violence") || 
                          riskFlags.contains("suicide"));
        dreamInterpretation.setHasRiskFlag(hasRisk);
        
        dreamInterpretation = interpretationRepository.save(dreamInterpretation);
        
        return DreamInterpretationDTO.fromEntity(dreamInterpretation);
    }
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
