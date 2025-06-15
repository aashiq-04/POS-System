package com.aashiq.possystem.controller;


import com.aashiq.possystem.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAnalytics(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        Map<String, Object> analytics = analyticsService.getAnalytics(start.atStartOfDay(), end.atStartOfDay());
        return ResponseEntity.ok(analytics);
    }
}
