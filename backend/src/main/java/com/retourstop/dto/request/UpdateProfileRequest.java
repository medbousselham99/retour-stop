package com.retourstop.dto.request;

public class UpdateProfileRequest {
    private String name;
    private String ice;
    private String email;
    private String phone;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIce() { return ice; }
    public void setIce(String ice) { this.ice = ice; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
