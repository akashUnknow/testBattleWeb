import { Trophy, Target, Hash } from "lucide-react";
import StatsCard from "./StatsCard";

const ProfileStats = ({ totalScore, testsCompleted, rank }) => {
  const stats = [
    {
      icon: Trophy,
      value: totalScore,
      label: "Total Score",
      gradient: "shadow-blue-100/50 bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: Target,
      value: testsCompleted,
      label: "Tests Completed",
      gradient: "shadow-indigo-100/50 bg-gradient-to-br from-indigo-500 to-indigo-600",
    },
    {
      icon: Hash,
      value: rank,
      label: "Your Rank",
      gradient: "shadow-purple-100/50 bg-gradient-to-br from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default ProfileStats;