package com.retourstop.controller;

import com.retourstop.dto.response.NotificationResponse;
import com.retourstop.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getNotifications(Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(notificationService.getNotifications(companyId));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(Map.of("count", notificationService.getUnreadCount(companyId)));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id, Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        notificationService.markAsRead(id, companyId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead(Authentication auth) {
        Long companyId = (Long) auth.getPrincipal();
        notificationService.markAllAsRead(companyId);
        return ResponseEntity.ok().build();
    }
}
