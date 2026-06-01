package com.retourstop.service;

import com.retourstop.dto.request.ReportRequest;
import com.retourstop.dto.response.ReportResponse;
import com.retourstop.model.IncidentEvent;
import com.retourstop.model.Report;
import com.retourstop.repository.IncidentEventRepository;
import com.retourstop.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final IncidentEventRepository incidentEventRepository;

    public ReportService(ReportRepository reportRepository, IncidentEventRepository incidentEventRepository) {
        this.reportRepository = reportRepository;
        this.incidentEventRepository = incidentEventRepository;
    }

    public ReportResponse createReport(Long companyId, ReportRequest req, String companyName) {
        Report report = new Report();
        report.setCompanyId(companyId);
        report.setClientPhone(req.getPhone().replaceAll("\\s", ""));
        report.setClientName(req.getName());
        report.setCity(req.getCity());
        report.setIncidentDate(LocalDate.parse(req.getDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        report.setIncidentType(req.getType());
        report.setValue(req.getValue());
        report.setNotes(req.getNotes());
        report = reportRepository.save(report);

        IncidentEvent event = new IncidentEvent();
        event.setClientPhone(report.getClientPhone());
        event.setCompanyName(companyName);
        event.setEventDate(report.getIncidentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        event.setEventType(report.getIncidentType());
        incidentEventRepository.save(event);

        return toResponse(report);
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
