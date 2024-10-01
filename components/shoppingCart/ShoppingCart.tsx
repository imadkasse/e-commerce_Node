import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShoppingCartBtns from "./ShoppingCartBtns";
import axios from "axios";
import { cookies } from "next/headers";
import ShoppingCartClearBtn from "./ShoppingCartClearBtn";
import { ShopCartItems } from "../types/shoppingCart";



const ShoppingCart = async () => {
  const CookiesStore = cookies();
  const token = CookiesStore.get("token")?.value;
  if (!token) {
    return (
      <div className="px-6 md:px-10 h-[70vh]  bg-white text-light-text dark:text-dark-text bg-light-background/50 dark:bg-gray-800 py-4">
        <div className="w-full  h-full flex  justify-center items-center ">
          <Link
            href="/login"
            className="text-4xl flex flex-col text-center gap-3"
          >
            You Are Not Loggin
            <span className="hover:text-red-400 hoverEle">
              Please Click Here To Log In
            </span>
          </Link>
        </div>
      </div>
    );
  }
  const data = await axios.get(
    `${process.env.BACK_URL}/api/eco/products/shopCart/allItems`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const shopCartItems: ShopCartItems[] = data.data.data.shopCart;

  const totalPrice = shopCartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));

  return (
    <div className="px-6 md:px-10  bg-white text-light-text dark:text-dark-text bg-light-background/50 dark:bg-gray-800 py-4">
      <div className="grid md:grid-cols-3 gap-4">
        {/* My Products */}
        <div className=" md:col-span-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold ">Cart</h2>
            {shopCartItems.length === 0 ? (
              <ShoppingCartClearBtn isItems={true} />
            ) : (
              <ShoppingCartClearBtn isItems={false} />
            )}
          </div>
          <hr className="border-gray-300 mt-4 mb-8" />

          <div className="space-y-4 ">
            {/* Items  */}

            {shopCartItems.length > 0
              ? shopCartItems.map((item) => {
                  return (
                    <div className="flex items-center gap-4  " key={item._id}>
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
                        <h3 className="text-base font-bold ">{item.name}</h3>
                        <h6 className="text-base font-bold">${item.price}</h6>
                        <ShoppingCartBtns id={item._id} />
                      </div>
                    </div>
                  );
                })
              : ""}
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
              Total <span className="ml-auto">${roundedTotalPrice}</span>
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
