package com.retourstop.service;

import com.retourstop.dto.response.ClientResponse;
import com.retourstop.model.Client;
import com.retourstop.model.ClientCheck;
import com.retourstop.model.Company;
import com.retourstop.model.IncidentEvent;
import com.retourstop.repository.ClientCheckRepository;
import com.retourstop.repository.ClientRepository;
import com.retourstop.repository.CompanyRepository;
import com.retourstop.repository.IncidentEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final IncidentEventRepository incidentEventRepository;
    private final ClientCheckRepository clientCheckRepository;
    private final CompanyRepository companyRepository;
    private final ActivityLogService activityLogService;

    private static final Map<String, Integer> PLAN_LIMITS = Map.of(
        "Starter", 50,
        "Pro", 200,
        "Enterprise", Integer.MAX_VALUE
    );

    public ClientService(ClientRepository clientRepository, IncidentEventRepository incidentEventRepository,
                         ClientCheckRepository clientCheckRepository, CompanyRepository companyRepository,
                         ActivityLogService activityLogService) {
        this.clientRepository = clientRepository;
        this.incidentEventRepository = incidentEventRepository;
        this.clientCheckRepository = clientCheckRepository;
        this.companyRepository = companyRepository;
        this.activityLogService = activityLogService;
    }

    public ClientResponse checkClient(String phone, Long companyId) {
        String cleaned = phone.replaceAll("\\s", "");

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Société non trouvée"));
        enforcePlanLimit(company);

        Client client = clientRepository.findByPhone(cleaned).orElse(null);
        List<IncidentEvent> events = incidentEventRepository.findByClientPhoneOrderByCreatedAtDesc(cleaned);

        List<ClientResponse.TimelineEvent> timeline = events.stream()
                .map(e -> new ClientResponse.TimelineEvent(e.getCompanyName(), e.getEventDate(), e.getEventType()))
                .collect(Collectors.toList());

        if (!clientCheckRepository.existsByCompanyIdAndClientPhone(companyId, cleaned)) {
            ClientCheck check = new ClientCheck();
            check.setCompanyId(companyId);
            check.setClientPhone(cleaned);
            clientCheckRepository.save(check);
        }

        activityLogService.logCheck(companyId, cleaned);

        if (client == null) {
            return new ClientResponse("Client inconnu", maskPhone(cleaned), 15, "FIABLE", 2, 0, new java.math.BigDecimal("0"), timeline);
        }
        return new ClientResponse(client.getName(), maskPhone(client.getPhone()), client.getScore(), client.getLevel(),
                client.getOrders(), client.getRetours(), client.getRate(), timeline);
    }

    private void enforcePlanLimit(Company company) {
        int limit = PLAN_LIMITS.getOrDefault(company.getPlan(), 50);
        if (limit == Integer.MAX_VALUE) return;

        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        long todayChecks = clientCheckRepository.countByCompanyIdAndCheckedAtAfter(company.getId(), todayStart);

        if (todayChecks >= limit) {
            throw new RuntimeException(
                "Limite de " + limit + " vérifications par jour atteinte pour votre forfait " + company.getPlan() +
                ". Passez à un forfait supérieur pour vérifier plus de clients."
            );
        }
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }
}
