import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";


const MockTestCard = ({logo,testName,tire,totalTest,language}) => {
  return (
    <Card className="w-full max-w-xs bg-gradient-to-b from-purple-100 to-white border border-purple-200 shadow-md rounded-xl">
      {/* Top Section */}
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <img
            src={logo} // put your SSC logo here
            alt="SSC Logo"
            className="w-12 h-12"
          />
          
        </div>

        <h2 className="text-lg font-bold leading-tight">
          {testName}
          <span className="block text-sm font-medium text-gray-500">
           {tire}
          </span>
        </h2>

        <p className="text-sm font-semibold pt-1">
          {totalTest}{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            | 25 Free Tests
          </span>
        </p>

        <p className="text-blue-600 font-medium text-sm">{language}</p>
      </CardHeader>

      {/* Middle Content */}
      <CardContent className="px-6 text-sm">
        <ul className="space-y-1 text-gray-700">
          <li>• 20 🎉 Exam Day Special</li>
          <li>• 45 SSC CGL 2025 Similar PYP</li>
          <li>• 3 🔴 Live Test</li>
          <li>• +2087 more tests</li>
        </ul>
      </CardContent>

      {/* Bottom Button */}
      <CardFooter>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          View Test Series
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MockTestCard;
