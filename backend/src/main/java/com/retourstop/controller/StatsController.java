package com.retourstop.controller;

import com.retourstop.dto.response.StatsResponse;
import com.retourstop.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/wilaya")
    public ResponseEntity<StatsResponse> getWilayaStats() {
        return ResponseEntity.ok(statsService.getWilayaStats());
    }
}
