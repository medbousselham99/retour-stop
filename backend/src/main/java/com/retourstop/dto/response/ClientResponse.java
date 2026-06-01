package com.retourstop.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class ClientResponse {
    private String name;
    private String phone;
    private Integer score;
    private String level;
    private Integer orders;
    private Integer retours;
    private BigDecimal rate;
    private List<TimelineEvent> timeline;

    public static class TimelineEvent {
        private String company;
        private String date;
        private String type;

        public TimelineEvent(String company, String date, String type) {
            this.company = company;
            this.date = date;
            this.type = type;
        }

        public String getCompany() { return company; }
        public String getDate() { return date; }
        public String getType() { return type; }
    }

    public ClientResponse(String name, String phone, Integer score, String level, Integer orders, Integer retours, BigDecimal rate, List<TimelineEvent> timeline) {
        this.name = name;
        this.phone = phone;
        this.score = score;
        this.level = level;
        this.orders = orders;
        this.retours = retours;
        this.rate = rate;
        this.timeline = timeline;
    }

    public String getName() { return name; }
    public String getPhone() { return phone; }
    public Integer getScore() { return score; }
    public String getLevel() { return level; }
    public Integer getOrders() { return orders; }
    public Integer getRetours() { return retours; }
    public BigDecimal getRate() { return rate; }
    public List<TimelineEvent> getTimeline() { return timeline; }
}
