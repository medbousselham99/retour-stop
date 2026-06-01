# RetourStop

> Plateforme full-stack de gestion des risques et blacklist partagée pour les sociétés de livraison au Maroc.

**Stack :** React 19 + Vite 6 — Spring Boot 3.4 — MySQL 8 — JWT

---

## Problème

Au Maroc, le paiement à la livraison (COD) domine le e-commerce. Il génère un taux de retour de **30 à 40%** : refus de réception, colis ouverts et partiellement vidés, adresses fictives, clients injoignables. Chaque incident coûte en moyenne **2 400 MAD** aux transporteurs et marchands.

**RetourStop** résout ce problème en centralisant les signalements dans une base de données partagée entre toutes les sociétés partenaires. Chaque numéro de téléphone reçoit un **score de risque** calculé en temps réel, consultable avant toute tentative de livraison.

---

## Stack technique

| Couche | Technologie |
|--------|------------|
| **Frontend** | React 19, Vite 6, React Router 7, Chart.js, Lucide Icons |
| **Backend** | Spring Boot 3.4, Spring Data JPA, Spring Security |
| **Base de données** | MySQL 8, JPA/Hibernate (auto-schema) |
| **Authentification** | JWT (jjwt 0.12) |
---

## Fonctionnalités

- **Dashboard analytique** — KPIs en temps réel (retours du mois, économies, alertes)
- **Vérification client** — Recherche par numéro de téléphone, score de risque, historique des incidents
- **Signalement d'incident** — Formulaire avec type, valeur, wilaya, preuves photo
- **Mes signalements** — Historique filtré par date/ville/type, export CSV
- **Blacklist partagée** — Liste complète des profils à risque, recherche et filtres
- **Paramètres société** — Profil, clé API, notifications, abonnement
- **Mode sombre / clair**
- **Interface responsive** (mobile-first, adaptée livreurs terrain)
- **Interface en français**, contexte marocain (MAD, wilayas, format 06/07)

---

## Installation

### Prérequis

- **Java** 17+
- **Node.js** 18+
- **Maven** 3.9+
- **MySQL** 8+
- **npm** 9+

### 1. Cloner

```bash
git clone https://github.com/medbousselham99/retour-stop.git
cd retour-stop
```

### 2. Backend

```bash
# Créer la base de données
mysql -u root -e "CREATE DATABASE retourstop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Lancer l'API (port 8080)
cd backend
mvn spring-boot:run
```

> La config par défaut utilise `root` sans mot de passe sur `localhost:3306`. Modifier `backend/src/main/resources/application.yml` si besoin.

### 3. Frontend

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev (port 5173)
npm run dev
```

### 4. Ouvrir

- Frontend : [http://localhost:5173](http://localhost:5173)
- API : [http://localhost:8080](http://localhost:8080)

---

## Comptes de test

| Email | Mot de passe | Société | Plan |
|-------|-------------|---------|------|
| `ops@amana.ma` | `password123` | Amana Express | Pro |
| `contact@livo.ma` | `password123` | Livo Logistics | Starter |
| `admin@swiftylogix.ma` | `password123` | Swiftylogix | Enterprise |

Numéros clients à tester : `0612345678`, `0678901234`, `0655123491`, `0698765432`

---

## API REST

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| `POST` | `/api/auth/login` | — | Connexion → JWT |
| `POST` | `/api/auth/register` | — | Inscription société |
| `GET` | `/api/clients/{phone}` | JWT | Vérification client |
| `POST` | `/api/reports` | JWT | Créer un signalement |
| `GET` | `/api/reports` | JWT | Mes signalements |
| `GET` | `/api/blacklist` | JWT | Blacklist (search/level/wilaya) |
| `GET` | `/api/dashboard` | JWT | KPIs + chart + activité |
| `GET` | `/api/settings/profile` | JWT | Profil société |
| `PUT` | `/api/settings/profile` | JWT | Modifier profil |

---

## Structure du projet

```
retour-stop/
├── src/                          # Frontend React
│   ├── components/               # Composants réutilisables
│   │   └── layout/               # AppShell, Sidebar, Topbar, PublicNav
│   ├── context/AppContext.jsx    # État global (auth, theme, modale)
│   ├── pages/                    # Pages (Dashboard, Check, Report…)
│   ├── utils/
│   │   ├── api.js                # Client HTTP (fetch + JWT)
│   │   └── helpers.js            # Badges, couleurs, masque téléphone
│   ├── data/mockData.js          # Références statiques (wilayas, villes)
│   ├── App.jsx                   # Routage
│   ├── main.jsx                  # Entrypoint
│   └── index.css                 # Styles complets (variables, thème)
├── backend/
│   └── src/main/java/com/retourstop/
│       ├── config/               # Security, JWT, CORS, DataInitializer
│       ├── controller/           # Endpoints REST
│       ├── model/                # Entités JPA (Company, Client, Report…)
│       ├── repository/           # Spring Data JPA
│       ├── service/              # Logique métier
│       ├── dto/request/          # DTOs entrée
│       ├── dto/response/         # DTOs sortie
│       └── exception/            # Gestion d'erreurs globale
├── package.json
├── vite.config.js
├── AGENTS.md
└── README.md
```

---

## Commandes utiles

```bash
# Frontend
npm run dev        # Serveur dev (localhost:5173)
npm run build      # Build production → dist/
npm run preview    # Preview production build

# Backend
cd backend
mvn compile              # Compiler seulement
mvn spring-boot:run      # Lancer l'API (localhost:8080)
```

---