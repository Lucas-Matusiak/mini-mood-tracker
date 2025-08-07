import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './MoodChart.css'

const COLORS = ['#A4C8E1', '#D9D6E5', '#BFD8B8', '#FDC5C5', '#E0B0FF', '#FFD580', '#B0BEC5', '#CFD8DC']

function groupMoods(moodByDate: Record<string, string>) {
  const counter: Record<string, number> = {}
  Object.values(moodByDate).forEach((mood) => {
    counter[mood] = (counter[mood] || 0) + 1
  })
  return Object.entries(counter).map(([mood, count]) => ({ name: mood, value: count }))
}

export function MoodChart({ moodByDate }: { moodByDate: Record<string, string> }) {
  const data = groupMoods(moodByDate)

  if (data.length === 0) return null

  return (
    <div className="mood-chart">
      <h2>Répartition des humeurs</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            outerRadius={80}
            innerRadius={50}
            paddingAngle={4}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
