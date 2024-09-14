"use client";
import {
  DeleteOutlined,
  FavoriteBorder,
  FavoriteSharp,
} from "@mui/icons-material";
import React, { useState } from "react";

const FavoriteBtn = () => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <button className="hoverEle">
        <FavoriteSharp className="fill-red-400" />
      </button>
      <button>
        <DeleteOutlined className="hover:fill-red-800 hoverEle" />
      </button>
    </div>
  );
};

export default FavoriteBtn;
