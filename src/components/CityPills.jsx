import { CITY_RATES } from '../data/mockData';

export default function CityPills() {
  return (
    <div className="city-pills">
      {CITY_RATES.map((c) => (
        <span key={c.city} className={`city-pill ${c.level}`}>
          {c.city} — {c.rate}%
        </span>
      ))}
    </div>
  );
}
