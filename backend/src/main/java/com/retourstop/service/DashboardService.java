package com.retourstop.service;

import com.retourstop.dto.response.DashboardResponse;
import com.retourstop.model.IncidentEvent;
import com.retourstop.model.Report;
import com.retourstop.repository.IncidentEventRepository;
import com.retourstop.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    private final ReportRepository reportRepository;
    private final IncidentEventRepository incidentEventRepository;

    public DashboardService(ReportRepository reportRepository, IncidentEventRepository incidentEventRepository) {
        this.reportRepository = reportRepository;
        this.incidentEventRepository = incidentEventRepository;
    }

    public DashboardResponse getDashboard() {
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        long monthlyReturns = reportRepository.countSince(monthStart);
        long verifiedClients = reportRepository.countDistinctClients();
        long riskAlerts = reportRepository.countPendingSince(monthStart);
        BigDecimal savings = reportRepository.sumValueSince(monthStart)
                .multiply(BigDecimal.valueOf(0.3));

        DashboardResponse.KpiData kpis = new DashboardResponse.KpiData(
                monthlyReturns,
                verifiedClients,
                riskAlerts,
                savings
        );

        DashboardResponse.ChartData chart = buildChartData();
        List<DashboardResponse.CityRate> cityRates = buildCityRates();
        List<DashboardResponse.ActivityItem> activity = buildActivity();

        return new DashboardResponse(kpis, chart, cityRates, activity);
    }

    private DashboardResponse.ChartData buildChartData() {
        LocalDate eightWeeksAgo = LocalDate.now().minusWeeks(8);
        List<Report> weeklyReports = reportRepository.findByIncidentDateAfter(eightWeeksAgo);

        Map<String, Integer> weekCounts = new LinkedHashMap<>();
        for (int i = 7; i >= 0; i--) {
            LocalDate weekStart = LocalDate.now().minusWeeks(i).with(DayOfWeek.MONDAY);
            weekCounts.put("S-" + (8 - i), 0);
        }

        for (Report r : weeklyReports) {
            LocalDate d = r.getIncidentDate();
            if (d != null) {
                long weeksAgo = ChronoUnit.WEEKS.between(
                        d.with(DayOfWeek.MONDAY),
                        LocalDate.now().with(DayOfWeek.MONDAY)
                );
                if (weeksAgo >= 0 && weeksAgo < 8) {
                    String label = "S-" + (8 - weeksAgo);
                    weekCounts.merge(label, 1, Integer::sum);
                }
            }
        }

        return new DashboardResponse.ChartData(
                new ArrayList<>(weekCounts.keySet()),
                new ArrayList<>(weekCounts.values())
        );
    }

    private List<DashboardResponse.CityRate> buildCityRates() {
        List<Object[]> cityCounts = reportRepository.countByCity();
        return cityCounts.stream()
                .filter(row -> row[0] != null && !((String) row[0]).isBlank())
                .map(row -> {
                    String city = (String) row[0];
                    long count = (Long) row[1];
                    int rate = Math.min(100, (int) (count * 5));
                    String level = rate >= 35 ? "high" : rate >= 25 ? "med" : "low";
                    return new DashboardResponse.CityRate(city, rate, level);
                })
                .sorted((a, b) -> Integer.compare(b.getRate(), a.getRate()))
                .limit(7)
                .collect(Collectors.toList());
    }

    private List<DashboardResponse.ActivityItem> buildActivity() {
        List<IncidentEvent> recentEvents = incidentEventRepository.findTop10ByOrderByCreatedAtDesc();
        return recentEvents.stream()
                .map(e -> {
                    String text = "Signalement soumis — " + maskPhone(e.getClientPhone());
                    String time = timeAgo(e.getCreatedAt());
                    return new DashboardResponse.ActivityItem("report", text, time);
                })
                .collect(Collectors.toList());
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }

    private String timeAgo(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        Duration duration = Duration.between(dateTime, LocalDateTime.now());
        long hours = duration.toHours();
        if (hours < 1) return "Il y a quelques minutes";
        if (hours < 24) return "Il y a " + hours + "h";
        long days = duration.toDays();
        if (days < 7) return "Il y a " + days + " jours";
        return "Il y a " + (days / 7) + " semaines";
    }
}
