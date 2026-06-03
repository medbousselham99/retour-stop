package com.retourstop.repository;

import com.retourstop.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByPhone(String phone);

    @Query("SELECT c FROM Client c WHERE c.score >= 40 " +
           "AND (:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR c.phone LIKE CONCAT('%', :search, '%')) " +
           "AND (:level IS NULL OR c.level = :level) " +
           "AND (:wilaya IS NULL OR c.city = :wilaya)")
    Page<Client> findBlacklist(@Param("search") String search, @Param("level") String level, @Param("wilaya") String wilaya, Pageable pageable);
}
