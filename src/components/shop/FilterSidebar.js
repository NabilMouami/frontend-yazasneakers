"use client";

import { useCallback, useEffect, useState } from "react";
import BrandLevel from "../filter/Brand";
import CategoryLevel from "../filter/Categories";
import SizeSidebar from "../filter/Size";
import PriceRangeSlider from "../filter/PriceRangeSlider";

const FilterSidebar = ({ onFilterChange }) => {
  const [contract, setContract] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState([0, 2000]);

  const [showMoreSizes, setShowMoreSizes] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  const allSizes = [
    "36 (6)",
    "36.5 (11)",
    "37.5 (21)",
    "38",
    "38.5",
    "39",
    "39.5",
    "40",
  ];
  const displayedSizes = showMoreSizes ? allSizes : allSizes.slice(0, 5);

  const memoFilterChange = useCallback(onFilterChange, []);
  useEffect(() => {
    memoFilterChange({ category: contract, sizes, price });
  }, [contract, sizes, price, memoFilterChange]);

  const handleCloseFilters = () => {
    setContract([]);
    setSizes([]);
    setPrice([0, 2000]);
  };

  const handleCheckboxChange = (e, setState) => {
    const isChecked = e.target.checked;
    const filterValue = e.target.value;

    setState((prev) => {
      if (isChecked) {
        return [...prev, filterValue];
      } else {
        return prev.filter((value) => value !== filterValue);
      }
    });
  };

  const handlePriceChange = (value) => {
    if (Array.isArray(value)) {
      setPrice(value);
    }
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };
  return (
    <div className="product-sidebar">
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Category</h4>
          <CategoryLevel />
        </div>
      </div>
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Filter</h4>
          <PriceRangeSlider
            handlePriceChange={handlePriceChange}
            price={price}
          />
        </div>
      </div>

      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Color</h4>
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
          <h4 className="product-sidebar__title mb-25">Brand</h4>
          <BrandLevel contract={contract} setContract={setContract} />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
