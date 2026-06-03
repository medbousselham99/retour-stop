package com.retourstop.service;

import com.retourstop.dto.request.ReportRequest;
import com.retourstop.dto.response.ReportResponse;
import com.retourstop.model.Client;
import com.retourstop.model.IncidentEvent;
import com.retourstop.model.Report;
import com.retourstop.repository.ClientRepository;
import com.retourstop.repository.IncidentEventRepository;
import com.retourstop.repository.ReportRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final IncidentEventRepository incidentEventRepository;
    private final ClientRepository clientRepository;

    public ReportService(ReportRepository reportRepository, IncidentEventRepository incidentEventRepository, ClientRepository clientRepository) {
        this.reportRepository = reportRepository;
        this.incidentEventRepository = incidentEventRepository;
        this.clientRepository = clientRepository;
    }

    public ReportResponse createReport(Long companyId, ReportRequest req, String companyName) {
        String phone = req.getPhone().replaceAll("\\s", "");

        Report report = new Report();
        report.setCompanyId(companyId);
        report.setClientPhone(phone);
        report.setClientName(req.getName());
        report.setCity(req.getCity());
        report.setIncidentDate(LocalDate.parse(req.getDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        report.setIncidentType(req.getType());
        report.setValue(req.getValue());
        report.setNotes(req.getNotes());
        report = reportRepository.save(report);

        IncidentEvent event = new IncidentEvent();
        event.setClientPhone(phone);
        event.setCompanyName(companyName);
        event.setEventDate(report.getIncidentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        event.setEventType(report.getIncidentType());
        incidentEventRepository.save(event);

        updateClientAfterReport(phone, req.getName(), req.getCity(), report.getIncidentDate(), req.getValue());

        return toResponse(report);
    }

    private void updateClientAfterReport(String phone, String name, String city, LocalDate incidentDate, BigDecimal value) {
        Client client = clientRepository.findByPhone(phone).orElse(null);
        if (client == null) {
            client = new Client();
            client.setPhone(phone);
            client.setName(name);
            client.setOrders(0);
            client.setRetours(0);
            client.setRate(BigDecimal.ZERO);
        }

        client.setRetours(client.getRetours() + 1);
        if (name != null) client.setName(name);
        if (city != null) client.setCity(city);
        if (incidentDate != null) client.setLastIncidentDate(incidentDate);

        if (client.getOrders() > 0) {
            double rate = (double) client.getRetours() / client.getOrders() * 100;
            client.setRate(BigDecimal.valueOf(rate).setScale(2, RoundingMode.HALF_UP));
        }

        recalculateScore(client);
        clientRepository.save(client);
    }

    private void recalculateScore(Client client) {
        List<Report> clientReports = reportRepository.findByClientPhone(client.getPhone());
        BigDecimal totalValue = clientReports.stream()
                .map(r -> r.getValue() != null ? r.getValue() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int baseScore = 15;
        int incidentPoints = client.getRetours() * 5;
        int valuePoints = totalValue.divide(BigDecimal.valueOf(200), RoundingMode.DOWN).intValue();

        int score = Math.min(100, Math.max(0, baseScore + incidentPoints + valuePoints));

        client.setScore(score);
        client.setLevel(mapLevel(score));
    }

    private String mapLevel(int score) {
        if (score >= 75) return "BLACKLISTÉ";
        if (score >= 50) return "RISQUÉ";
        if (score >= 25) return "ATTENTION";
        return "FIABLE";
    }

    public String savePhoto(Long reportId, MultipartFile file) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Signalement non trouvé"));

        String uploadDir = "uploads/reports";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String filename = reportId + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        try {
            Files.write(Path.of(uploadDir, filename), file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'upload de la photo");
        }

        String photoPath = "/uploads/reports/" + filename;
        report.setPhotoPath(photoPath);
        reportRepository.save(report);

        return photoPath;
    }

    public List<ReportResponse> getReportsByCompany(Long companyId) {
        return reportRepository.findByCompanyIdOrderByCreatedAtDesc(companyId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ReportResponse toResponse(Report r) {
        return new ReportResponse(
                r.getId(),
                r.getIncidentDate() != null ? r.getIncidentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "",
                r.getClientPhone(),
                r.getCity(),
                r.getIncidentType(),
                r.getValue(),
                r.getStatus()
        );
    }
}
