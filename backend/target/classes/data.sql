-- Prebuilt companies (password: "password123" BCrypt hash)
INSERT IGNORE INTO companies (name, email, password, ice, plan) VALUES
('Amana Express', 'ops@amana.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '001234567890123', 'Pro'),
('Livo Logistics', 'contact@livo.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '001987654321098', 'Starter'),
('Swiftylogix', 'admin@swiftylogix.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '001112223334445', 'Enterprise');

-- Mock clients
INSERT IGNORE INTO clients (phone, name, score, level, orders, retours, rate) VALUES
('0612345678', 'Mohammed B.', 87, 'BLACKLISTÉ', 24, 18, 75.00),
('0678901234', 'Fatima Z.', 45, 'ATTENTION', 12, 4, 33.00),
('0655123491', 'Karim B.', 22, 'FIABLE', 8, 1, 12.50),
('0698765432', 'Amina M.', 72, 'RISQUÉ', 15, 9, 60.00);

-- Incident events for clients
INSERT IGNORE INTO incident_events (client_phone, company_name, event_date, event_type) VALUES
('0612345678', 'Société A', '12/04/2026', 'Refus de livraison'),
('0612345678', 'Société B', '28/03/2026', 'Colis ouvert et partiellement retourné'),
('0612345678', 'Société C', '15/02/2026', 'Adresse incorrecte'),
('0678901234', 'Société D', '05/04/2026', 'Injoignable par téléphone'),
('0698765432', 'Société E', '01/04/2026', 'Refus de livraison'),
('0698765432', 'Société F', '20/01/2026', 'Colis ouvert et partiellement retourné');
