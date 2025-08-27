import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { moodColors } from "../../utils/moodColors";
import "./MoodChart.css";

type MoodChartProps = {
  moodByDate: Record<string, string>;
};

type Filter = "week" | "month" | "6months";
const now = new Date();

export function MoodChart({ moodByDate }: MoodChartProps) {
  const [filter, setFilter] = useState<Filter>("month");

  

  const fromDate = useMemo(() => {
    const date = new Date();
    if (filter === "week") date.setDate(now.getDate() - 6);
    else if (filter === "month") date.setMonth(now.getMonth() - 1);
    else if (filter === "6months") date.setMonth(now.getMonth() - 6);
    return date;
  }, [filter]);

  const filteredMoods = useMemo(() => {
    return Object.entries(moodByDate)
      .map(([dateStr, emoji]) => ({ date: new Date(dateStr), emoji }))
      .filter(({ date }) => date >= fromDate && date <= now);
  }, [moodByDate, fromDate, now]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredMoods.forEach(({ emoji }) => {
      counts[emoji] = (counts[emoji] || 0) + 1;
    });
    const total = filteredMoods.length;
    return Object.entries(counts).map(([emoji, count]) => ({
      emoji,
      value: count,
      percentage: ((count / total) * 100).toFixed(1),
    }));
  }, [filteredMoods]);

  const startDate = fromDate.toLocaleDateString("fr-FR");
  const endDate = now.toLocaleDateString("fr-FR");

  return (
    <div className="mood-chart">
      <h2>Répartition des humeurs</h2>
      <p className="mood-chart-range">
        {startDate} — {endDate}
      </p>

      <div className="mood-chart-filter">
        {["week", "month", "6months"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key as Filter)}
            className={filter === key ? "active" : ""}
          >
            {key === "week" ? "Semaine" : key === "month" ? "Mois" : "6 mois"}
          </button>
        ))}
      </div>

      {chartData.length === 0 ? (
        <p>Aucune humeur enregistrée pour cette période.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="45%"
              outerRadius="80%"
              label={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={moodColors[entry.emoji] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, _: string, props: any) => {
                const label = props.payload.emoji;
                const percent = props.payload.percentage;
                return [`${value} fois (${percent}%)`, label];
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "0.8rem",
                marginTop: "10px",
                whiteSpace: "normal",
                textAlign: "center",
                maxWidth: "90%",
              }}
              formatter={(_: string, entry: any) => {
                const emoji = entry.payload.emoji;
                const percent = entry.payload.percentage;
                return `${emoji} — ${percent}%`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
