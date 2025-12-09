import React, { useEffect, useRef, useState } from "react";
import useFetch from "../layouts/Fetch.js";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const DropDown = ({
  title,
  loading,
  error,
  Data,
  subname,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conname, setconname] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const containerRef = useRef(null);

  function HandelClick() {
    setIsOpen((prev) => !prev);
  }

  const HandelCheckbox = (value) => {
    return (e) => {
      setSelectedItems((prev) => {
        return {
          ...prev,
          [title]: {
            ...(prev[title] || {}),
            [value]: e.target.checked,
          },
        };
      });
    };
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(e.target)) return;
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItems);
    }
  }, [selectedItems]);

  return (
    <div ref={containerRef}>
      <div
        className="border flex relative justify-between py-2 rounded-md items-center  w-[194px] h-[35px] px-3.5 "
        onClick={HandelClick}
      >
        <span>{title}</span>
        {isOpen ? <FaAngleUp></FaAngleUp> : <FaAngleDown></FaAngleDown>}
      </div>
      <div
        className={`absolute mt-1 border rounded-md bg-white/60 z-10 grid-cols-6 p-1.5 gap-3 dropdown ${
          isOpen ? "grid" : "hidden"
        }`}
      >
        {loading && <p>Loading…</p>}
        {error && <p>Error loading countries</p>}
        {Data?.meals &&
          Data.meals.map((dta) => (
            <div
              key={dta.strArea || dta.strCategory || dta.strIngredient}
              className="inline"
            >
              <label className="flex items-center space-x-2 cursor-pointer gap-2">
                <input
                  type="checkbox"
                  onChange={HandelCheckbox(dta[subname])}
                />
                {dta[subname]}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
