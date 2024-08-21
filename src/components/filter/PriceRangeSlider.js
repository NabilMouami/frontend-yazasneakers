"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRangeSlider = ({ handlePriceChange, price }) => {
  return (
    <div className="w-100 d-flex flex-column gap-2">
      <Slider
        range
        min={0}
        max={2000}
        value={price}
        onChange={handlePriceChange}
        className="w-100"
        trackStyle={{ backgroundColor: "black", height: 10 }}
        railStyle={{ backgroundColor: "lightblue", height: 10 }}
        handleStyle={{
          height: 20,
          width: 20,
          backgroundColor: "gray",
        }}
      />
      <span className="text-dark font-weight-medium">
        Price: From: {price[0]} Dh To: {price[1]} Dh
      </span>
    </div>
  );
};

export default PriceRangeSlider;
