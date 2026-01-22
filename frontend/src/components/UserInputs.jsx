export default function UserInputs({
  district, setDistrict,
  type, setType,
  horizon, setHorizon,
  DISTRICTS, TYPES
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      
      {/* District */}
      <select
        className="border rounded-xl p-3"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        {DISTRICTS.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      {/* Type */}
      <select
        className="border rounded-xl p-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      {/* Horizon */}
      <select
        className="border rounded-xl p-3"
        value={horizon}
        onChange={(e) => setHorizon(Number(e.target.value))}
      >
        <option value={7}>Next 7 days</option>
        <option value={14}>Next 14 days</option>
        <option value={30}>Next 30 days</option>
      </select>

    </div>
  );
}