// src/components/SkeletonCard.tsx
import React from "react";

export default function SkeletonCard({ width = "100%", height = "120px" }) {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded-md"
      style={{ width, height }}
    />
  );
}
