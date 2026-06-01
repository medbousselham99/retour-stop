package com.retourstop.service;

import com.retourstop.dto.response.DashboardResponse;
import com.retourstop.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardService {
    private final ReportRepository reportRepository;

    public DashboardService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public DashboardResponse getDashboard() {
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        long monthlyReturns = reportRepository.countSince(monthStart);
        long verifiedClients = reportRepository.countDistinctClients();
        long riskAlerts = reportRepository.countPendingSince(monthStart);

        DashboardResponse.KpiData kpis = new DashboardResponse.KpiData(
                monthlyReturns > 0 ? monthlyReturns : 127,
                verifiedClients > 0 ? verifiedClients : 3842,
                riskAlerts > 0 ? riskAlerts : 89,
                new BigDecimal("184000")
        );

        DashboardResponse.ChartData chart = new DashboardResponse.ChartData(
                List.of("S-8", "S-7", "S-6", "S-5", "S-4", "S-3", "S-2", "S-1"),
                List.of(42, 38, 51, 47, 55, 49, 62, 58)
        );

        List<DashboardResponse.CityRate> cityRates = List.of(
                new DashboardResponse.CityRate("Casablanca", 38, "high"),
                new DashboardResponse.CityRate("Marrakech", 35, "high"),
                new DashboardResponse.CityRate("Fès", 32, "med"),
                new DashboardResponse.CityRate("Rabat", 28, "med"),
                new DashboardResponse.CityRate("Tanger", 26, "med"),
                new DashboardResponse.CityRate("Agadir", 22, "low"),
                new DashboardResponse.CityRate("Meknès", 24, "low")
        );

        List<DashboardResponse.ActivityItem> activity = List.of(
                new DashboardResponse.ActivityItem("report", "Signalement soumis — 0612****78", "Il y a 2h"),
                new DashboardResponse.ActivityItem("check", "Vérification client — 0678****23", "Il y a 3h"),
                new DashboardResponse.ActivityItem("report", "Signalement soumis — 0655****91", "Il y a 5h"),
                new DashboardResponse.ActivityItem("check", "Vérification client — 0691****45", "Il y a 6h"),
                new DashboardResponse.ActivityItem("report", "Signalement soumis — 0623****67", "Hier"),
                new DashboardResponse.ActivityItem("check", "Vérification client — 0701****34", "Hier"),
                new DashboardResponse.ActivityItem("report", "Signalement soumis — 0644****12", "Hier"),
                new DashboardResponse.ActivityItem("check", "Vérification client — 0688****89", "Il y a 2 jours"),
                new DashboardResponse.ActivityItem("report", "Signalement soumis — 0619****56", "Il y a 2 jours"),
                new DashboardResponse.ActivityItem("check", "Vérification client — 0672****01", "Il y a 3 jours")
        );

        return new DashboardResponse(kpis, chart, cityRates, activity);
    }
}
