import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import axios from "axios";
import { cookies } from "next/headers";
import React from "react";

type Fav = {
  isFavorite: boolean; // Initial favorite status, set to false by default if not provided.
  onFavoriteClick?: () => Promise<void>;
};

const FavoriteBtn = ({ isFavorite, onFavoriteClick }: Fav) => {
  const handleClick = async () => {
    if (onFavoriteClick) {
      await onFavoriteClick(); // تحقق من وجود الدالة قبل استدعائها
    }
  };
  return (
    <div className="absolute z-0 top-0 p-5 right-0">
      {isFavorite ? (
        <button disabled>
          <Favorite className="fill-red-400" />
        </button>
      ) : (
        <button onClick={handleClick}>
          <FavoriteBorderOutlined className="text-2xl text-gray-500 hover:text-red-400" />
        </button>
      )}
    </div>
  );
};

export default FavoriteBtn;
