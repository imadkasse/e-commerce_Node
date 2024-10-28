import {
  AddShoppingCartOutlined,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  LocalMallOutlined,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReviewModel from "./ReviewModel";
import AddReview from "./AddReview";

interface Id {
  id: string;
}
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: Review[];
}

const ProductModal: React.FC<Id> = async ({ id }) => {
  const data = await axios.get(
    `${process.env.BACK_URL}/api/eco/products/${id}`
  );
  const product: Product = data.data.data.data;

  return (
    <div className="">
      <div className="font-sans  w-full text-light-text dark:text-dark-text  bg-light-background/10 dark:bg-gray-800 ">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 border p-6 rounded-lg">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded-lg border relative">
                <Image
                  width={5000}
                  height={5000}
                  src="/imgs/1.png"
                  alt="Product"
                  className="w-3/4 rounded object-cover mx-auto"
                />
                <button type="button" className="absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    fill="#ccc"
                    className="mr-1 hover:fill-[#333] dark:hover:fill-[#fff] hoverEle"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 border cursor-pointer">
                  <Image
                    width={150}
                    height={150}
                    src="/imgs/products/prod1.jpg"
                    alt="Product2"
                    className="w-full"
                  />
                </div>
                <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 border cursor-pointer">
                  <Image
                    width={150}
                    height={150}
                    src="/imgs/products/prod2.jpg"
                    alt="Product2"
                    className="w-full"
                  />
                </div>
                <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 border cursor-pointer">
                  <Image
                    width={150}
                    height={150}
                    src="/imgs/products/prod3.jpg"
                    alt="Product2"
                    className="w-full"
                  />
                </div>
                <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 border cursor-pointer">
                  <Image
                    width={150}
                    height={150}
                    src="/imgs/products/prod4.jpg"
                    alt="Product2"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold ">
                {product.name} | {product.category}
              </h2>

              <div className="flex space-x-2 mt-4">
                <Rating
                  className="text-red-400"
                  name="half-rating-read"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />
                <h4 className=" text-base">{product.rating}</h4>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <p className=" text-3xl font-bold">${product.price}</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button className="min-w-[200px] px-4 py-3 flex items-center justify-evenly bg-red-400 hover:bg-red-400/60 hoverEle text-white text-sm font-semibold rounded">
                  Buy now
                  <LocalMallOutlined />
                </button>
                <button className="min-w-[200px] px-4 py-2.5 flex items-center justify-evenly border border-red-400 bg-transparent hover:bg-red-400 hoverEle hover:text-white dark:text-white text-sm font-semibold rounded">
                  Add to cart
                  <AddShoppingCartOutlined />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-md border p-6">
            <h1 className="text-2xl font-bold">Reviews:</h1>
            <div>
              {/* Comments  */}
              <ReviewModel reviews={product.reviews} />
            </div>
            <div>
              <AddReview id={id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
