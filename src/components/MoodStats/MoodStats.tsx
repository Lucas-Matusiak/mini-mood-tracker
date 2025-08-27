import React, { useMemo } from "react";
import "./MoodStats.css";

type MoodStatsProps = {
  moodByDate: Record<string, string>;
};

export function MoodStats({ moodByDate }: MoodStatsProps) {
  const { entries: top3, total } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const mood of Object.values(moodByDate)) {
      if (!mood) continue;
      counts[mood] = (counts[mood] || 0) + 1;
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const sliced = sorted.slice(0, 3).map(([emoji, count], i) => ({
      emoji,
      count,
      rank: i + 1,
    }));
    const totalCount = sorted.reduce((acc, [, c]) => acc + c, 0);
    return { entries: sliced, total: totalCount };
  }, [moodByDate]);

  if (total === 0 || top3.length === 0) {
    return (
      <p className="mstats-empty">Pas encore de données pour établir un top.</p>
    );
  }

  return (
    <div className="mstats">
      <h2 className="mstats-title">Top 3 des humeurs</h2>
      <div className="mstats-podium">
        {top3.map(({ emoji, count, rank }) => (
          <div key={emoji} className={`mstats-card rank-${rank}`}>
            <span className="mstats-badge">{rank}</span>
            <div className="mstats-content">
              <span className="mstats-emoji" aria-hidden>
                {emoji}
              </span>
              <span className="mstats-count">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
