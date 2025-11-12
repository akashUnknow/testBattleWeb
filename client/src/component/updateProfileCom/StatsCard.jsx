import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ icon: Icon, value, label, gradient }) => {
  return (
    <Card className={`border-0 shadow-lg ${gradient} text-white`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-8 h-8 opacity-80" />
          <span className="text-3xl font-bold">{value}</span>
        </div>
        <p className="font-medium opacity-90">{label}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;