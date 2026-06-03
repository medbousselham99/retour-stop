package com.retourstop.repository;

import com.retourstop.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByCompanyIdOrderByCreatedAtDesc(Long companyId);

    List<Report> findByClientPhone(String clientPhone);

    List<Report> findByIncidentDateAfter(LocalDate date);

    @Query("SELECT COUNT(r) FROM Report r WHERE r.createdAt >= :since")
    long countSince(LocalDateTime since);

    @Query("SELECT COUNT(DISTINCT r.clientPhone) FROM Report r")
    long countDistinctClients();

    @Query("SELECT COUNT(r) FROM Report r WHERE r.status = 'En attente' AND r.createdAt >= :since")
    long countPendingSince(LocalDateTime since);

    @Query("SELECT COALESCE(SUM(r.value), 0) FROM Report r WHERE r.createdAt >= :since")
    BigDecimal sumValueSince(LocalDateTime since);

    @Query("SELECT r.city, COUNT(r) FROM Report r WHERE r.city IS NOT NULL AND r.city <> '' GROUP BY r.city")
    List<Object[]> countByCity();

    @Query(value = "SELECT * FROM reports WHERE incident_date >= :since", nativeQuery = true)
    List<Report> findSinceDate(@Param("since") LocalDate since);
}
