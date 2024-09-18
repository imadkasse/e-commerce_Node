"use client";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";
import Loader from "../loader/Loader";

type Fav = {
  isFavorite: boolean; // Initial favorite status, set to false by default if not provided.
  productId?: string | undefined;
};

const FavoriteBtn = ({ isFavorite, productId }: Fav) => {
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  const addProductToFavorites = async (productId: string | undefined) => {
    const token = Cookies.get("token");

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
      console.log("first 1");
      router.refresh();
      console.log("first 2");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute z-0 top-0 p-5 right-0">
      {isFavorite ? (
        <button disabled>
          <Favorite className="fill-red-400" />
        </button>
      ) : loading ? (
        <button onClick={() => addProductToFavorites(productId)}>
          <FavoriteBorderOutlined className="text-2xl text-gray-500 hover:text-red-400" />
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FavoriteBtn;
