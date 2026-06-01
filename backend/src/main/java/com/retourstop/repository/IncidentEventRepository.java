package com.retourstop.repository;

import com.retourstop.model.IncidentEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentEventRepository extends JpaRepository<IncidentEvent, Long> {
    List<IncidentEvent> findByClientPhoneOrderByCreatedAtDesc(String clientPhone);
}
