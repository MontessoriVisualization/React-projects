import React, { use, useEffect, useState } from "react";
import useFetch from "../layouts/Fetch.js";
import Card from "../layouts/card.jsx";
import DropDown from "../layouts/DropDown.jsx";

import { GiQuill } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Filter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [namCon, setnamCon] = useState(
    "American" /* Default country filter value */
  );

  const {
    data: countryData,
    loading: conloading,
    error: conerror,
  } = useFetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list", 0);

  const {
    data: categoryData,
    loading: catLoading,
    error: catError,
  } = useFetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list", 0);

  const {
    data: ingredientData,
    loading: ingLoading,
    error: ingError,
  } = useFetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list", 0);

  useEffect(() => {
    const CountryMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${namCon}`
        );
        console.log("Meals for country", namCon, response.data);
        setData([response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals by country:", error);
        setError(error);
        setLoading(false);
      }
    };
    CountryMeal();
  }, [namCon]);

  const filterclass = () => {
    console.log(filters);
    if (filters.Country) {
      console.log("Country filter applied:", filters.Country);
      for (const [key, value] of Object.entries(filters.Country)) {
        if (value) {
          console.log(` ${key}`);
          setnamCon(key);
        }
      }
    }
    if (filters.Category) {
      console.log("Category filter applied:", filters.Category);
    }
  };

  return (
    <div className="px-8 py-4">
      <div>
        <div className="font-mono text-center mt-10 justify-between flex">
          <span className="text-2xl">Browser</span>
          <span className="text-[0.93em]">2000 recipes</span>
        </div>
        <div className="flex gap-6 py-6 justify-start px-0">
          {/* search bar by ingredient */}

          <div className="border flex relative justify-between py-2 rounded-md items-center  w-[194px] h-[35px] px-3.5 ">
            <input type="search" placeholder="Search by ingredient" />

            <FaSearch></FaSearch>
          </div>
          <DropDown
            title={"Country"}
            loading={conloading}
            error={conerror}
            Data={countryData}
            subname={"strArea"}
            onSelectionChange={(sa) => {
              setFilters((prev) => ({ ...prev, ...sa }));
            }}
          />
          <DropDown
            title={"Category"}
            loading={catLoading}
            error={catError}
            Data={categoryData}
            subname={"strCategory"}
            onSelectionChange={(ca) => {
              setFilters((prev) => ({ ...prev, ...ca }));
            }}
          />
          <button className="border flex relative justify-between py-2 rounded-md items-center  w-[194px] h-[35px] px-3.5 cursor-pointer">
            Random Recipe
          </button>
          <button className="border flex relative justify-between py-2 rounded-md items-center  w-[194px] h-[35px] px-3.5 cursor-pointer ">
            Ingredient
          </button>
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border flex relative py-2 rounded-md items-center text-white w-[130px] h-[35px] px-3.5 justify-center cursor-pointer"
            onClick={filterclass}
          >
            <GiQuill></GiQuill> Filter
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 ">
        {loading && <p>Loading…</p>}
        {error && <p>Error loading meals</p>}
        {!loading &&
          !error &&
          data?.[0]?.meals?.map((meal) => {
            console.log("meal", meal);
            const item = meal;
            if (!item) return null;
            return (
              <Card
                key={item.idMeal}
                title={item.strMeal}
                image={item.strMealThumb}
                description="Featured Recipe"
                loading={false}
                height={"94"}
                OnClick={() => {}}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
