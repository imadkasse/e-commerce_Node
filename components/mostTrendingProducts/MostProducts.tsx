import {
  AddShoppingCartOutlined,
  BlockOutlined,
  LocalMallOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MostProducts = () => {
  const soldOut = false;
  return (
    <div className="px-4  sm:px-10  py-10  bg-light-background/50 dark:bg-gray-800 ">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl dark:text-white font-semibold">
          Most Products
        </h1>
        <p className="text-4xl text-red-400 font-bold">
          Discover the most trending products in My Website
        </p>
      </div>
      <div>
        <div className="py-14  grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-14 items-center xs:justify-items-center ">
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
              <Link
                href={`${soldOut ? "/" : "/product"}`}
                className="w-full group "
              >
                <Image
                  className="p-1 rounded-xl w-full hover:scale-105 hoverEle "
                  src="/imgs/products/prod1.jpg"
                  alt="product image"
                  width={500}
                  height={500}
                />
              </Link>
              {/* Sold Out */}
              {soldOut ? (
                <div className="p-2 absolute top-0 z-50 m-2 ">
                  <div className="flex items-center justify-between gap-2 text-xs bg-gray-300 p-1 rounded-2xl">
                    <BlockOutlined className="text-sm" />
                    <h1>Sold Out </h1>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="px-2 pb-5 ">
              <div>
                <h5 className="pt-3 text-lg font-semibold tracking-tight text-gray-900 dark:text-white ">
                  Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                </h5>
                <p className="dark:text-gray-300 text-gray-400  py-3 text-md">
                  T-shirt
                </p>
              </div>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  5.0
                </span>
              </div>
              <div className="flex justify-center pb-3 gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  $299
                </span>
                <span className="text-sm font-semibold  text-red-900 dark:text-red-600 line-through">
                  $599
                </span>
              </div>
              {soldOut ? (
                <div className="flex items-center justify-between w-full gap-3">
                  <button
                    disabled
                    className="disabled:cursor-not-allowed disabled:bg-red-400/60 grow flex items-center p-2  gap-1 justify-between  hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 "
                  >
                    <p>Buy Now</p>
                    <LocalMallOutlined />
                  </button>
                  <button
                    disabled
                    className="disabled:cursor-not-allowed disabled:bg-red-400/60  flex items-center p-2 justify-between hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 "
                  >
                    <AddShoppingCartOutlined />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full gap-3">
                  <Link
                    href={"/product"}
                    className="grow flex items-center p-2  gap-1 justify-between  hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 "
                  >
                    <p>Buy Now</p>
                    <LocalMallOutlined />
                  </Link>
                  <button className="  flex items-center p-2 justify-between hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 ">
                    <AddShoppingCartOutlined />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" p-2 flex justify-center">
          <Link
            href={"/"}
            className="border-red-400 border-2    px-5 py-2.5 rounded-md text-sm tracking-wider   outline-none bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MostProducts;
