package com.retourstop.controller;

import com.retourstop.dto.response.BlacklistEntryResponse;
import com.retourstop.service.BlacklistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blacklist")
public class BlacklistController {
    private final BlacklistService blacklistService;

    public BlacklistController(BlacklistService blacklistService) {
        this.blacklistService = blacklistService;
    }

    @GetMapping
    public ResponseEntity<List<BlacklistEntryResponse>> getBlacklist(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String wilaya) {
        return ResponseEntity.ok(blacklistService.getBlacklist(search, level, wilaya));
    }
}
