import React from "react";

const Card = ({
  title,
  image,
  description,
  OnClick,
  loading,
  height,
  size,
}) => {
  const baseSize = size ? parseFloat(size) : 1;

  return (
    <>
      <div className="relative">
        {loading ? (
          <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl animate-pulse"></div>
        ) : (
          <div
            className="relative group cursor-pointer"
            onClick={OnClick}
            style={{ fontSize: `${baseSize}em` }}
          >
            <img
              src={image}
              alt={title}
              className={`w-full ${
                height === "auto" ? "h-auto" : `h-${height}`
              } object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p
                className="font-semibold bg-orange-500 px-3 py-1 rounded-full inline-block mb-2"
                style={{ fontSize: "0.875em" }}
              >
                {title}
              </p>
              <h3 className="font-bold" style={{ fontSize: "1.5em" }}>
                {description}
              </h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
