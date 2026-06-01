package com.retourstop.controller;

import com.retourstop.dto.request.UpdateProfileRequest;
import com.retourstop.model.Company;
import com.retourstop.service.SettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Company> getProfile(Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(settingsService.getProfile(companyId));
    }

    @PutMapping("/profile")
    public ResponseEntity<Company> updateProfile(Authentication auth, @RequestBody UpdateProfileRequest req) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(settingsService.updateProfile(companyId, req));
    }
}
