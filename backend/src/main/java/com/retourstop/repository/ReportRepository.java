package com.retourstop.repository;

import com.retourstop.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByCompanyIdOrderByCreatedAtDesc(Long companyId);

    @Query("SELECT COUNT(r) FROM Report r WHERE r.createdAt >= :since")
    long countSince(LocalDateTime since);

    @Query("SELECT COUNT(DISTINCT r.clientPhone) FROM Report r")
    long countDistinctClients();

    @Query("SELECT COUNT(r) FROM Report r WHERE r.status = 'En attente' AND r.createdAt >= :since")
    long countPendingSince(LocalDateTime since);
}
