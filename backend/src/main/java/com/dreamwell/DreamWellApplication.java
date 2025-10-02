package com.dreamwell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class DreamWellApplication {
    public static void main(String[] args) {
        SpringApplication.run(DreamWellApplication.class, args);
    }
}
