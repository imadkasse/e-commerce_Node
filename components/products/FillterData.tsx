"use client";
import React, { useState } from "react";
import { useQuery } from "./QueryContext";
import { Range, getTrackBackground } from "react-range";

const FillterData = () => {
  const { query, setQurey } = useQuery();
  const [category, setCategory] = useState<string>("all-category");
  const [rating, setRating] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const STEP = 1;
  const MIN = 0;
  const MAX = 500;

  const handelFlilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rating);
    setQurey(
      `/api/eco/products?rating[gte]=${rating}${
        category === "all-category" ? "" : `&category=${category}`
      }&price[gte]=${minPrice}&price[lte]=${maxPrice}`
    );
    console.log(query);
  };

  return (
    <div className=" xs:w-full  col-span-1  h-screen md:sticky md:top-16 border-r-2 rounded-xl">
      <section className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col gap-6">
          {/* عنوان الفلترة */}
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Filter Products
          </h2>

          {/* نموذج الفلترة */}
          <form
            className="space-y-4 flex flex-col gap-5"
            onSubmit={handelFlilter}
          >
            {/* الفلترة حسب الفئة */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                name="category"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="all-category">All Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home-Kitchen">Home & Kitchen</option>
                <option value="Books">Books</option>
                <option value="Sports-Outdoors">Sports & Outdoors</option>
              </select>
            </div>

            {/*  الفلترة حسب السعر    */}
            <div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">
                Price Range
              </h1>

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>Min Price: ${minPrice}</span>
                <span>Max Price: ${maxPrice}</span>
              </div>

              <Range
                values={[minPrice, maxPrice]}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                  setMinPrice(values[0]);
                  setMaxPrice(values[1]);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: getTrackBackground({
                        values: [minPrice, maxPrice],
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: MIN,
                        max: MAX,
                      }),
                      marginTop: "16px",
                    }}
                    className="rounded-md"
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#548BF4",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
              />
            </div>

            {/* الفلترة حسب العلامة التقييم */}
            <div>
              <label className="flex justify-between items-center py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <h1>rating</h1>
                <p>{rating}</p>
              </label>
              <input
                value={rating}
                onChange={(e) => {
                  setRating(Number(e.target.value));
                }}
                type="range"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {/* زر الفلترة */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Filter
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FillterData;
