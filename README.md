# 🚚 RetourStop

> — Plateforme de gestion des risques et blacklist partagée pour les sociétés de livraison au Maroc 

---

## 🎯 À propos

**RetourStop** est une application web React destinée aux sociétés de livraison e-commerce au Maroc. Elle centralise les incidents de **retour (refus de réception, colis partiellement vidé, client injoignable)** dans une base de données partagée, permettant à toutes les sociétés partenaires de consulter le profil de risque d'un client avant toute tentative de livraison.

---

## 🔴 Le problème

Dans le e-commerce marocain, la majorité des commandes utilisent le **paiement à la livraison (COD)**. Ce modèle génère un phénomène appelé **"retour"** :

- Le client **refuse de réceptionner** le colis auprès du livreur
- Le client **ouvre le colis, prend une partie** des articles et renvoie le reste
- Le client **donne une fausse adresse** ou reste **injoignable**

> 📊 Le taux de retour au Maroc peut atteindre **30 à 40%** dans certaines niches, causant des pertes directes pour les marchands et les sociétés de livraison.

RetourStop résout ce problème en créant une **blacklist collaborative et un système de score de risque** partagé entre toutes les sociétés partenaires.

---

## ✨ Fonctionnalités

### Pour les sociétés de livraison
- 🔍 **Vérification client** — Rechercher un client par numéro de téléphone et obtenir son score de risque instantanément
- 📝 **Déclaration d'incident** — Signaler un cas de retour avec type, valeur de commande, wilaya et preuves photo
- 📊 **Dashboard analytique** — KPIs en temps réel : retours du mois, économies estimées, alertes de risque
- 📋 **Mes rapports** — Historique de tous les incidents déclarés par la société, avec export CSV
- 🚫 **Blacklist partagée** — Accès à la liste complète des clients signalés sur toute la plateforme


### Général
- 🌙 Mode sombre / clair
- 📱 Interface responsive (mobile-first pour les livreurs sur terrain)
- 🔐 Authentification par société (email + mot de passe)
- 🌍 Interface en français, données en contexte marocain (MAD, wilayas, format 06/07)

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn** >= 1.22.x

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/medbousselham99/retour-stop.git
cd retour-stop

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

---
