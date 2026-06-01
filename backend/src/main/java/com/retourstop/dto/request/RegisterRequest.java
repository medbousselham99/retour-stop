package com.retourstop.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank
    private String company;

    @NotBlank @Size(min = 15, max = 15)
    @Pattern(regexp = "[0-9]+")
    private String ice;

    @NotBlank @Pattern(regexp = "0[67][0-9]{8}")
    private String phone;

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6)
    private String password;

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getIce() { return ice; }
    public void setIce(String ice) { this.ice = ice; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
