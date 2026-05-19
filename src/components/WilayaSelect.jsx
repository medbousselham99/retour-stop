import { WILAYAS } from '../data/mockData';

export default function WilayaSelect({ value = '', includeEmpty = true, emptyLabel = 'Sélectionner...' }) {
  return (
    <>
      {includeEmpty && <option value="">{emptyLabel}</option>}
      {WILAYAS.map((w) => (
        <option key={w} value={w}>
          {w}
        </option>
      ))}
    </>
  );
}
