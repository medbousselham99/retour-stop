package com.retourstop.service;

import com.retourstop.dto.response.CompanyStatsResponse;
import com.retourstop.model.Company;
import com.retourstop.model.Report;
import com.retourstop.repository.CompanyRepository;
import com.retourstop.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final ReportRepository reportRepository;

    public CompanyService(CompanyRepository companyRepository, ReportRepository reportRepository) {
        this.companyRepository = companyRepository;
        this.reportRepository = reportRepository;
    }

    public CompanyStatsResponse getCompanyStats(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        List<Report> reports = reportRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);

        long totalReports = reports.size();
        long totalClients = reports.stream()
                .map(Report::getClientPhone)
                .distinct()
                .count();
        long totalValue = reports.stream()
                .filter(r -> r.getValue() != null)
                .mapToLong(r -> r.getValue().longValue())
                .sum();
        long pendingReports = reports.stream().filter(r -> "En attente".equals(r.getStatus())).count();
        long validReports = reports.stream().filter(r -> "Validé".equals(r.getStatus())).count();
        long disputeReports = reports.stream().filter(r -> "Litige".equals(r.getStatus())).count();

        CompanyStatsResponse.CompanyKpis kpis = new CompanyStatsResponse.CompanyKpis(
                totalReports, totalClients, totalValue, pendingReports, validReports, disputeReports
        );

        Map<YearMonth, List<Report>> byMonth = reports.stream()
                .filter(r -> r.getCreatedAt() != null)
                .collect(Collectors.groupingBy(
                        r -> YearMonth.from(r.getCreatedAt()),
                        TreeMap::new,
                        Collectors.toList()
                ));

        List<CompanyStatsResponse.MonthlyStat> monthlyStats = new ArrayList<>();
        for (Map.Entry<YearMonth, List<Report>> entry : byMonth.entrySet()) {
            YearMonth ym = entry.getKey();
            List<Report> monthReports = entry.getValue();
            long monthValue = monthReports.stream()
                    .filter(r -> r.getValue() != null)
                    .mapToLong(r -> r.getValue().longValue())
                    .sum();
            monthlyStats.add(new CompanyStatsResponse.MonthlyStat(
                    ym.toString(),
                    (long) monthReports.size(),
                    monthValue
                )
            );
        }

        Collections.reverse(monthlyStats);

        return new CompanyStatsResponse(
                company.getName(), company.getEmail(), company.getIce(),
                company.getPhone(), company.getPlan(),
                kpis, monthlyStats
        );
    }
}
