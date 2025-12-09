import React, { useEffect, useState } from "react";
import useFetch from "../layouts/Fetch.js";
import Card from "../layouts/card.jsx";
import DropDown from "../layouts/DropDown.jsx";

import { GiQuill } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Filter = () => {
  // const {id} = useParams();
  // const nav = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalFilters, setTotalFilters] = useState({});
  const [filters, setFilters] = useState({});
  const [ingredient, setIngredient] = useState("");

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

  // Fetch default meals by American cuisine on component mount
  useEffect(() => {
    const fetchDefaultMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=American`
        );
        setData([response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching default meals:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchDefaultMeals();
  }, []);

  const searchInd = (value) => {
    console.log("Searching ingredient...");
    console.log("Input value:", value);
    if (ingLoading) return;

    console.log("Input query:", query);

    if (!query) return;
    setIngredient(query);
    console.log("Searching by ingredient:", ingredient);
  };
  useEffect(() => {
    // const fetchByIngredient = async () => {
    // try{
    // }
    // }
  }, [ingredient]);

  const filterclass = async () => {
    console.log("Filters:", filters);

    // Get selected countries and categories
    const selectedCountries = filters.Country
      ? Object.entries(filters.Country)
          .filter(([, value]) => value)
          .map(([key]) => key)
      : [];

    const selectedCategories = filters.Category
      ? Object.entries(filters.Category)
          .filter(([, value]) => value)
          .map(([key]) => key)
      : [];

    console.log("Selected Countries:", selectedCountries);
    console.log("Selected Categories:", selectedCategories);

    if (selectedCountries.length === 0 || selectedCategories.length === 0) {
      console.log("Please select both Country and Category");
      return;
    }

    setLoading(true);
    try {
      // Fetch meals by country
      const countryPromises = selectedCountries.map((country) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
        )
      );
      const countryResponses = await Promise.all(countryPromises);
      const countryMeals = countryResponses.flatMap(
        (res) => res.data.meals || []
      );
      console.log("Meals from countries:", countryMeals.length);

      // Fetch meals by category
      const categoryPromises = selectedCategories.map((category) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        )
      );
      const categoryResponses = await Promise.all(categoryPromises);
      const categoryMeals = categoryResponses.flatMap(
        (res) => res.data.meals || []
      );
      console.log("Meals from categories:", categoryMeals.length);

      // INTERSECTION: Find meals that exist in BOTH country AND category
      const countryMealIds = new Set(countryMeals.map((meal) => meal.idMeal));
      const intersectionMeals = categoryMeals.filter((meal) =>
        countryMealIds.has(meal.idMeal)
      );

      console.log("Meals matching BOTH filters:", intersectionMeals.length);

      if (intersectionMeals.length === 0) {
        console.log("No meals found matching both filters");
      }

      setData([{ meals: intersectionMeals }]);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering meals:", error);
      setError(error);
      setLoading(false);
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
            <input
              type="search"
              placeholder="Search by ingredient"
              onKeyDown={(e) => e.key === "Enter" && searchInd(e.value)}
              className="outline-none"
            />

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
            // console.log("meal", meal);
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
