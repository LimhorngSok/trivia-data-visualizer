import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TriviaQuestion, ChartData } from "../types";

interface Props {
  data: TriviaQuestion[];
}

export default function CategoryChart({ data }: Props) {
  const grouped: Record<string, number> = data.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData: ChartData[] = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Questions by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
