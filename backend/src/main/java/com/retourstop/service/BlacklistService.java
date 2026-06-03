package com.retourstop.service;

import com.retourstop.dto.response.BlacklistEntryResponse;
import com.retourstop.model.Client;
import com.retourstop.repository.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class BlacklistService {
    private final ClientRepository clientRepository;

    public BlacklistService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Page<BlacklistEntryResponse> getBlacklist(String search, String level, String wilaya, Pageable pageable) {
        String searchParam = (search != null && !search.isBlank()) ? search.trim() : null;
        String levelParam = (level != null && !level.isBlank()) ? level : null;
        String wilayaParam = (wilaya != null && !wilaya.isBlank()) ? wilaya : null;

        Page<Client> clientPage = clientRepository.findBlacklist(searchParam, levelParam, wilayaParam, pageable);

        return clientPage.map(c -> new BlacklistEntryResponse(
                c.getId(),
                c.getName(),
                maskPhone(c.getPhone()),
                c.getCity() != null ? c.getCity() : "",
                c.getScore(),
                c.getLevel(),
                c.getRetours(),
                c.getLastIncidentDate() != null
                        ? c.getLastIncidentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                        : ""
        ));
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }
}
