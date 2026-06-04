package com.retourstop.dto.response;

import java.util.List;

public class StatsResponse {
    private List<WilayaStat> wilayas;
    private Totals totals;

    public static class WilayaStat {
        private String wilaya;
        private long totalReports;
        private long fiable;
        private long attention;
        private long risque;
        private long blackliste;
        private long montantTotal;
        private double tauxRisque;

        public WilayaStat(String wilaya, long totalReports, long fiable, long attention, long risque, long blackliste, long montantTotal, double tauxRisque) {
            this.wilaya = wilaya;
            this.totalReports = totalReports;
            this.fiable = fiable;
            this.attention = attention;
            this.risque = risque;
            this.blackliste = blackliste;
            this.montantTotal = montantTotal;
            this.tauxRisque = tauxRisque;
        }

        public String getWilaya() { return wilaya; }
        public long getTotalReports() { return totalReports; }
        public long getFiable() { return fiable; }
        public long getAttention() { return attention; }
        public long getRisque() { return risque; }
        public long getBlackliste() { return blackliste; }
        public long getMontantTotal() { return montantTotal; }
        public double getTauxRisque() { return tauxRisque; }
    }

    public static class Totals {
        private long totalReports;
        private long totalClients;
        private long totalMontant;
        private long totalBlacklistes;

        public Totals(long totalReports, long totalClients, long totalMontant, long totalBlacklistes) {
            this.totalReports = totalReports;
            this.totalClients = totalClients;
            this.totalMontant = totalMontant;
            this.totalBlacklistes = totalBlacklistes;
        }

        public long getTotalReports() { return totalReports; }
        public long getTotalClients() { return totalClients; }
        public long getTotalMontant() { return totalMontant; }
        public long getTotalBlacklistes() { return totalBlacklistes; }
    }

    public StatsResponse(List<WilayaStat> wilayas, Totals totals) {
        this.wilayas = wilayas;
        this.totals = totals;
    }

    public List<WilayaStat> getWilayas() { return wilayas; }
    public Totals getTotals() { return totals; }
}
