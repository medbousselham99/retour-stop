package com.retourstop.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.math.BigDecimal;

public class ReportRequest {
    @NotBlank @Pattern(regexp = "0[67][0-9]{8}")
    private String phone;

    private String name;

    @NotBlank
    private String city;

    @NotBlank
    private String date;

    @NotBlank
    private String type;

    private BigDecimal value;
    private String notes;

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public BigDecimal getValue() { return value; }
    public void setValue(BigDecimal value) { this.value = value; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
