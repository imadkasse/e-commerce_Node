"use client";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";
import Loader from "../loader/Loader";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Fav = {
  isFavorite: boolean; // Initial favorite status, set to false by default if not provided.
  productId?: string | undefined;
};
const FavoriteBtnClient = ({ isFavorite, productId }: Fav) => {
  const router = useRouter();

  const token = Cookies.get("token");

  const addProductToFavorites = async (productId: string | undefined) => {
    console.log("first 1");
    if (!token) {
      toast.error("You need to be logged in to add to favorites!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });

      return;
    }
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/favorite/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="absolute z-0 top-0 p-5 right-0">
        {isFavorite ? (
          <button disabled>
            <Favorite className="fill-red-400" />
          </button>
        ) : (
          <div>
            <button onClick={() => addProductToFavorites(productId)}>
              <FavoriteBorderOutlined className="text-2xl text-gray-500 hover:text-red-400" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteBtnClient;
