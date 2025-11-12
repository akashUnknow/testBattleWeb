import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award } from "lucide-react";

const ExamsTab = () => {
  return (
    <Card className="border-0 shadow-xl shadow-gray-200/50">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-indigo-50">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Your Exam Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Exam Stats Coming Soon
          </h3>
          <p className="text-gray-500">
            Detailed analytics and performance metrics will appear here
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamsTab;
