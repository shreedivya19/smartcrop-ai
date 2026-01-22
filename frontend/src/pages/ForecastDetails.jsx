import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";

export default function ForecastDetails() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="pt-28 px-6">
        <p className="text-gray-600">No forecast data provided.</p>
      </div>
    );
  }

  const { district, crop, labels, values, type } = state;

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const avgValue = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const trend = ((values[values.length - 1] - values[0]) / values[0]) * 100;

  const chartData = {
    labels,
    datasets: [
      {
        label: `Detailed Forecast — ${crop}`,
        data: values,
        borderColor: "#22c55e",
        borderWidth: 3,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <div className="pt-28 px-8 min-h-screen">

      <h1 className="text-3xl font-bold mb-3">
        Forecast Details — {crop} ({district})
      </h1>

      <p className="text-gray-500 text-lg">
        Analysis of the {type} forecast for the next {values.length} days.
      </p>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-6 mt-10">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Minimum</h3>
          <p className="text-2xl font-bold">{minValue}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Maximum</h3>
          <p className="text-2xl font-bold">{maxValue}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Average</h3>
          <p className="text-2xl font-bold">{avgValue}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Trend</h3>
          <p className="text-2xl font-bold">{trend.toFixed(2)}%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mt-10">
        <Line data={chartData} />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl shadow mt-10 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Forecast Table</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th className="py-2">{type === "price" ? "Price (₹)" : "Demand (%)"}</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((date, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{date}</td>
                <td className="py-2">{values[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}