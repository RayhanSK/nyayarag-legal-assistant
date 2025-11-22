import { Calendar, Building2, MapPin, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeType = "jurisdiction" | "court" | "date" | "doctype";

interface MetadataBadgeProps {
  type: BadgeType;
  value: string;
  className?: string;
}

const iconMap = {
  jurisdiction: MapPin,
  court: Building2,
  date: Calendar,
  doctype: FileText,
};

const colorMap = {
  jurisdiction: "bg-blue-50 text-blue-700 border-blue-200",
  court: "bg-purple-50 text-purple-700 border-purple-200",
  date: "bg-green-50 text-green-700 border-green-200",
  doctype: "bg-amber-50 text-amber-700 border-amber-200",
};

export const MetadataBadge = ({ type, value, className }: MetadataBadgeProps) => {
  const Icon = iconMap[type];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border",
        colorMap[type],
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{value}</span>
    </span>
  );
};
