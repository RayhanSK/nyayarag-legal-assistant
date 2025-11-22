import { MessageSquare, FileText, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {change && (
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {change}
            </p>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Queries"
        value="1,247"
        change="+12% this month"
        icon={<MessageSquare className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Documents Indexed"
        value="3,456"
        change="+8% this month"
        icon={<FileText className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Avg Response Time"
        value="2.3s"
        change="-15% faster"
        icon={<Clock className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Accuracy Rate"
        value="94.7%"
        change="+2.3% improvement"
        icon={<TrendingUp className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};
