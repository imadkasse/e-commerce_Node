"use client";
import React, { useState } from "react";
import { useQuery } from "./QueryContext";

const FillterData = () => {
  const { query, setQurey } = useQuery();
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handelFlilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rating);
    setQurey(`/api/eco/products?rating[gte]=${rating}&${category}`);

    console.log(query);
  };

  return (
    <div className="w-[350px] h-screen sticky top-16 border">
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
                <option value="">All Category</option>
                <option value="category=Electronics">Electronics</option>
                <option value="category=Clothing">Clothing</option>
                <option value="category=Home-Kitchen">Home & Kitchen</option>
                <option value="category=Books">Books</option>
                <option value="category=Sports-Outdoors">
                  Sports & Outdoors
                </option>
              </select>
            </div>

            {/*  الفلترة حسب السعر    */}
            <div>
              <label
                htmlFor="price"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                rating
              </label>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="1000"
                step="1"
                className="w-full focus-within:bg-red-500"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>0</span>
                <span>1000</span>
              </div>
            </div>

            {/* الفلترة حسب العلامة التقييم */}
            <div>
              <label
                htmlFor="rating"
                className="flex justify-between items-center py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
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
                فلترة
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FillterData;
