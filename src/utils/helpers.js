const BADGE_MAP = {
  FIABLE: 'fiable',
  ATTENTION: 'attention',
  'RISQUÉ': 'risque',
  'BLACKLISTÉ': 'blacklist',
};

export function badgeClass(level) {
  return `badge badge-${BADGE_MAP[level] || 'attention'}`;
}

export function scoreColor(score) {
  if (score >= 80) return 'var(--red)';
  if (score >= 60) return 'var(--orange)';
  if (score >= 40) return 'var(--yellow)';
  return 'var(--teal)';
}

export function statusBadgeClass(status) {
  if (status === 'Validé') return 'badge badge-fiable';
  if (status === 'Litige') return 'badge badge-risque';
  return 'badge badge-attention';
}

export function maskPhone(phone) {
  if (!phone) return '';
  return `${phone.slice(0, 4)}****${phone.slice(-2)}`;
}
