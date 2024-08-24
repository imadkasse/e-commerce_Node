"use client";
import {
  AddOutlined,
  DeleteOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ShoppingCart = () => {
  const [amount, setAmount] = useState<number>(1);
  const addHandler = () => {
    setAmount(amount + 1);
  };
  const minusHandler = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  return (
    <div className="px-6 md:px-10  bg-white text-light-text dark:text-dark-text bg-light-background/50 dark:bg-gray-800 py-4">
      <div className="grid md:grid-cols-3 gap-4">
        {/* My Products */}
        <div className="md:col-span-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          <h2 className="text-2xl font-bold ">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />

          <div className="space-y-4 ">
            <div className="">
              <div className="flex items-center gap-4  ">
                <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                  <Image
                    src="/imgs/1.png"
                    width={150}
                    height={150}
                    alt="img"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className=" w-full">
                  <h3 className="text-base font-bold ">Velvet Sneaker</h3>
                  <h6 className="text-base font-bold">$20.00</h6>

                  <div className="flex justify-between mt-4">
                    <div>
                      <div
                        className="flex items-center px-2.5 py-1.5 border border-gray-300  text-xs outline-none bg-transparent rounded-md"
                      >
                        <button className="" onClick={minusHandler}>
                          <RemoveOutlined fontSize="small" />
                        </button>

                        <span className="mx-2.5 text-[16px]">{amount}</span>

                        <button className="" onClick={addHandler}>
                          <AddOutlined fontSize="small" />
                        </button>
                      </div>
                    </div>
                    <button className="hover:text-red-400 hoverEle">
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price and promo code  */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 md:sticky top-0">
          <div className="flex border border-gray-100 focus-within:border-red-400 hoverEle overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="Promo code"
              className="w-full outline-none bg-gray-100 dark:bg-gray-700 text-sm px-4 py-2.5"
            />
            <button
              type="button"
              className="flex items-center justify-center font-semibold tracking-wide bg-red-400 hover:bg-red-400/60 hoverEle px-4 text-sm text-white"
            >
              Apply
            </button>
          </div>

          <ul className=" mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">$52.00</span>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 text-center">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-red-400 hover:bg-red-400/60 hoverEle text-white rounded-md"
            >
              Checkout
            </button>
            <Link
              href={"/"}
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-red-400 hover:text-white  hover:bg-red-400 border border-red-400 hoverEle rounded-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
