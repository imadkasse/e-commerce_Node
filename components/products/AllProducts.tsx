import {
  AddShoppingCartOutlined,
  BlockOutlined,
  LocalMallOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  category: string;
  quantity: number;
  rating: number;
  newPrice?: number;
  availability: boolean;
}
interface Props {
  qurey: string;
}

const AllProducts = async ({ qurey }: Props) => {
  const data = await axios.get(`${process.env.BACK_URL}${qurey}`);
  const products: Product[] = data.data.data.products;
  return (
    <div className="py-14  grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 items-center xs:justify-items-center ">
      {products.map((product) => {
        return (
          <div
            key={product._id}
            className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="relative">
              <Link
                className={`w-full group ${
                  !product.availability ? "disabled" : ""
                }`}
                href={`${
                  !product.availability ? "/" : `/product/${product._id}`
                }`}
              >
                <Image
                  className="p-1 rounded-xl w-full hover:scale-105 hoverEle  "
                  src="/imgs/products/prod1.jpg"
                  alt="product image"
                  width={500}
                  height={500}
                />
              </Link>
              {/* Sold Out */}
              {!product.availability ? (
                <div className="p-2 absolute top-0 z-0 m-2 ">
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
                  {product.name}
                </h5>
                <p className="dark:text-gray-300 text-gray-400  py-3 text-md">
                  {product.category}
                </p>
              </div>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Rating
                    className="text-red-400"
                    name="half-rating-read"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {product.rating}
                </span>
              </div>
              <div className="flex justify-center pb-3 gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <span className="text-sm font-semibold  text-red-900 dark:text-red-600 line-through">
                  {product.newPrice !== 0 ? `$${product.newPrice}` : ""}
                </span>
              </div>
              {!product.availability ? (
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
                    href={`/product/${product._id}`}
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
        );
      })}
    </div>
  );
};

export default AllProducts;
