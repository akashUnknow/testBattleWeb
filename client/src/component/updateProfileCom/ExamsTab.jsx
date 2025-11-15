import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExamsTab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { user } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tests/history/${user.userId}`);
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchHistory();
  }, [user?.userId]);

  return (
    <Card className="border-0 shadow-xl shadow-gray-200/50">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-indigo-50">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Your Exam History
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-10">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No History Found
            </h3>
            <p className="text-gray-500">You haven't taken any exams yet.</p>
          </div>
        ) : (
          history.map((item) => (
            <Card
              key={item.id}
              className="border p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700 capitalize">
                    {item.examName.replace(/-/g, " ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Score:{" "}
                    <span className="font-medium">
                      {item.score !== null ? item.score : "Incomplete"}
                    </span>
                  </p>
                </div>

                <div className="text-right text-sm text-gray-600">
                  <p>
                    Start:{" "}
                    <span className="font-medium">
                      {item.startTime?.slice(0, 19).replace("T", " ")}
                    </span>
                  </p>
                  <p>
                    End:{" "}
                    <span className="font-medium">
                      {item.endTime
                        ? item.endTime.slice(0, 19).replace("T", " ")
                        : "In Progress"}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ExamsTab;
