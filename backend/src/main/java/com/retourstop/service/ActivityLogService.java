package com.retourstop.service;

import com.retourstop.model.ActivityLog;
import com.retourstop.repository.ActivityLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityLogService {
    private final ActivityLogRepository repository;

    public ActivityLogService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    public void log(Long companyId, String type, String message) {
        ActivityLog log = new ActivityLog();
        log.setCompanyId(companyId);
        log.setType(type);
        log.setMessage(message);
        repository.save(log);
    }

    public List<ActivityLog> getRecent() {
        return repository.findTop20ByOrderByCreatedAtDesc();
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }

    public void logCheck(Long companyId, String clientPhone) {
        log(companyId, "check", "Vérification client — " + maskPhone(clientPhone));
    }

    public void logReport(Long companyId, String clientPhone) {
        log(companyId, "report", "Signalement soumis — " + maskPhone(clientPhone));
    }

    public void logLogin(Long companyId) {
        log(companyId, "login", "Connexion à la plateforme");
    }
}
