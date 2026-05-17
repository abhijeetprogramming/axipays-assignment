import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CurrencyChart({ transactions }) {
  const currencyMap = {};

  transactions.forEach((item) => {
    if (currencyMap[item.currency]) {
      currencyMap[item.currency] += 1;
    } else {
      currencyMap[item.currency] = 1;
    }
  });

  const data = Object.keys(currencyMap).map((key) => ({
    name: key,
    value: currencyMap[key],
  }));

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0f766e",
  ];

  return (
    <div className="chart-box">
      <h3>Currency Distribution</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="75%"
            paddingAngle={3}
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CurrencyChart;
