package com.retourstop.service;

import com.retourstop.dto.response.NotificationResponse;
import com.retourstop.model.ClientCheck;
import com.retourstop.model.Notification;
import com.retourstop.repository.ClientCheckRepository;
import com.retourstop.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final ClientCheckRepository clientCheckRepository;

    public NotificationService(NotificationRepository notificationRepository, ClientCheckRepository clientCheckRepository) {
        this.notificationRepository = notificationRepository;
        this.clientCheckRepository = clientCheckRepository;
    }

    public void notifyClientLevelUp(String clientPhone, String clientName, String oldLevel, String newLevel, Long excludeCompanyId) {
        if (newLevel.equals(oldLevel)) return;
        if (!newLevel.equals("RISQUÉ") && !newLevel.equals("BLACKLISTÉ")) return;

        List<ClientCheck> checks = clientCheckRepository.findByClientPhone(clientPhone);
        String displayName = clientName != null ? clientName : maskPhone(clientPhone);

        for (ClientCheck check : checks) {
            if (check.getCompanyId().equals(excludeCompanyId)) continue;

            Notification notif = new Notification();
            notif.setCompanyId(check.getCompanyId());
            notif.setType("level_up");
            notif.setMessage("⚠️ " + displayName + " est passé de " + oldLevel + " à " + newLevel);
            notif.setClientPhone(clientPhone);
            notificationRepository.save(notif);
        }
    }

    public List<NotificationResponse> getNotifications(Long companyId) {
        return notificationRepository.findByCompanyIdOrderByCreatedAtDesc(companyId)
                .stream()
                .map(n -> new NotificationResponse(n.getId(), n.getType(), n.getMessage(), n.getClientPhone(), n.isRead(), n.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public long getUnreadCount(Long companyId) {
        return notificationRepository.countByCompanyIdAndReadFalse(companyId);
    }

    public void markAsRead(Long id, Long companyId) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification non trouvée"));
        if (!n.getCompanyId().equals(companyId)) {
            throw new RuntimeException("Accès refusé");
        }
        n.setRead(true);
        notificationRepository.save(n);
    }

    public void markAllAsRead(Long companyId) {
        List<Notification> unread = notificationRepository.findByCompanyIdOrderByCreatedAtDesc(companyId)
                .stream()
                .filter(n -> !n.isRead())
                .collect(Collectors.toList());
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 6) return phone;
        return phone.substring(0, 4) + "****" + phone.substring(phone.length() - 2);
    }
}
