package com.retourstop.repository;

import com.retourstop.model.ClientCheck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClientCheckRepository extends JpaRepository<ClientCheck, Long> {
    List<ClientCheck> findByClientPhone(String clientPhone);
    boolean existsByCompanyIdAndClientPhone(Long companyId, String clientPhone);
    long countByCompanyIdAndCheckedAtAfter(Long companyId, LocalDateTime since);
}
