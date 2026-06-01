package com.retourstop.dto.response;

import java.math.BigDecimal;

public class ReportResponse {
    private Long id;
    private String date;
    private String phone;
    private String city;
    private String type;
    private BigDecimal value;
    private String status;

    public ReportResponse(Long id, String date, String phone, String city, String type, BigDecimal value, String status) {
        this.id = id;
        this.date = date;
        this.phone = phone;
        this.city = city;
        this.type = type;
        this.value = value;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getDate() { return date; }
    public String getPhone() { return phone; }
    public String getCity() { return city; }
    public String getType() { return type; }
    public BigDecimal getValue() { return value; }
    public String getStatus() { return status; }
}
