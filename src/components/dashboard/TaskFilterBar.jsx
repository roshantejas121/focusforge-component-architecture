const FILTERS = ["all", "active", "completed"];

export default function TaskFilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 12,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {FILTERS.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "1px solid",
              borderColor: filter === option ? "#6366f1" : "#2d2d44",
              background:
                filter === option ? "rgba(99,102,241,0.15)" : "transparent",
              color: filter === option ? "#a78bfa" : "#64748b",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <input
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks..."
        style={{
          background: "#1a1a2e",
          border: "1px solid #2d2d44",
          borderRadius: 10,
          padding: "8px 14px",
          color: "#e2e8f0",
          fontSize: 13,
          outline: "none",
          width: 200,
        }}
      />
    </div>
  );
}
