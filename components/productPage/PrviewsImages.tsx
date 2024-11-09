"use client";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "../loader/Loader";
import FavoriteBtn from "../favoriteBtn/FavoriteBtn";

type Props = {
  imagesArr: string[];
  favProduct: any;
  product: any;
};

const PrviewsImages = ({ imagesArr, favProduct, product }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [numImg, setNumImg] = useState<number>(0);
  const handleClick = (i: number) => {
    setNumImg(i);
  };
  const handleImageLoad = () => {
    setLoading(false);
  };
  console.log(product);
  return (
    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
      <div className="px-4 py-10 rounded-lg border relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
            <Loader />
          </div>
        )}
        <Image
          width={5000}
          height={5000}
          src={imagesArr[numImg]}
          alt="Product"
          className="w-3/4 rounded object-cover mx-auto"
          onLoadingComplete={handleImageLoad} // عند تحميل الصورة بالكامل
        />
        {favProduct.includes(product._id) ? (
          <FavoriteBtn key={product._id} isFavorite={true} />
        ) : (
          <FavoriteBtn
            key={product._id}
            productId={product._id}
            isFavorite={false}
          />
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto ">
        {imagesArr.map((img, i) => {
          return (
            <button
              onClick={() => handleClick(i)}
              key={i}
              className="w-24 h-20 flex items-center justify-center rounded-lg p-4 border cursor-pointer relative"
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                  <Loader />
                </div>
              )}
              <Image
                width={150}
                height={150}
                src={img}
                alt="Product2"
                className="w-full"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PrviewsImages;
