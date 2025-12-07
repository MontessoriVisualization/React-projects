import React from "react";
import { FaLeaf, FaClock, FaUsers, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import Card from "../layouts/card.jsx";
import axios from "axios";

const Main = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const mealPromises = Array(6)
          .fill(null)
          .map(() =>
            axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
          );
        const responses = await Promise.all(mealPromises);
        const mealData = responses.map((res) => res.data.meals[0]);
        setMeals(mealData);
        console.log(mealData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-red-50 py-20 px-8 flex items-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Delicious{" "}
              <span className="text-orange-600">Recipes</span> Today
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore thousands of mouth-watering recipes from around the world.
              Learn cooking tips, nutritional information, and share your
              culinary creations with our community.
            </p>
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Explore Recipes
              </button>
              <button className="border-2 border-orange-500 text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
          <Card
            title={meals[0]?.strMeal}
            image={meals[0]?.strMealThumb}
            description="Featured Recipe"
            loading={loading}
            height={"96"}
            OnClick={() => {}}
          ></Card>
        </div>
      </section>

      {/* Random Meal You should Try */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Random Meal You Should Try
          </h2>
          <p className="text-lg text-gray-600">
            Feeling adventurous? Here's a random meal suggestion to spice up
            your culinary journey!
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 h-full">
          {/* Large Card - Left Side */}
          <div className="flex-[1] flex min-h-96">
            <Card
              title={meals[1]?.strMeal}
              image={meals[1]?.strMealThumb}
              description={meals[1]?.strInstructions.slice(0, 100) + "..."}
              loading={loading}
              height={"auto"}
              OnClick={() => {}}
            ></Card>
          </div>

          {/* Small Cards - Right Side */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Top Row */}
            <div className="flex gap-8 flex-1 min-h-40">
              <Card
                title={meals[2]?.strMeal}
                image={meals[2]?.strMealThumb}
                description={meals[2]?.strInstructions.slice(0, 50) + "..."}
                loading={loading}
                size="0.8"
                height={"40"}
                OnClick={() => {}}
              ></Card>
              <Card
                title={meals[3]?.strMeal}
                image={meals[3]?.strMealThumb}
                description={meals[3]?.strInstructions.slice(0, 50) + "..."}
                loading={loading}
                size="0.8"
                height={"40"}
                OnClick={() => {}}
              ></Card>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-8 flex-1 min-h-40">
              <Card
                title={meals[4]?.strMeal}
                image={meals[4]?.strMealThumb}
                description={meals[4]?.strInstructions.slice(0, 50) + "..."}
                loading={loading}
                size="0.8"
                height={"40"}
                OnClick={() => {}}
              ></Card>
              <Card
                title={meals[5]?.strMeal}
                image={meals[5]?.strMealThumb}
                description={meals[5]?.strInstructions.slice(0, 50) + "..."}
                loading={loading}
                size="0.8"
                height={"40"}
                OnClick={() => {}}
              ></Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
