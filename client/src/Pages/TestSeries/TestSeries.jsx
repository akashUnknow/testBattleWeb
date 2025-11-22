import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MockTestCard from "../../component/TestSeries/MockTestCard";
import { MockTestCardData } from "../../utils/imageImportExport";
import { Input } from "@/components/ui/input";

const TestSeries = () => {
  const [searchText, setSearchText] = useState("");
  const [displayedData, setDisplayedData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const observerTarget = useRef(null);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    return MockTestCardData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  // Load more items
  const loadMoreItems = useCallback(() => {
    if (isLoading) return;
    setLoading(true);

    setTimeout(() => {
      const endIndex = page * ITEMS_PER_PAGE;
      setDisplayedData(filteredData.slice(0, endIndex));
      setLoading(false);
    }, 300);
  }, [page, filteredData, isLoading]);

  // Reset when search changes
  useEffect(() => {
    setPage(1);
    setDisplayedData(filteredData.slice(0, ITEMS_PER_PAGE));
  }, [searchText]); // ❗ filteredData removed

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          displayedData.length < filteredData.length
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.2 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [isLoading, displayedData.length, filteredData.length]);

  // Load more when page increases
  useEffect(() => {
    if (page > 1) loadMoreItems();
  }, [page, loadMoreItems]);

  return (
    <div className="w-full">
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between my-5">
          <h1 className="text-xl font-bold mb-4">Popular Test Series</h1>

          <Input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Searching..."
                        className="w-50"
          />
        </div>

        {/* Render displayedData */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedData.length > 0 ? (
            displayedData.map((item, index) => (
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

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div ref={observerTarget} className="h-10"></div>
      </div>
    </div>
  );
};

export default TestSeries;
