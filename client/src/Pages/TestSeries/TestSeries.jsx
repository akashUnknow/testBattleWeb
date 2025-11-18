import { useState } from "react";
import MockTestCard from "../../component/TestSeries/MockTestCard";
import { MockTestCardData } from "../../utils/imageImportExport";
import { Input } from "@/components/ui/input";

const TestSeries = () => {
  const [searchText, setSearchText] = useState("");
  const filteredData = MockTestCardData.filter((iteam) =>
    iteam.name.toLowerCase().includes(searchText.toLocaleLowerCase())
  );
  console.log(filteredData)

  return (
    <div className="w-full">
      {/* ---------- TOP POPULAR TEST SERIES ---------- */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between my-5">
          <h1 className="text-xl font-bold mb-4">Popular Test Series</h1>
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Seaching....."
            className="w-50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <MockTestCard
                key={index}
                logo={item.logo}
                testName={item.name}
                tire={item.tire}
                totalTest={item.totalTest}
                language={item.language}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-4">
              No test series found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSeries;
