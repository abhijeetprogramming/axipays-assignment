import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function StatusChart({ transactions }) {
  const success = transactions.filter(
    (item) => item.status === "success",
  ).length;

  const failed = transactions.filter((item) => item.status === "failed").length;

  const pending = transactions.filter(
    (item) => item.status === "pending",
  ).length;

  const data = [
    {
      name: "Success",
      value: success,
    },
    {
      name: "Failed",
      value: failed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#f59e0b"];

  return (
    <div className="chart-box">
      <h3>Transaction Status</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="75%"
            paddingAngle={4}
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusChart;
