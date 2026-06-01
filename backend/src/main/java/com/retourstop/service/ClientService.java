package com.retourstop.service;

import com.retourstop.dto.response.ClientResponse;
import com.retourstop.model.Client;
import com.retourstop.model.IncidentEvent;
import com.retourstop.repository.ClientRepository;
import com.retourstop.repository.IncidentEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final IncidentEventRepository incidentEventRepository;

    public ClientService(ClientRepository clientRepository, IncidentEventRepository incidentEventRepository) {
        this.clientRepository = clientRepository;
        this.incidentEventRepository = incidentEventRepository;
    }

    public ClientResponse checkClient(String phone) {
        String cleaned = phone.replaceAll("\\s", "");
        Client client = clientRepository.findByPhone(cleaned).orElse(null);
        List<IncidentEvent> events = incidentEventRepository.findByClientPhoneOrderByCreatedAtDesc(cleaned);

        List<ClientResponse.TimelineEvent> timeline = events.stream()
                .map(e -> new ClientResponse.TimelineEvent(e.getCompanyName(), e.getEventDate(), e.getEventType()))
                .collect(Collectors.toList());

        if (client == null) {
            return new ClientResponse("Client inconnu", maskPhone(cleaned), 15, "FIABLE", 2, 0, new java.math.BigDecimal("0"), timeline);
        }
        return new ClientResponse(client.getName(), maskPhone(client.getPhone()), client.getScore(), client.getLevel(),
                client.getOrders(), client.getRetours(), client.getRate(), timeline);
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }
}
