"use client";

import { useSelector } from "react-redux";

const BrandLevel = ({ contract, setContract }) => {
  const { categoryList } = useSelector((state) => state.Categories) || {};

  const handleCheckboxChange = (e, setState) => {
    const { checked, value } = e.target;
    setState((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  return (
    <>
      {categoryList?.map((item) => (
        <div className="form-check" key={item.id}>
          <input
            className="form-check-input"
            id={`brand${item.id}`}
            type="checkbox"
            checked={contract.includes(item.name)}
            value={item.name}
            onChange={(e) => handleCheckboxChange(e, setContract)}
          />
          <label className="form-check-label" htmlFor={`brand${item.id}`}>
            {item.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </label>
        </div>
      ))}
    </>
  );
};

export default BrandLevel;
