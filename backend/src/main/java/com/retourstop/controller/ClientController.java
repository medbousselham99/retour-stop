package com.retourstop.controller;

import com.retourstop.dto.response.ClientResponse;
import com.retourstop.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/{phone}")
    public ResponseEntity<ClientResponse> checkClient(@PathVariable String phone, Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(clientService.checkClient(phone, companyId));
    }
}
