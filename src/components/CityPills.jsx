import { CITY_RATES } from '../data/mockData';

export default function CityPills({ rates }) {
  const data = rates || CITY_RATES;
  return (
    <div className="city-pills">
      {data.map((c) => (
        <span key={c.city} className={`city-pill ${c.level}`}>
          {c.city} — {c.rate}%
        </span>
      ))}
    </div>
  );
}
