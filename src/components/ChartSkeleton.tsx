// src/components/ChartSkeleton.tsx

import { Card } from "./ui/Card";

export function ChartSkeleton() {
  return (
    <Card className="p-6">
      <div className="animate-pulse space-y-4">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>

        {/* Chart area placeholder */}
        <div className="h-64 bg-gray-200 rounded"></div>

        {/* Legend placeholders */}
        <div className="flex space-x-4 mt-4">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </Card>
  );
}
