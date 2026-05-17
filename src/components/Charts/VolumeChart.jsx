import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function VolumeChart({ transactions }) {
  const chartData = transactions.slice(0, 10).map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    amount: Number(item.amount).toFixed(2),
  }));

  return (
    <div className="chart-box">
      <h3>Volume Over Time</h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={{
              fontSize: 12,
            }}
          />

          <YAxis
            tick={{
              fontSize: 12,
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
