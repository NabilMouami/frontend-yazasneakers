"use client";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRangeSlider = ({ handlePriceChange, data }) => {
  const [price, setPrice] = useState([0, 2000]); // Default values
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);

  // Calculate min and max price from the data
  useEffect(() => {
    if (data && data.length > 0) {
      const prices = data.map((product) => product.price);
      const calculatedMinPrice = Math.min(...prices);
      const calculatedMaxPrice = Math.max(...prices);

      setMinPrice(calculatedMinPrice);
      setMaxPrice(calculatedMaxPrice);
      setPrice([calculatedMinPrice, calculatedMaxPrice]); // Set initial price range based on data
    }
  }, [data]);

  const handleSliderChange = (value) => {
    setPrice(value); // Update the local state for slider
    handlePriceChange(value); // Call the parent function with new price range
  };

  return (
    <div className="w-100 d-flex flex-column gap-2">
      <Slider
        range
        min={minPrice}
        max={maxPrice}
        value={price}
        onChange={handleSliderChange} // Directly pass value, not event
        className="w-100"
        trackStyle={{ backgroundColor: "black", height: 10 }}
        railStyle={{ backgroundColor: "lightblue", height: 10 }}
        handleStyle={{
          height: 20,
          width: 20,
          backgroundColor: "gray",
        }}
      />
      <div className="d-flex align-items-center justify-content-between">
        <span className="text-dark font-weight-medium">{price[0]} Dh</span>
        <span className="text-dark font-weight-medium">{price[1]} Dh</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
