import StatCard from "../shared/StatCard";

export default function StatsRow({
  totalCount,
  completedCount,
  remainingCount,
  progressPercent,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <StatCard label="Total Tasks" value={totalCount} description="All time" />
      <StatCard
        label="Completed"
        value={completedCount}
        description="Done ✓"
        valueColor="#22c55e"
      />
      <StatCard
        label="Remaining"
        value={remainingCount}
        description="To do"
        valueColor="#f59e0b"
      />
      <StatCard
        label="Progress"
        value={`${progressPercent}%`}
        progress={progressPercent}
        valueColor="#6366f1"
      />
    </div>
  );
}
