package com.retourstop.controller;

import com.retourstop.dto.request.ReportRequest;
import com.retourstop.dto.response.ReportResponse;
import com.retourstop.model.Company;
import com.retourstop.repository.CompanyRepository;
import com.retourstop.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;
    private final CompanyRepository companyRepository;

    public ReportController(ReportService reportService, CompanyRepository companyRepository) {
        this.reportService = reportService;
        this.companyRepository = companyRepository;
    }

    @PostMapping
    public ResponseEntity<ReportResponse> createReport(@Valid @RequestBody ReportRequest req,
                                                       Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        Company company = companyRepository.findById(companyId).orElseThrow();
        return ResponseEntity.ok(reportService.createReport(companyId, req, company.getName()));
    }

    @GetMapping
    public ResponseEntity<List<ReportResponse>> getReports(Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(reportService.getReportsByCompany(companyId));
    }
}
