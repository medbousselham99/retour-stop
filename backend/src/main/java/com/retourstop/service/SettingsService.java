package com.retourstop.service;

import com.retourstop.dto.request.UpdateProfileRequest;
import com.retourstop.model.Company;
import com.retourstop.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {
    private final CompanyRepository companyRepository;

    public SettingsService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company getProfile(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Société non trouvée"));
    }

    public Company updateProfile(Long companyId, UpdateProfileRequest req) {
        Company company = getProfile(companyId);
        if (req.getName() != null) company.setName(req.getName());
        if (req.getEmail() != null) company.setEmail(req.getEmail());
        if (req.getIce() != null) company.setIce(req.getIce());
        if (req.getPhone() != null) company.setPhone(req.getPhone());
        return companyRepository.save(company);
    }
}
