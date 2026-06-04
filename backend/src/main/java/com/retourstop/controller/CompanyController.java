package com.retourstop.controller;

import com.retourstop.dto.response.CompanyStatsResponse;
import com.retourstop.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/stats")
    public ResponseEntity<CompanyStatsResponse> getCompanyStats(Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(companyService.getCompanyStats(companyId));
    }
}
