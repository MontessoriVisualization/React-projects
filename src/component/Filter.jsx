import React, { useEffect } from "react";
import useFetch from "../layouts/Fetch.js";
import Card from "../layouts/card.jsx";

const Filter = () => {
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    9
  );
  const {
    data: countryData,
    loading: conloading,
    error: conerror,
  } = useFetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list", 0);

  useEffect(() => {
    if (countryData?.meals) {
      console.log(countryData.meals);
    }
  }, [countryData]);

  return (
    <div className="px-8 py-4">
      <div className="font-mono text-center mt-10 justify-between flex">
        <span className="text-2xl">Browser</span>
        <span className="text-[0.93em]">2000 recipes</span>
      </div>

      <div className="grid grid-cols-4 gap-6 ">
        {loading && <p>Loading…</p>}
        {error && <p>Error loading meals</p>}
        {!loading &&
          !error &&
          data.map((meal) => {
            const item = meal?.meals?.[0];
            if (!item) return null;
            return (
              <Card
                key={item.idMeal}
                title={item.strMeal}
                image={item.strMealThumb}
                description="Featured Recipe"
                loading={false}
                height={"96"}
                OnClick={() => {}}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
