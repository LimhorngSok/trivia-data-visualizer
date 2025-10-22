import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TriviaQuestion } from "../types";

interface Props {
  data: TriviaQuestion[];
}

const COLORS = ["#34D399", "#FBBF24", "#EF4444"];

export default function DifficultyChart({ data }: Props) {
  const grouped: Record<string, number> = data.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Questions by Difficulty</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
