const FILTERS = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export function FilterBar({ filter, onChange, stats }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__filters" role="tablist" aria-label="할 일 필터">
        {FILTERS.map(({ value, label }) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              className={`filter-bar__filter ${active ? 'filter-bar__filter--active' : ''}`}
              onClick={() => onChange(value)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="filter-bar__stats" aria-live="polite">
        전체 {stats.total} · 진행 중 {stats.active} · 완료 {stats.completed}
      </div>
    </div>
  );
}
