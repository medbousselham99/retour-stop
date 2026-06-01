package com.retourstop.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class DashboardResponse {
    private KpiData kpis;
    private ChartData chart;
    private List<CityRate> cityRates;
    private List<ActivityItem> activity;

    public static class KpiData {
        private long monthlyReturns;
        private long verifiedClients;
        private long riskAlerts;
        private BigDecimal savings;

        public KpiData(long monthlyReturns, long verifiedClients, long riskAlerts, BigDecimal savings) {
            this.monthlyReturns = monthlyReturns;
            this.verifiedClients = verifiedClients;
            this.riskAlerts = riskAlerts;
            this.savings = savings;
        }

        public long getMonthlyReturns() { return monthlyReturns; }
        public long getVerifiedClients() { return verifiedClients; }
        public long getRiskAlerts() { return riskAlerts; }
        public BigDecimal getSavings() { return savings; }
    }

    public static class ChartData {
        private List<String> labels;
        private List<Integer> values;

        public ChartData(List<String> labels, List<Integer> values) {
            this.labels = labels;
            this.values = values;
        }

        public List<String> getLabels() { return labels; }
        public List<Integer> getValues() { return values; }
    }

    public static class CityRate {
        private String city;
        private int rate;
        private String level;

        public CityRate(String city, int rate, String level) {
            this.city = city;
            this.rate = rate;
            this.level = level;
        }

        public String getCity() { return city; }
        public int getRate() { return rate; }
        public String getLevel() { return level; }
    }

    public static class ActivityItem {
        private String type;
        private String text;
        private String time;

        public ActivityItem(String type, String text, String time) {
            this.type = type;
            this.text = text;
            this.time = time;
        }

        public String getType() { return type; }
        public String getText() { return text; }
        public String getTime() { return time; }
    }

    public DashboardResponse(KpiData kpis, ChartData chart, List<CityRate> cityRates, List<ActivityItem> activity) {
        this.kpis = kpis;
        this.chart = chart;
        this.cityRates = cityRates;
        this.activity = activity;
    }

    public KpiData getKpis() { return kpis; }
    public ChartData getChart() { return chart; }
    public List<CityRate> getCityRates() { return cityRates; }
    public List<ActivityItem> getActivity() { return activity; }
}
