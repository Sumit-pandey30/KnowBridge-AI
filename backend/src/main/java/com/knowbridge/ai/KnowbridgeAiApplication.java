package com.knowbridge.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class KnowbridgeAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(KnowbridgeAiApplication.class, args);
    }
}
