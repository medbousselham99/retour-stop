package com.retourstop.dto.response;

import java.time.Duration;
import java.time.LocalDateTime;

public class NotificationResponse {
    private Long id;
    private String type;
    private String message;
    private String clientPhone;
    private boolean read;
    private String timeAgo;

    public NotificationResponse(Long id, String type, String message, String clientPhone, boolean read, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.clientPhone = clientPhone;
        this.read = read;
        this.timeAgo = formatTimeAgo(createdAt);
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public String getMessage() { return message; }
    public String getClientPhone() { return clientPhone; }
    public boolean isRead() { return read; }
    public String getTimeAgo() { return timeAgo; }

    private static String formatTimeAgo(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        Duration duration = Duration.between(dateTime, LocalDateTime.now());
        long hours = duration.toHours();
        if (hours < 1) return "À l'instant";
        if (hours < 24) return "Il y a " + hours + "h";
        long days = duration.toDays();
        if (days < 7) return "Il y a " + days + " jours";
        return "Il y a " + (days / 7) + " semaines";
    }
}
