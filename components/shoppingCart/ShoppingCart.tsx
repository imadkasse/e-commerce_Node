import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShoppingCartBtns from "./ShoppingCartBtns";
import axios from "axios";
import { cookies } from "next/headers";
import ShoppingCartClearBtn from "./ShoppingCartClearBtn";
import { ShopCartItems } from "../types/shoppingCart";
import Checkout from "./Checkout";

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

  const shopCartIds = shopCartItems.map((item) => item._id);

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

            {shopCartItems.length > 0 ? (
              shopCartItems.map((item) => {
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
            ) : (
              <h1 className="text-red-400 w-full  text-4xl capitalize text-center">
                not any product
              </h1>
            )}
          </div>
        </div>

        {/* Price and promo code  */}
        <Checkout
          totalPrice={roundedTotalPrice}
          discount={0}
          ids={shopCartIds}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
