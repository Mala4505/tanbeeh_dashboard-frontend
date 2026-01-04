
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select"; // ✅ new unified Select
import { AttendanceFilters } from "../hooks/useAttendance";
import { Filter, X } from "lucide-react";

interface FiltersPanelProps {
  filters: AttendanceFilters;
  onUpdate: (filters: Partial<AttendanceFilters>) => void;
  onClear: () => void;
}

export function FiltersPanel({ filters, onUpdate, onClear }: FiltersPanelProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <Card className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="w-full md:w-1/5">
          <Input
            type="date"
            label="From Date"
            name="date_from"
            value={filters.date_from || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/5">
          <Input
            type="date"
            label="To Date"
            name="date_to"
            value={filters.date_to || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/5">
          <Input
            label="Student Name"
            name="student"
            placeholder="Search student..."
            value={filters.student || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/5">
          <Input
            label="Room"
            name="room"
            placeholder="Enter room..."
            value={filters.room || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/5">
          <Select
            label="Status"
            name="status"
            value={filters.status || ""}
            onChange={handleChange}
            options={[
              { value: "", label: "All Statuses" },
              { value: "Present", label: "Present" },
              { value: "Absent", label: "Absent" },
              { value: "Late", label: "Late" },
              { value: "Excused", label: "Excused" },
            ]}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-gray-500"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
        <Button variant="primary" size="sm" onClick={() => onUpdate(filters)}>
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}
