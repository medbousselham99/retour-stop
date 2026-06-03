package com.retourstop.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    private final SecretKey key;
    private final long expirationMs;

    public JwtUtil(@Value("${app.jwt.secret}") String secret,
                   @Value("${app.jwt.expiration-ms}") long expirationMs) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMs = expirationMs;
    }

    private static final long REFRESH_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000L;

    public String generateToken(Long companyId, String email) {
        Date now = new Date();
        return Jwts.builder()
                .subject(companyId.toString())
                .claim("email", email)
                .claim("type", "access")
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMs))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(Long companyId, String email) {
        Date now = new Date();
        return Jwts.builder()
                .subject(companyId.toString())
                .claim("email", email)
                .claim("type", "refresh")
                .issuedAt(now)
                .expiration(new Date(now.getTime() + REFRESH_EXPIRATION_MS))
                .signWith(key)
                .compact();
    }

    public Long getCompanyId(String token) {
        return Long.parseLong(
                Jwts.parser().verifyWith(key).build()
                        .parseSignedClaims(token)
                        .getPayload()
                        .getSubject()
        );
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
