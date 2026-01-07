import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Flag,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface CardsSummaryProps {
  totalStudents: number;
  presentRate: number;
  absentRate: number;
  lateRate: number;
  showFlagsWidget?: boolean;
  flaggedCount?: number;
  trends?: {
    students?: number;
    present?: number;
    absent?: number;
    late?: number;
    flagged?: number;
  };
}

interface CardConfig {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: number;
  accentClass: string;
  iconBgClass: string;
  iconColorClass?: string;
  textClass: string;
  trendBgClass?: string;
  trendColorClass?: string;
  isAccent?: boolean;
}

export default function CardsSummary({
  totalStudents,
  presentRate,
  absentRate,
  lateRate,
  showFlagsWidget,
  flaggedCount,
  trends = {},
}: CardsSummaryProps) {
  const cards: CardConfig[] = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      trend: trends.students ?? 0,
      accentClass: "bg-green-600",
      iconBgClass: "bg-green-500",
      textClass: "text-white",
      trendBgClass: "bg-green-500",
      isAccent: true,
    },
    {
      title: "Present Rate",
      value: `${presentRate}%`,
      icon: UserCheck,
      trend: trends.present ?? 0,
      accentClass: "bg-card",
      iconBgClass: "bg-green-100",
      iconColorClass: "text-green-600",
      textClass: "text-card-foreground",
      trendColorClass: "text-green-600",
    },
    {
      title: "Absent Rate",
      value: `${absentRate}%`,
      icon: UserX,
      trend: trends.absent ?? 0,
      accentClass: "bg-card",
      iconBgClass: "bg-red-100",
      iconColorClass: "text-red-600",
      textClass: "text-card-foreground",
      trendColorClass: "text-red-600",
    },
    {
      title: "Late Rate",
      value: `${lateRate}%`,
      icon: Clock,
      trend: trends.late ?? 0,
      accentClass: "bg-card",
      iconBgClass: "bg-yellow-100",
      iconColorClass: "text-yellow-600",
      textClass: "text-card-foreground",
      trendColorClass: "text-yellow-600",
    },
  ];

  if (showFlagsWidget) {
    cards.push({
      title: "Flagged Students",
      value: flaggedCount ?? 0,
      icon: Flag,
      trend: trends.flagged ?? 0,
      accentClass: "bg-card",
      iconBgClass: "bg-orange-100",
      iconColorClass: "text-orange-600",
      textClass: "text-card-foreground",
      trendColorClass: "text-orange-600",
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositiveTrend = card.trend >= 0;
        const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;

        return (
          <div
            key={index}
            aria-label={`${card.title}: ${card.value}`}
            className={`${card.accentClass} p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden transition-all hover:shadow-md`}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p
                  className={`${
                    card.isAccent ? "text-green-100" : "text-muted-foreground"
                  } font-medium text-sm`}
                >
                  {card.title}
                </p>
                <div className={`p-2 ${card.iconBgClass} rounded-lg`}>
                  <Icon
                    className={`h-4 w-4 ${
                      card.isAccent ? "text-white" : card.iconColorClass
                    }`}
                  />
                </div>
              </div>
              <h3 className={`text-4xl font-bold mb-2 ${card.textClass}`}>
                {card.value}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${
                    card.isAccent
                      ? `${card.trendBgClass} text-white`
                      : `${card.trendColorClass} bg-muted`
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {Math.abs(card.trend)}%
                </span>
                <span
                  className={
                    card.isAccent ? "text-green-100" : "text-muted-foreground"
                  }
                >
                  vs last period
                </span>
              </div>
            </div>
            {card.isAccent && (
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500 rounded-full opacity-30"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
