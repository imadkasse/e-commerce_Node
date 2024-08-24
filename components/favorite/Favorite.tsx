"use client";
import {
  DeleteOutlined,
  FavoriteBorder,
  FavoriteSharp,
} from "@mui/icons-material";
import Image from "next/image";
import React, { useState } from "react";

const Favorite = () => {
  const [favBg, setFavBg] = useState<Boolean>(false);
  const toggleFav = () => {
    setFavBg(!favBg);
  };
  return (
    <div className="py-8 bg-light-background/50 dark:bg-gray-800 px-6 md:px-10 text-light-text dark:text-dark-text">
      <div className="grid md:grid-cols-3 gap-4 ">
        <div className="md:col-span-3 space-y-4">
          <div className="flex gap-4 bg-gray-100 dark:bg-gray-700 px-4 py-6 rounded-md ">
            <div className="flex gap-4">
              <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                <Image
                  width={150}
                  height={150}
                  alt="imgFav"
                  src="/imgs/1.png"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold ">Stylish Golden Watch</h3>
                  <p className="text-sm font-semibold  mt-2 flex items-center gap-2">
                    Color:
                    <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span>
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-auto flex flex-col">
              <div className="flex items-center gap-4 justify-end">
                <button className="hoverEle" onClick={toggleFav}>
                  {favBg ? (
                    <FavoriteSharp className="fill-red-400 " />
                  ) : (
                    <FavoriteBorder className="hover:fill-red-400 hoverEle " />
                  )}
                </button>
                <button>
                  <DeleteOutlined className="hover:fill-red-800 hoverEle" />
                </button>
              </div>
              <h3 className="text-base font-bold  mt-auto">$120.00</h3>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 space-y-4">
          <div className="flex gap-4 bg-gray-100 dark:bg-gray-700 px-4 py-6 rounded-md ">
            <div className="flex gap-4">
              <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                <Image
                  width={150}
                  height={150}
                  alt="imgFav"
                  src="/imgs/1.png"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold ">Stylish Golden Watch</h3>
                  <p className="text-sm font-semibold  mt-2 flex items-center gap-2">
                    Color:
                    <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span>
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-auto flex flex-col">
              <div className="flex items-center gap-4 justify-end">
                <button className="hoverEle" onClick={toggleFav}>
                  {favBg ? (
                    <FavoriteSharp className="fill-red-400 " />
                  ) : (
                    <FavoriteBorder className="hover:fill-red-400 hoverEle " />
                  )}
                </button>
                <button>
                  <DeleteOutlined className="hover:fill-red-800 hoverEle" />
                </button>
              </div>
              <h3 className="text-base font-bold  mt-auto">$120.00</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
