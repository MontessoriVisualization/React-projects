import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaYoutube, FaClock, FaUsers } from "react-icons/fa";
import LoadingScreen from "../layouts/LodingScreen.jsx";

const RecipeDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals && response.data.meals.length > 0) {
          setMeal(response.data.meals[0]);
          setLoading(false);
        } else {
          setError("Meal not found");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching meal details:", err);
        setError("Failed to load recipe");
        setLoading(false);
      }
    };
    fetchMealDetail();
  }, [id]);

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return <LoadingScreen fullScreen={true} />;
  }

  if (error || !meal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-50 to-red-50 px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Recipe Not Found
          </h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/filter"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="bg-white">
      {/* Back Button */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 px-8 py-4">
        <Link
          to="/filter"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
        >
          <FaArrowLeft /> Back to Recipes
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {meal.strCategory}
              </span>
              <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {meal.strMeal}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                <span className="font-semibold text-gray-800">Cuisine:</span>{" "}
                {meal.strArea}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <FaClock className="text-xl" />
                  <span className="font-semibold">Prep Time</span>
                </div>
                <p className="text-gray-700 font-bold">30 mins</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <FaUsers className="text-xl" />
                  <span className="font-semibold">Servings</span>
                </div>
                <p className="text-gray-700 font-bold">4 people</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <span className="text-xl">⭐</span>
                  <span className="font-semibold">Difficulty</span>
                </div>
                <p className="text-gray-700 font-bold">Easy</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 inline-flex items-center gap-2"
                >
                  <FaYoutube /> Watch Video
                </a>
              )}
              <button className="border-2 border-orange-500 text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-all duration-200">
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">🧪</span> Ingredients
              </h2>
              <ul className="space-y-4">
                {ingredients.map((ing, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-start pb-4 border-b border-orange-200 last:border-b-0"
                  >
                    <span className="text-gray-700 font-medium flex-1">
                      {ing.name}
                    </span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                      {ing.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">👨‍🍳</span> Instructions
              </h2>
              <div className="space-y-4">
                {meal.strInstructions
                  .split("\n")
                  .filter((instruction) => instruction.trim())
                  .map((instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">
                          {instruction.trim()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      {(meal.strTags || meal.strSource) && (
        <section className="bg-gradient-to-r from-orange-50 to-red-50 py-12 px-8 mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {meal.strTags && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {meal.strTags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white border-2 border-orange-500 text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-orange-50 transition-colors cursor-pointer"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Recipes CTA */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Discover More Recipes
          </h2>
          <p className="text-gray-600 mb-8">
            Explore other delicious recipes in our collection
          </p>
          <Link
            to="/filter"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-block"
          >
            Browse All Recipes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;
