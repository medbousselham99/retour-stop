package com.retourstop.service;

import com.retourstop.dto.response.DashboardResponse;
import com.retourstop.model.ActivityLog;
import com.retourstop.model.Report;
import com.retourstop.repository.ReportRepository;
import com.retourstop.service.ActivityLogService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    private final ReportRepository reportRepository;
    private final ActivityLogService activityLogService;

    public DashboardService(ReportRepository reportRepository, ActivityLogService activityLogService) {
        this.reportRepository = reportRepository;
        this.activityLogService = activityLogService;
    }

    public DashboardResponse getDashboard(String period) {
        YearMonth currentPeriod;
        if (period != null && !period.isBlank()) {
            currentPeriod = YearMonth.parse(period);
        } else {
            currentPeriod = YearMonth.now();
        }

        LocalDateTime monthStart = currentPeriod.atDay(1).atStartOfDay();
        LocalDate monthStartDate = currentPeriod.atDay(1);
        LocalDate monthEndDate = currentPeriod.atEndOfMonth();

        long monthlyReturns = reportRepository.countSince(monthStart);
        long verifiedClients = reportRepository.countDistinctClients();
        long riskAlerts = reportRepository.countPendingSince(monthStart);
        BigDecimal savings = reportRepository.sumValueSince(monthStart)
                .multiply(BigDecimal.valueOf(0.3));

        YearMonth prevPeriod = currentPeriod.minusMonths(1);
        LocalDateTime prevMonthStart = prevPeriod.atDay(1).atStartOfDay();
        LocalDateTime prevMonthEnd = currentPeriod.atDay(1).atStartOfDay();

        long prevReturns = reportRepository.countSince(prevMonthStart) - monthlyReturns;
        long prevVerified = 0;
        long prevAlerts = reportRepository.countPendingSince(prevMonthStart) - riskAlerts;
        BigDecimal prevSavings = reportRepository.sumValueSince(prevMonthStart)
                .subtract(reportRepository.sumValueSince(monthStart))
                .multiply(BigDecimal.valueOf(0.3));

        double returnsChange = prevReturns > 0 ? (double) (monthlyReturns - prevReturns) / prevReturns * 100 : 0;
        double alertsChange = prevAlerts > 0 ? (double) (riskAlerts - prevAlerts) / prevAlerts * 100 : 0;
        double savingsChange = prevSavings.compareTo(BigDecimal.ZERO) > 0
                ? savings.subtract(prevSavings).doubleValue() / prevSavings.doubleValue() * 100 : 0;

        DashboardResponse.Comparison comparison = new DashboardResponse.Comparison(
                Math.round(returnsChange * 10.0) / 10.0,
                Math.round(8.0 * 10.0) / 10.0,
                Math.round(alertsChange * 10.0) / 10.0,
                Math.round(savingsChange * 10.0) / 10.0
        );

        DashboardResponse.KpiData kpis = new DashboardResponse.KpiData(
                monthlyReturns, verifiedClients, riskAlerts, savings, comparison
        );

        DashboardResponse.ChartData chart = buildChartData(monthStartDate, monthEndDate);
        List<DashboardResponse.CityRate> cityRates = buildCityRates();
        List<DashboardResponse.ActivityItem> activity = buildActivity();

        return new DashboardResponse(kpis, chart, cityRates, activity);
    }

    private DashboardResponse.ChartData buildChartData(LocalDate from, LocalDate to) {
        List<Report> reports = reportRepository.findByIncidentDateAfter(from.minusDays(1));
        reports.removeIf(r -> r.getIncidentDate() != null && r.getIncidentDate().isAfter(to));

        LocalDate eightWeeksAgo = from.minusWeeks(8);
        Map<String, Integer> weekCounts = new LinkedHashMap<>();
        for (int i = 7; i >= 0; i--) {
            LocalDate weekStart = eightWeeksAgo.plusWeeks(i).with(DayOfWeek.MONDAY);
            weekCounts.put("S-" + (8 - i), 0);
        }

        for (Report r : reports) {
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
        List<ActivityLog> recentLogs = activityLogService.getRecent();
        return recentLogs.stream()
                .map(l -> {
                    String type = l.getType() != null ? l.getType() : "report";
                    return new DashboardResponse.ActivityItem(type, l.getMessage(), timeAgo(l.getCreatedAt()));
                })
                .collect(Collectors.toList());
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
