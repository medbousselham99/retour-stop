package com.retourstop.service;

import com.retourstop.config.JwtUtil;
import com.retourstop.dto.request.LoginRequest;
import com.retourstop.dto.request.RegisterRequest;
import com.retourstop.dto.response.AuthResponse;
import com.retourstop.model.Company;
import com.retourstop.repository.CompanyRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(CompanyRepository companyRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(LoginRequest req) {
        Company company = companyRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));
        if (!passwordEncoder.matches(req.getPassword(), company.getPassword())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }
        String token = jwtUtil.generateToken(company.getId(), company.getEmail());
        return new AuthResponse(token, company.getName(), company.getEmail(), company.getIce(), company.getPlan());
    }

    public AuthResponse register(RegisterRequest req) {
        if (companyRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }
        Company company = new Company();
        company.setName(req.getCompany());
        company.setEmail(req.getEmail());
        company.setPassword(passwordEncoder.encode(req.getPassword()));
        company.setIce(req.getIce());
        company.setPhone(req.getPhone());
        company.setPlan("Starter");
        company = companyRepository.save(company);
        String token = jwtUtil.generateToken(company.getId(), company.getEmail());
        return new AuthResponse(token, company.getName(), company.getEmail(), company.getIce(), company.getPlan());
    }
}
