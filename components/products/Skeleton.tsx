import Image from "next/image";
import React from "react";

const Skeleton = () => {
  return (
    <div className="">
      <div className="w-full max-w-sm bg-white border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 animate-pulse">
        {/* صورة المنتج */}
        <div className="relative  bg-gray-300 dark:bg-gray-700 rounded-lg">
          <Image
            className="p-1 rounded-xl w-full hover:scale-105 hoverEle  "
            src="/imgs/products/prod1.jpg"
            alt="product image"
            width={500}
            height={500}
          />
        </div>

        {/* محتوى المنتج */}
        <div className="px-2 pb-5">
          {/* اسم المنتج */}
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mt-3"></div>

          {/* الفئة */}
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mt-2 w-1/2"></div>

          {/* التقييم */}
          <div className="flex items-center mt-4 mb-3">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <div className="w-10 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
            <span className="ml-3 w-8 h-3 bg-gray-200 dark:bg-gray-600 rounded"></span>
          </div>

          {/* السعر */}
          <div className="flex justify-center gap-2 pb-3">
            <span className="w-16 h-6 bg-gray-200 dark:bg-gray-600 rounded"></span>
            <span className="w-10 h-4 bg-gray-200 dark:bg-gray-600 rounded"></span>
          </div>

          {/* أزرار الشراء */}
          <div className="flex items-center justify-between w-full gap-3">
            <div className="w-1/2 h-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="w-1/3 h-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
