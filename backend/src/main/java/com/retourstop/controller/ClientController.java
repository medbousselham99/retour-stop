package com.retourstop.controller;

import com.retourstop.dto.response.ClientResponse;
import com.retourstop.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/{phone}")
    public ResponseEntity<ClientResponse> checkClient(@PathVariable String phone) {
        return ResponseEntity.ok(clientService.checkClient(phone));
    }
}
