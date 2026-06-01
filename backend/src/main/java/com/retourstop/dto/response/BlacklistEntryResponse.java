package com.retourstop.dto.response;

public class BlacklistEntryResponse {
    private Long id;
    private String name;
    private String phone;
    private String city;
    private Integer score;
    private String level;
    private Integer reports;
    private String last;

    public BlacklistEntryResponse(Long id, String name, String phone, String city, Integer score, String level, Integer reports, String last) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.city = city;
        this.score = score;
        this.level = level;
        this.reports = reports;
        this.last = last;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getCity() { return city; }
    public Integer getScore() { return score; }
    public String getLevel() { return level; }
    public Integer getReports() { return reports; }
    public String getLast() { return last; }
}
