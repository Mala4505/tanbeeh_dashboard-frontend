import { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import { UserRole } from "../lib/auth";

export interface DashboardFilters {
  from: string;
  to: string;
  darajah: string | null;
  hizb: string | null;
  hizb_group: string | null;
  threshold?: number;
}

interface FiltersBarProps {
  role: UserRole;
  onApply: (filters: DashboardFilters) => void;
  darajahOptions?: string[];
  hizbOptions?: string[];
  hizbGroupOptions?: string[];
}

export default function FiltersBar({
  role,
  onApply,
  darajahOptions = [],
  hizbOptions = [],
  hizbGroupOptions = [],
}: FiltersBarProps) {
  const [filters, setFilters] = useState<DashboardFilters>({
    from: "",
    to: "",
    darajah: null,
    hizb: null,
    hizb_group: null,
  });

  const updateFilter = (key: keyof DashboardFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value || null }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    const reset: DashboardFilters = { from: "", to: "", darajah: null, hizb: null, hizb_group: null };
    setFilters(reset);
    onApply(reset);
  };

  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
      {/* Date Range */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <label className="text-sm font-medium text-muted-foreground min-w-[100px]">
          Date Range:
        </label>
        <div className="flex flex-wrap gap-3 flex-1">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="date"
              value={filters.from}
              onChange={(e) => updateFilter("from", e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <span className="flex items-center text-muted-foreground">to</span>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="date"
              value={filters.to}
              onChange={(e) => updateFilter("to", e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <label className="text-sm font-medium text-muted-foreground min-w-[100px]">
          Filters:
        </label>
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Darajah Selector */}
          <div className="relative min-w-[140px]">
            <select
              value={filters.darajah ?? ""}
              onChange={(e) => updateFilter("darajah", e.target.value)}
              className="w-full pl-3 pr-8 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
            >
              <option value="">All Darajah</option>
              {darajahOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-3 w-3 pointer-events-none" />
          </div>

          {/* Hizb Selector */}
          <div className="relative min-w-[140px]">
            <select
              value={filters.hizb ?? ""}
              onChange={(e) => updateFilter("hizb", e.target.value)}
              className="w-full pl-3 pr-8 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
            >
              <option value="">All Hizb</option>
              {hizbOptions.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-3 w-3 pointer-events-none" />
          </div>

          {/* Hizb Group Selector */}
          <div className="relative min-w-[140px]">
            <select
              value={filters.hizb_group ?? ""}
              onChange={(e) => updateFilter("hizb_group", e.target.value)}
              className="w-full pl-3 pr-8 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
            >
              <option value="">All Groups</option>
              {hizbGroupOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-3 w-3 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors shadow-sm whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
