import { Line } from "react-chartjs-2";

export default function ForecastGraph({ labels, values, type }) {
  return (
    <div className="mt-6">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: `${type} prediction`,
              data: values,
              borderColor: "rgb(34,197,94)",
              backgroundColor: "rgba(34,197,94,0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
}