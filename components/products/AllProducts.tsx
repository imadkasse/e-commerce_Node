"use client";
import {
  AddShoppingCartOutlined,
  BlockOutlined,
  LocalMallOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Skeleton from "./Skeleton";
import { useQuery } from "./QueryContext";
import { useRouter } from "next/navigation";
import ShoppingCartBtnClient from "../shoppingCartFunction/ShoppingCartBtnClient";
import { Product } from "../types/product";
import FavoriteBtnClient from "../favoriteBtn/FavoriteBtnClient";

interface FavoriteProduct {
  _id: string;
}

interface ShopCartProduct {
  _id: string;
}

const AllProducts = () => {
  const { query } = useQuery();

  const [products, setProducts] = useState<Product[]>([]);
  const [favProduct, setFavorites] = useState<string[]>([]);
  const [shopCartIds, setShopCartIds] = useState<string[]>([]);

  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tokenFromCookies = Cookies.get("token");
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}${query}`
        );

        setProducts(data.data.data.products);
        if (!token) return;
        const dataShopCart = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/shopCart/allItems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const shopCartItems: ShopCartProduct[] =
          dataShopCart.data.data.shopCart;
        setShopCartIds(shopCartItems.map((item) => item._id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, token]);

  useEffect(() => {
    const handelFav = async () => {
      const tokenValue = Cookies.get("token");
      console.log("Fetching favorites...");
      if (tokenValue) {
        try {
          const dataFav = await axios.get(
            `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/favorite/allItems`,
            {
              headers: {
                Authorization: `Bearer ${tokenValue}`,
              },
            }
          );
          const favoritesData = dataFav.data.data.favorites.map(
            (fav: FavoriteProduct) => fav._id
          );
          // تحديث فقط إذا كانت البيانات مختلفة

          setFavorites(favoritesData);
        } catch (error) {
          console.error("Error fetching favorite products:", error);
        }
      }
    };
    handelFav();
  }, []);

  return (
    <div className=" md:col-span-3 sm:col-span-2  grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-9 items-center xs:justify-items-center ">
      {loading ? (
        <>
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <Skeleton />
          </div>
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <Skeleton />
          </div>
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <Skeleton />
          </div>
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <Skeleton />
          </div>
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <Skeleton />
          </div>
          <div className="w-full max-w-sm bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <Skeleton />
          </div>
        </>
      ) : products.length ? (
        products.map((product) => {
          return (
            <div
              key={product._id}
              className="w-full bg-white   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700"
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
                    className="p-1 rounded-xl hover:scale-105 hoverEle  "
                    src="/imgs/products/prod1.jpg"
                    alt="product image"
                    width={500}
                    height={500}
                  />
                </Link>
                {/* check if product is favorite */}
                {favProduct.includes(product._id) ? (
                  <FavoriteBtnClient key={product._id} isFavorite={true} />
                ) : (
                  <FavoriteBtnClient
                    key={product._id}
                    isFavorite={false}
                    productId={product._id}
                  />
                )}
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
                  <h5 className="pt-3 text-lg font-semibold tracking-tight line-clamp-1 text-gray-900 dark:text-white ">
                    {product.name}
                  </h5>
                  <p className="dark:text-gray-300 text-gray-400  py-3 text-md">
                    {product.category}
                  </p>
                </div>
                <div className="flex items-center flex-wrap mt-2.5 mb-5">
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
                  <div className="flex items-center justify-between w-full md:gap-3 sm:gap-1">
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
                  <div className="flex items-center justify-between w-full md:gap-2 sm:gap-1">
                    <Link
                      href={`/product/${product._id}`}
                      className="grow flex items-center p-2  gap-1 justify-between  hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 "
                    >
                      <p>Buy </p>
                      <LocalMallOutlined />
                    </Link>
                    {shopCartIds.includes(product._id) ? (
                      <ShoppingCartBtnClient
                        productId={product._id}
                        isInShoppingCart={true}
                      />
                    ) : (
                      <ShoppingCartBtnClient
                        productId={product._id}
                        isInShoppingCart={false}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="dark:text-white text-black">
          <p>No products found...</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
