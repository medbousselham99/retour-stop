package com.retourstop.dto.response;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String ice;
    private String plan;

    public AuthResponse(String token, String name, String email, String ice, String plan) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.ice = ice;
        this.plan = plan;
    }

    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getIce() { return ice; }
    public String getPlan() { return plan; }
}
