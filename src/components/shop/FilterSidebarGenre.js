"use client";
import { useCallback, useEffect, useState } from "react";
import BrandLevel from "../filter/Brand";
import CategoryLevel from "../filter/Categories";
import SizeSidebar from "../filter/Size";
import PriceRangeSlider from "../filter/PriceRangeSlider";

const FilterSidebarGenre = ({ onFilterChange, data }) => {
  const [contract, setContract] = useState([]);
  const [genre, setGenre] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState([0, 2000]);

  const [showMoreSizes, setShowMoreSizes] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  // Collect all sizes and their count (occurrence in products)
  const [allSizes, setAllSizes] = useState([]);

  useEffect(() => {
    const sizeMap = new Map(); // Use a map to track sizes and count occurrences

    data.forEach((product) => {
      const shoeSizes = JSON.parse(product.nemuro_shoes); // Parse the size array

      shoeSizes.forEach((size) => {
        if (sizeMap.has(size)) {
          sizeMap.set(size, sizeMap.get(size) + 1); // Increment count for repeated sizes
        } else {
          sizeMap.set(size, 1); // Initialize count for new size
        }
      });
    });

    // Create an array from the map and sort by size (numerically/alphabetically)
    const collectedSizes = Array.from(sizeMap)
      .sort((a, b) => Number(a[0]) - Number(b[0])) // Sort by size value
      .map(([size, count]) => `${size} (${count})`);

    setAllSizes(collectedSizes);
  }, [data]);

  const displayedSizes = showMoreSizes ? allSizes : allSizes.slice(0, 5);

  const memoFilterChange = useCallback(onFilterChange, []);
  useEffect(() => {
    memoFilterChange({ category: contract, sizes, price, genre });
  }, [genre, contract, sizes, price, memoFilterChange]);

  const handlePriceChange = (value) => {
    // 'value' is an array from the slider [minPrice, maxPrice]
    setPrice(value); // Directly set the price array
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const prices = data.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setPrice([minPrice, maxPrice]); // Set initial price range based on data
    }
  }, [data]);
  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  return (
    <div className="product-sidebar">
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Filter Price:</h4>
          <PriceRangeSlider handlePriceChange={handlePriceChange} data={data} />
        </div>
      </div>
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <SizeSidebar
            toggleSizeDropdown={toggleSizeDropdown}
            isSizeDropdownOpen={isSizeDropdownOpen}
            displayedSizes={displayedSizes}
            allSizes={allSizes}
            sizes={sizes}
            setSizes={setSizes}
            showMoreSizes={showMoreSizes}
            setShowMoreSizes={setShowMoreSizes}
          />
        </div>
      </div>
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Collections</h4>
          <BrandLevel
            data={data}
            contract={contract}
            setContract={setContract}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebarGenre;
