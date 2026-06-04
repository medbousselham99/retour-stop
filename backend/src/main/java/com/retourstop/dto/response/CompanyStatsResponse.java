package com.retourstop.dto.response;

import java.util.List;

public class CompanyStatsResponse {
    private String name;
    private String email;
    private String ice;
    private String phone;
    private String plan;
    private CompanyKpis kpis;
    private List<MonthlyStat> monthlyStats;

    public static class CompanyKpis {
        private long totalReports;
        private long totalClients;
        private long totalValue;
        private long pendingReports;
        private long validReports;
        private long disputeReports;

        public CompanyKpis(long totalReports, long totalClients, long totalValue, long pendingReports, long validReports, long disputeReports) {
            this.totalReports = totalReports;
            this.totalClients = totalClients;
            this.totalValue = totalValue;
            this.pendingReports = pendingReports;
            this.validReports = validReports;
            this.disputeReports = disputeReports;
        }

        public long getTotalReports() { return totalReports; }
        public long getTotalClients() { return totalClients; }
        public long getTotalValue() { return totalValue; }
        public long getPendingReports() { return pendingReports; }
        public long getValidReports() { return validReports; }
        public long getDisputeReports() { return disputeReports; }
    }

    public static class MonthlyStat {
        private String month;
        private long reports;
        private long value;

        public MonthlyStat(String month, long reports, long value) {
            this.month = month;
            this.reports = reports;
            this.value = value;
        }

        public String getMonth() { return month; }
        public long getReports() { return reports; }
        public long getValue() { return value; }
    }

    public CompanyStatsResponse(String name, String email, String ice, String phone, String plan, CompanyKpis kpis, List<MonthlyStat> monthlyStats) {
        this.name = name;
        this.email = email;
        this.ice = ice;
        this.phone = phone;
        this.plan = plan;
        this.kpis = kpis;
        this.monthlyStats = monthlyStats;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getIce() { return ice; }
    public String getPhone() { return phone; }
    public String getPlan() { return plan; }
    public CompanyKpis getKpis() { return kpis; }
    public List<MonthlyStat> getMonthlyStats() { return monthlyStats; }
}
