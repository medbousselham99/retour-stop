package com.retourstop.config;

import com.retourstop.model.Client;
import com.retourstop.model.Company;
import com.retourstop.model.IncidentEvent;
import com.retourstop.repository.ClientRepository;
import com.retourstop.repository.CompanyRepository;
import com.retourstop.repository.IncidentEventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    private final CompanyRepository companyRepository;
    private final ClientRepository clientRepository;
    private final IncidentEventRepository incidentEventRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(CompanyRepository companyRepository, ClientRepository clientRepository,
                           IncidentEventRepository incidentEventRepository, PasswordEncoder passwordEncoder) {
        this.companyRepository = companyRepository;
        this.clientRepository = clientRepository;
        this.incidentEventRepository = incidentEventRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (companyRepository.count() > 0) return;

        String hash = passwordEncoder.encode("password123");

        companyRepository.saveAll(java.util.List.of(
                createCompany("Amana Express", "ops@amana.ma", hash, "001234567890123", "Pro"),
                createCompany("Livo Logistics", "contact@livo.ma", hash, "001987654321098", "Starter"),
                createCompany("Swiftylogix", "admin@swiftylogix.ma", hash, "001112223334445", "Enterprise")
        ));

        clientRepository.saveAll(java.util.List.of(
                createClient("0612345678", "Mohammed B.", "Casablanca", java.time.LocalDate.of(2026, 4, 12), 87, "BLACKLISTÉ", 24, 18, 75.00),
                createClient("0678901234", "Fatima Z.", "Rabat", java.time.LocalDate.of(2026, 4, 5), 45, "ATTENTION", 12, 4, 33.00),
                createClient("0655123491", "Karim B.", "Marrakech", null, 22, "FIABLE", 8, 1, 12.50),
                createClient("0698765432", "Amina M.", "Fès", java.time.LocalDate.of(2026, 4, 1), 72, "RISQUÉ", 15, 9, 60.00)
        ));

        incidentEventRepository.saveAll(java.util.List.of(
                createEvent("0612345678", "Société A", "12/04/2026", "Refus de livraison"),
                createEvent("0612345678", "Société B", "28/03/2026", "Colis ouvert et partiellement retourné"),
                createEvent("0612345678", "Société C", "15/02/2026", "Adresse incorrecte"),
                createEvent("0678901234", "Société D", "05/04/2026", "Injoignable par téléphone"),
                createEvent("0698765432", "Société E", "01/04/2026", "Refus de livraison"),
                createEvent("0698765432", "Société F", "20/01/2026", "Colis ouvert et partiellement retourné")
        ));
    }

    private Company createCompany(String name, String email, String password, String ice, String plan) {
        Company c = new Company();
        c.setName(name);
        c.setEmail(email);
        c.setPassword(password);
        c.setIce(ice);
        c.setPlan(plan);
        return c;
    }

    private Client createClient(String phone, String name, String city, java.time.LocalDate lastIncidentDate, int score, String level, int orders, int retours, double rate) {
        Client c = new Client();
        c.setPhone(phone);
        c.setName(name);
        c.setCity(city);
        c.setLastIncidentDate(lastIncidentDate);
        c.setScore(score);
        c.setLevel(level);
        c.setOrders(orders);
        c.setRetours(retours);
        c.setRate(BigDecimal.valueOf(rate));
        return c;
    }

    private IncidentEvent createEvent(String phone, String company, String date, String type) {
        IncidentEvent e = new IncidentEvent();
        e.setClientPhone(phone);
        e.setCompanyName(company);
        e.setEventDate(date);
        e.setEventType(type);
        return e;
    }
}
