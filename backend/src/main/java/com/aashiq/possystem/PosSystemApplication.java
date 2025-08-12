package com.aashiq.possystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class PosSystemApplication implements CommandLineRunner {

    @Value("${server.port}")
    private String serverPort;

    public static void main(String[] args) {
        SpringApplication.run(PosSystemApplication.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println("Server is running on port: " + serverPort);
    }
}
