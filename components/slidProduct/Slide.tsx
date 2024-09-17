"use client";
import React from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./swiperStyle.css";
import { Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Slide = () => {
  return (
    <>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        freeMode={true}
        loop={true}
      >
        <SwiperSlide className="px-20">
          <div className="w-52 flex flex-col p-2 gap-4 justify-center ">
            <p className="text-2xl font-semibold text-red-400">Exclusive</p>
            <h1 className="text-5xl font-bold">T-shirt</h1>
            <p className="text-xl">the t-shirt are loved for many peploe</p>
            <Link
              href={"/products"}
              className="w-32 text-center bg-red-400 p-2 rounded-lg text-white hover:bg-red-400/60 font-semibold hoverEle"
            >
              Shop Now
            </Link>
          </div>
          <div className="col-span-2 flex items-center ">
            <Image
              src="/imgs/1.png"
              alt="imgSlide"
              width={1000}
              height={1000}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-20">
          <div className="w-60 flex flex-col p-2 gap-4 justify-center ">
            <p className="text-2xl font-semibold text-red-400">Exclusive</p>
            <h1 className="text-5xl font-bold">Headset</h1>
            <p className="text-xl">the Headset are loved for many peploe</p>
            <Link
              href={"/products"}
              className="w-32 text-center bg-red-400 p-2 rounded-lg text-white hover:bg-red-400/60 font-semibold hoverEle"
            >
              Shop Now
            </Link>
          </div>
          <div className="col-span-2 flex items-center  ">
            <Image
              src="/imgs/headset.png"
              alt="imgSlide"
              width={1000}
              height={1000}
              className=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-20">
          <div className="w-52 flex flex-col p-2 gap-4 justify-center ">
            <p className="text-2xl font-semibold text-red-400">Exclusive</p>
            <h1 className="text-5xl font-bold">T-shirt</h1>
            <p className="text-xl">the t-shirt are loved for many peploe</p>
            <Link
              href={"/products"}
              className="w-32 text-center bg-red-400 p-2 rounded-lg text-white hover:bg-red-400/60 font-semibold hoverEle"
            >
              Shop Now
            </Link>
          </div>
          <div className="col-span-2 flex items-center ">
            <Image
              src="/imgs/2.png"
              alt="imgSlide"
              width={1000}
              height={1000}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slide;
