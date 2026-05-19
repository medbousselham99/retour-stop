export const WILAYAS = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda',
  'Kénitra', 'Tétouan', 'Safi', 'Mohammedia', 'El Jadida', 'Nador', 'Beni Mellal',
  'Khouribga', 'Settat', 'Laâyoune', 'Dakhla', 'Autre',
];

export const COMPANIES = [
  { id: 'c1', name: 'Amana Express', email: 'ops@amana.ma', ice: '001234567890123', plan: 'Pro' },
  { id: 'c2', name: 'Livo Logistics', email: 'contact@livo.ma', ice: '001987654321098', plan: 'Starter' },
  { id: 'c3', name: 'Swiftylogix', email: 'admin@swiftylogix.ma', ice: '001112223334445', plan: 'Enterprise' },
];

export const BLACKLIST = [
  { id: 1, name: 'Youssef A.', phone: '0612****78', city: 'Casablanca', score: 94, level: 'BLACKLISTÉ', reports: 12, last: '12/04/2026' },
  { id: 2, name: 'Fatima Z.', phone: '0678****23', city: 'Rabat', score: 88, level: 'BLACKLISTÉ', reports: 9, last: '10/04/2026' },
  { id: 3, name: 'Karim B.', phone: '0655****91', city: 'Marrakech', score: 82, level: 'RISQUÉ', reports: 7, last: '08/04/2026' },
  { id: 4, name: 'Amina M.', phone: '0691****45', city: 'Fès', score: 79, level: 'RISQUÉ', reports: 6, last: '05/04/2026' },
  { id: 5, name: 'Omar H.', phone: '0623****67', city: 'Tanger', score: 76, level: 'RISQUÉ', reports: 5, last: '02/04/2026' },
  { id: 6, name: 'Salma R.', phone: '0701****34', city: 'Agadir', score: 71, level: 'RISQUÉ', reports: 4, last: '28/03/2026' },
  { id: 7, name: 'Hassan T.', phone: '0644****12', city: 'Meknès', score: 65, level: 'ATTENTION', reports: 3, last: '25/03/2026' },
  { id: 8, name: 'Nadia K.', phone: '0688****89', city: 'Oujda', score: 58, level: 'ATTENTION', reports: 3, last: '20/03/2026' },
  { id: 9, name: 'Mehdi L.', phone: '0619****56', city: 'Kénitra', score: 52, level: 'ATTENTION', reports: 2, last: '15/03/2026' },
  { id: 10, name: 'Laila F.', phone: '0672****01', city: 'Tétouan', score: 48, level: 'ATTENTION', reports: 2, last: '10/03/2026' },
  { id: 11, name: 'Rachid S.', phone: '0633****77', city: 'Safi', score: 91, level: 'BLACKLISTÉ', reports: 11, last: '11/04/2026' },
  { id: 12, name: 'Imane D.', phone: '0699****22', city: 'Mohammedia', score: 85, level: 'BLACKLISTÉ', reports: 8, last: '09/04/2026' },
  { id: 13, name: 'Adil N.', phone: '0650****88', city: 'El Jadida', score: 73, level: 'RISQUÉ', reports: 4, last: '01/04/2026' },
  { id: 14, name: 'Zineb P.', phone: '0712****44', city: 'Nador', score: 67, level: 'ATTENTION', reports: 3, last: '22/03/2026' },
  { id: 15, name: 'Hamza G.', phone: '0641****33', city: 'Beni Mellal', score: 96, level: 'BLACKLISTÉ', reports: 14, last: '14/04/2026' },
];

export const CLIENTS = {
  '0612345678': {
    name: 'Mohammed B.', phone: '0612****78', score: 87, level: 'BLACKLISTÉ',
    orders: 24, retours: 18, rate: 75,
    timeline: [
      { company: 'Société A', date: '12/04/2026', type: 'Refus de livraison' },
      { company: 'Société B', date: '28/03/2026', type: 'Colis ouvert et partiellement retourné' },
      { company: 'Société C', date: '15/02/2026', type: 'Adresse incorrecte' },
    ],
  },
  '0678901234': {
    name: 'Fatima Z.', phone: '0678****34', score: 45, level: 'ATTENTION',
    orders: 12, retours: 4, rate: 33,
    timeline: [{ company: 'Société D', date: '05/04/2026', type: 'Injoignable par téléphone' }],
  },
  '0655123491': {
    name: 'Karim B.', phone: '0655****91', score: 22, level: 'FIABLE',
    orders: 8, retours: 1, rate: 12.5, timeline: [],
  },
  '0698765432': {
    name: 'Amina M.', phone: '0698****32', score: 72, level: 'RISQUÉ',
    orders: 15, retours: 9, rate: 60,
    timeline: [
      { company: 'Société E', date: '01/04/2026', type: 'Refus de livraison' },
      { company: 'Société F', date: '20/01/2026', type: 'Colis ouvert et partiellement retourné' },
    ],
  },
};

export const REPORTS = [
  { id: 1, date: '14/04/2026', phone: '0612****78', city: 'Casablanca', type: 'Refus de livraison', value: 450, status: 'Validé' },
  { id: 2, date: '13/04/2026', phone: '0678****23', city: 'Rabat', type: 'Colis ouvert et retourné', value: 890, status: 'Validé' },
  { id: 3, date: '12/04/2026', phone: '0655****91', city: 'Marrakech', type: 'Adresse incorrecte', value: 320, status: 'En attente' },
  { id: 4, date: '11/04/2026', phone: '0691****45', city: 'Fès', type: 'Injoignable', value: 560, status: 'Validé' },
  { id: 5, date: '10/04/2026', phone: '0623****67', city: 'Tanger', type: 'Refus de livraison', value: 1200, status: 'Litige' },
  { id: 6, date: '09/04/2026', phone: '0701****34', city: 'Agadir', type: 'Autre', value: 275, status: 'Validé' },
  { id: 7, date: '08/04/2026', phone: '0644****12', city: 'Meknès', type: 'Refus de livraison', value: 680, status: 'Validé' },
  { id: 8, date: '07/04/2026', phone: '0688****89', city: 'Oujda', type: 'Colis ouvert et retourné', value: 1500, status: 'En attente' },
  { id: 9, date: '06/04/2026', phone: '0619****56', city: 'Kénitra', type: 'Refus de livraison', value: 399, status: 'Validé' },
  { id: 10, date: '05/04/2026', phone: '0672****01', city: 'Tétouan', type: 'Injoignable', value: 210, status: 'Validé' },
  { id: 11, date: '04/04/2026', phone: '0633****77', city: 'Safi', type: 'Refus de livraison', value: 750, status: 'Validé' },
  { id: 12, date: '03/04/2026', phone: '0699****22', city: 'Mohammedia', type: 'Adresse incorrecte', value: 430, status: 'Litige' },
  { id: 13, date: '02/04/2026', phone: '0650****88', city: 'El Jadida', type: 'Refus de livraison', value: 520, status: 'Validé' },
  { id: 14, date: '01/04/2026', phone: '0712****44', city: 'Nador', type: 'Colis ouvert et retourné', value: 980, status: 'En attente' },
  { id: 15, date: '31/03/2026', phone: '0641****33', city: 'Beni Mellal', type: 'Refus de livraison', value: 1100, status: 'Validé' },
  { id: 16, date: '30/03/2026', phone: '0612****78', city: 'Casablanca', type: 'Refus de livraison', value: 340, status: 'Validé' },
  { id: 17, date: '29/03/2026', phone: '0678****23', city: 'Rabat', type: 'Injoignable', value: 180, status: 'Validé' },
  { id: 18, date: '28/03/2026', phone: '0655****91', city: 'Marrakech', type: 'Autre', value: 650, status: 'En attente' },
  { id: 19, date: '27/03/2026', phone: '0691****45', city: 'Fès', type: 'Refus de livraison', value: 890, status: 'Validé' },
  { id: 20, date: '26/03/2026', phone: '0623****67', city: 'Tanger', type: 'Colis ouvert et retourné', value: 2200, status: 'Validé' },
];

export const ACTIVITY = [
  { type: 'report', text: 'Signalement soumis — 0612****78', time: 'Il y a 2h' },
  { type: 'check', text: 'Vérification client — 0678****23', time: 'Il y a 3h' },
  { type: 'report', text: 'Signalement soumis — 0655****91', time: 'Il y a 5h' },
  { type: 'check', text: 'Vérification client — 0691****45', time: 'Il y a 6h' },
  { type: 'report', text: 'Signalement soumis — 0623****67', time: 'Hier' },
  { type: 'check', text: 'Vérification client — 0701****34', time: 'Hier' },
  { type: 'report', text: 'Signalement soumis — 0644****12', time: 'Hier' },
  { type: 'check', text: 'Vérification client — 0688****89', time: 'Il y a 2 jours' },
  { type: 'report', text: 'Signalement soumis — 0619****56', time: 'Il y a 2 jours' },
  { type: 'check', text: 'Vérification client — 0672****01', time: 'Il y a 3 jours' },
];

export const CHART_DATA = {
  labels: ['S-8', 'S-7', 'S-6', 'S-5', 'S-4', 'S-3', 'S-2', 'S-1'],
  values: [42, 38, 51, 47, 55, 49, 62, 58],
};

export const CITY_RATES = [
  { city: 'Casablanca', rate: 38, level: 'high' },
  { city: 'Marrakech', rate: 35, level: 'high' },
  { city: 'Fès', rate: 32, level: 'med' },
  { city: 'Rabat', rate: 28, level: 'med' },
  { city: 'Tanger', rate: 26, level: 'med' },
  { city: 'Agadir', rate: 22, level: 'low' },
  { city: 'Meknès', rate: 24, level: 'low' },
];

export const APP_ROUTES = [
  '/dashboard', '/check', '/report', '/my-reports', '/blacklist', '/settings',
];
