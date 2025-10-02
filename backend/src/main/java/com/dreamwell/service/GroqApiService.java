package com.dreamwell.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroqApiService {
    
    @Value("${groq.api.key}")
    private String apiKey;
    
    @Value("${groq.api.url}")
    private String apiUrl;
    
    @Value("${groq.api.model}")
    private String model;
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    public GroqApiService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }
    
    public Map<String, String> interpretDream(String dreamText, String mood, Integer sleepQuality) {
        try {
            String prompt = buildDreamInterpretationPrompt(dreamText, mood, sleepQuality);
            String response = callGroqApi(prompt);
            return parseDreamInterpretation(response);
        } catch (Exception e) {
            throw new RuntimeException("Failed to interpret dream: " + e.getMessage(), e);
        }
    }
    
    private String buildDreamInterpretationPrompt(String dreamText, String mood, Integer sleepQuality) {
        return String.format("""
            You are an expert dream interpreter and psychologist. Analyze the following dream and provide a structured interpretation.
            
            Dream: %s
            Mood at wake: %s
            Sleep quality (1-5): %d
            
            Provide your analysis in the following JSON format (respond ONLY with valid JSON, no additional text):
            {
                "shortSummary": "A brief 2-3 sentence summary of the dream",
                "detailedExplanation": "A detailed psychological interpretation of the dream (3-4 paragraphs)",
                "predictedEmotions": "List of emotions detected: anxiety, stress, happiness, fear, etc. (comma-separated)",
                "whyOccurred": "Explanation of why this dream might have occurred (psychological, emotional, or situational factors)",
                "suggestedActions": "Practical suggestions to address negative emotions or improve mood (bullet points)",
                "riskFlags": "Identify any concerning themes: self-harm, violence, severe depression. If none, write 'none'",
                "symbols": "Key dream symbols and their meanings (comma-separated)"
            }
            
            Be empathetic, professional, and provide actionable insights.
            """, dreamText, mood, sleepQuality);
    }
    
    private String callGroqApi(String prompt) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
            ));
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 2000);
            
            System.out.println("Calling Groq API with model: " + model);
            System.out.println("API URL: " + apiUrl);
            
            String response = webClient.post()
                .uri(apiUrl)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(
                    status -> status.is4xxClientError() || status.is5xxServerError(),
                    clientResponse -> clientResponse.bodyToMono(String.class)
                        .map(errorBody -> {
                            System.err.println("Groq API Error Response: " + errorBody);
                            return new RuntimeException("Groq API Error: " + errorBody);
                        })
                )
                .bodyToMono(String.class)
                .block();
            
            return response;
        } catch (Exception e) {
            System.err.println("Groq API Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Groq API call failed: " + e.getMessage(), e);
        }
    }
    
    private Map<String, String> parseDreamInterpretation(String apiResponse) {
        try {
            JsonNode root = objectMapper.readTree(apiResponse);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            
            // Clean the content to extract JSON
            content = content.trim();
            if (content.startsWith("```json")) {
                content = content.substring(7);
            }
            if (content.startsWith("```")) {
                content = content.substring(3);
            }
            if (content.endsWith("```")) {
                content = content.substring(0, content.length() - 3);
            }
            content = content.trim();
            
            // Escape newlines and other control characters in string values
            content = content.replaceAll("\\r\\n", " ")
                           .replaceAll("\\n", " ")
                           .replaceAll("\\r", " ")
                           .replaceAll("\\t", " ");
            
            // Parse the JSON content
            JsonNode interpretationNode = objectMapper.readTree(content);
            
            Map<String, String> interpretation = new HashMap<>();
            interpretation.put("shortSummary", interpretationNode.path("shortSummary").asText());
            interpretation.put("detailedExplanation", interpretationNode.path("detailedExplanation").asText());
            interpretation.put("predictedEmotions", interpretationNode.path("predictedEmotions").asText());
            interpretation.put("whyOccurred", interpretationNode.path("whyOccurred").asText());
            interpretation.put("suggestedActions", interpretationNode.path("suggestedActions").asText());
            interpretation.put("riskFlags", interpretationNode.path("riskFlags").asText());
            interpretation.put("symbols", interpretationNode.path("symbols").asText());
            
            return interpretation;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Groq API response: " + e.getMessage(), e);
        }
    }
}
