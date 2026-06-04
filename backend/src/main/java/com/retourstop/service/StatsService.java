package com.retourstop.service;

import com.retourstop.dto.response.StatsResponse;
import com.retourstop.model.Report;
import com.retourstop.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatsService {
    private final ReportRepository reportRepository;

    public StatsService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public StatsResponse getWilayaStats() {
        List<Report> allReports = reportRepository.findAll();
        Map<String, List<Report>> byCity = allReports.stream()
                .filter(r -> r.getCity() != null && !r.getCity().isBlank())
                .collect(Collectors.groupingBy(Report::getCity));

        List<StatsResponse.WilayaStat> wilayaStats = new ArrayList<>();

        for (Map.Entry<String, List<Report>> entry : byCity.entrySet()) {
            String city = entry.getKey();
            List<Report> reports = entry.getValue();
            long total = reports.size();

            Map<String, Long> levelCount = reports.stream()
                    .collect(Collectors.groupingBy(
                            r -> {
                                String status = r.getStatus();
                                if ("Validé".equals(status)) return "fiable";
                                if ("Litige".equals(status)) return "risque";
                                return "attention";
                            },
                            Collectors.counting()
                    ));

            long fiable = levelCount.getOrDefault("fiable", 0L);
            long attention = levelCount.getOrDefault("attention", 0L);
            long risque = levelCount.getOrDefault("risque", 0L);
            long blackliste = levelCount.getOrDefault("blackliste", 0L);

            long montantTotal = reports.stream()
                    .filter(r -> r.getValue() != null)
                    .mapToLong(r -> r.getValue().longValue())
                    .sum();

            double tauxRisque = total > 0 ? (double) (risque + blackliste) / total * 100 : 0;

            wilayaStats.add(new StatsResponse.WilayaStat(
                    city, total, fiable, attention, risque, blackliste, montantTotal,
                    Math.round(tauxRisque * 10.0) / 10.0
            ));
        }

        wilayaStats.sort((a, b) -> Long.compare(b.getTotalReports(), a.getTotalReports()));

        long totalReports = allReports.size();
        long totalClients = reportRepository.countDistinctClients();
        long totalMontant = allReports.stream()
                .filter(r -> r.getValue() != null)
                .mapToLong(r -> r.getValue().longValue())
                .sum();
        long totalBlacklistes = wilayaStats.stream()
                .mapToLong(w -> w.getBlackliste() + w.getRisque())
                .sum();

        StatsResponse.Totals totals = new StatsResponse.Totals(totalReports, totalClients, totalMontant, totalBlacklistes);

        return new StatsResponse(wilayaStats, totals);
    }
}
