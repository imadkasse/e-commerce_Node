"use client";
import Image from "next/image";

import Link from "next/link";

const Categories = () => {
  return (
    <div className="px-4  sm:px-10  py-10  bg-light-background/50 dark:bg-gray-800">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl dark:text-white font-semibold">Categories</h1>
        <p className="text-4xl text-red-400 font-bold">Browse by Category</p>
      </div>
      <div className="my-14  grid md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-2 gap-6">
        <Link
          href={"/"}
          className="border shadow-44 rounded-xl dark:bg-gray-700 dark:border-gray-400 p-4"
        >
          <div className="flex flex-col items-center  h-full justify-between">
            <Image
              src="/imgs/categoriesImg/Acce.png"
              alt="imgCate"
              width={80}
              height={100}
            />
            <h1 className="text-red-400 md:text-xl sm:text-lg font-semibold hoverEle">
              Accessories
            </h1>
          </div>
        </Link>
        <Link
          href={"/"}
          className="border shadow-44 rounded-xl dark:bg-gray-700 dark:border-gray-400 p-4"
        >
          <div className="flex flex-col items-center  h-full justify-between ">
            <Image
              src="/imgs/categoriesImg/network.png"
              alt="imgCate"
              width={80}
              height={100}
            />
            <h1 className="text-red-400 md:text-xl sm:text-lg font-semibold hoverEle">
              Networking
            </h1>
          </div>
        </Link>
        <Link
          href={"/"}
          className="border shadow-44 rounded-xl dark:bg-gray-700 dark:border-gray-400 p-4"
        >
          <div className="flex flex-col items-center  h-full justify-between">
            <Image
              src="/imgs/categoriesImg/computer.png"
              alt="imgCate"
              width={80}
              height={100}
            />
            <h1 className="text-red-400 md:text-xl sm:text-lg font-semibold hoverEle">
              Computers
            </h1>
          </div>
        </Link>
        <Link
          href={"/"}
          className="border shadow-44 rounded-xl dark:bg-gray-700 dark:border-gray-400 p-4"
        >
          <div className="flex flex-col items-center  h-full justify-between">
            <Image
              src="/imgs/categoriesImg/phone.png"
              alt="imgCate"
              width={80}
              height={100}
            />
            <h1 className="text-red-400 md:text-xl sm:text-lg font-semibold hoverEle">
              Phones
            </h1>
          </div>
        </Link>
        <Link
          href={"/"}
          className="border shadow-44 rounded-xl dark:bg-gray-700 dark:border-gray-400 p-4"
        >
          <div className="flex flex-col items-center  h-full justify-between">
            <Image
              src="/imgs/categoriesImg/monitors.png"
              alt="imgCate"
              width={80}
              height={100}
            />
            <h1 className="text-red-400 md:text-xl sm:text-lg font-semibold hoverEle">
              Monitors
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
