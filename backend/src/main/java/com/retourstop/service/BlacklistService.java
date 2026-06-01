package com.retourstop.service;

import com.retourstop.dto.response.BlacklistEntryResponse;
import com.retourstop.model.Client;
import com.retourstop.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlacklistService {
    private final ClientRepository clientRepository;

    public BlacklistService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<BlacklistEntryResponse> getBlacklist(String search, String level, String wilaya) {
        return clientRepository.findAll().stream()
                .filter(c -> c.getScore() >= 40)
                .filter(c -> search == null || search.isBlank() || c.getName() != null && c.getName().toLowerCase().contains(search.toLowerCase()) || c.getPhone().contains(search))
                .filter(c -> level == null || level.isBlank() || level.equals(c.getLevel()))
                .filter(c -> wilaya == null || wilaya.isBlank())
                .map(c -> new BlacklistEntryResponse(
                        c.getId(),
                        c.getName(),
                        maskPhone(c.getPhone()),
                        "",  // city not stored on client yet
                        c.getScore(),
                        c.getLevel(),
                        c.getRetours(),
                        ""
                ))
                .collect(Collectors.toList());
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }
}
