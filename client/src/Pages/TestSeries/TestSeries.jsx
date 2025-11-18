import React from "react";
import MockTestCard from "../../component/TestSeries/MockTestCard";
import { MockTestCardData } from "../../utils/imageImportExport";

const TestSeries = () => {
  return (
    <div>
      <div className="mt-6 px-4">
        <h1 className="text-xl font-bold mb-4">Popular Test Series</h1>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 items-center justify-center">
          {MockTestCardData.map((item, index) => (
            <MockTestCard
              key={index}
              logo={item.logo}
              testName={item.name}
              tire={item.tire}
              totalTest={item.totalTest}
              language={item.language}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold mb-4">Live Tests & Free Quizzes</h1>
      </div>
    </div>
  );
};

export default TestSeries;
