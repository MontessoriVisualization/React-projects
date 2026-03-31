import React, { useEffect, useState } from "react";
import useFetch from "../layouts/Fetch.js";
import Card from "../layouts/card.jsx";
import DropDown from "../layouts/DropDown.jsx";
import LoadingScreen from "../layouts/LodingScreen.jsx";

import { GiQuill } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Filter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [ingredient, setIngredient] = useState("");
  const [resultRecNum, setResultRecNum] = useState(0);
  const navigate = useNavigate();

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
        setResultRecNum(response.data.meals?.length || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching default meals:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchDefaultMeals();
  }, []);

  const filterclass = async () => {
    console.log("Filters:", filters);
    console.log("Ingredient:", ingredient);

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

    // Get selected ingredients
    const selectedIngredients = ingredient
      .toLowerCase()
      .trim()
      .split(",")
      .map((ing) => ing.trim())
      .filter((ing) => ing.length > 0);

    console.log("Selected Countries:", selectedCountries);
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Ingredients:", selectedIngredients);

    // Check if at least one filter is selected
    if (
      selectedCountries.length === 0 &&
      selectedCategories.length === 0 &&
      selectedIngredients.length === 0
    ) {
      alert(
        "Please select at least one filter (Country, Category, or Ingredient)"
      );
      return;
    }

    setLoading(true);
    try {
      let mealArrays = [];

      // Fetch meals by country
      if (selectedCountries.length > 0) {
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
        mealArrays.push(countryMeals);
      }

      // Fetch meals by category
      if (selectedCategories.length > 0) {
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
        mealArrays.push(categoryMeals);
      }

      // Fetch meals by ingredient
      if (selectedIngredients.length > 0) {
        const ingredientPromises = selectedIngredients.map((ing) =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
          )
        );
        const ingredientResponses = await Promise.all(ingredientPromises);
        const ingredientMeals = ingredientResponses.flatMap(
          (res) => res.data.meals || []
        );
        console.log("Meals from ingredients:", ingredientMeals.length);

        // Find meals that have ALL selected ingredients
        if (ingredientResponses.length > 1) {
          const mealArraysIng = ingredientResponses.map(
            (res) => res.data.meals || []
          );
          const commonIngredientMeals = mealArraysIng[0].filter((meal) => {
            return mealArraysIng.every((meals) =>
              meals.some((m) => m.idMeal === meal.idMeal)
            );
          });
          console.log(
            "Meals with ALL ingredients:",
            commonIngredientMeals.length
          );
          mealArrays.push(commonIngredientMeals);
        } else {
          mealArrays.push(ingredientMeals);
        }
      }

      // INTERSECTION: Find meals that exist in ALL selected filter categories
      let intersectionMeals = [];

      if (mealArrays.length === 0) {
        intersectionMeals = [];
      } else if (mealArrays.length === 1) {
        intersectionMeals = mealArrays[0];
      } else {
        // Filter first array to only include meals that exist in ALL other arrays
        const firstMealIds = new Set(mealArrays[0].map((meal) => meal.idMeal));

        intersectionMeals = mealArrays[0].filter((meal) => {
          // Check if this meal exists in ALL other filter results
          return mealArrays
            .slice(1)
            .every((meals) => meals.some((m) => m.idMeal === meal.idMeal));
        });
      }

      console.log(
        "Total meals matching ALL filters:",
        intersectionMeals.length
      );

      if (intersectionMeals.length === 0) {
        console.log("No meals found matching all selected filters");
        setResultRecNum(0);
      } else {
        setResultRecNum(intersectionMeals.length);
      }

      setData([{ meals: intersectionMeals }]);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering meals:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleCardClick = (mealId) => {
    navigate(`/recipe/${mealId}`);
  };

  if (loading && data.length === 0) {
    return <LoadingScreen fullScreen={true} />;
  }

  return (
    <div className="px-8 py-4">
      <div>
        <div className="font-mono text-center mt-10 justify-between flex">
          <span className="text-2xl">Browser</span>
          <span className="text-[0.93em]">{resultRecNum} recipes</span>
        </div>
        <div className="flex gap-6 py-6 justify-start px-0">
          {/* search bar by ingredient - removed Enter key functionality */}
          <div className="border flex relative justify-between py-2 rounded-md items-center w-[194px] h-[35px] px-3.5 ">
            <input
              type="search"
              placeholder="Search by ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
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
          <button className="border flex relative justify-between py-2 rounded-md items-center w-[194px] h-[35px] px-3.5 cursor-pointer">
            Random Recipe
          </button>
          <button className="border flex relative justify-between py-2 rounded-md items-center w-[194px] h-[35px] px-3.5 cursor-pointer ">
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
        {loading && <LoadingScreen />}
        {error && (
          <div className="col-span-4 text-center py-20">
            <p className="text-red-600 font-semibold text-lg">
              Error loading meals. Please try again.
            </p>
          </div>
        )}
        {!loading &&
          !error &&
          data?.[0]?.meals?.map((meal) => {
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
                OnClick={() => handleCardClick(item.idMeal)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
