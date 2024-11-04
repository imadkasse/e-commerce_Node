"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTotalPrice } from "./context/price";

type Props = {
  discount: number;
  allPrice: number;
  ids: string[];
};

const Checkout = ({ discount, ids, allPrice }: Props) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { totalPrice, setTotalPrice } = useTotalPrice();
  useEffect(() => {
    setTotalPrice(allPrice);
  }, [allPrice, setTotalPrice]);

  const token = Cookies.get("token");

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/orders`,
        {
          products: ids,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("we are contact whith you ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      setAddress("");
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 md:sticky top-0"
      onSubmit={handleCheckout}
    >
      {/* code promo */}
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
      {/* address */}
      <div className="flex border my-3 border-gray-100 focus-within:border-red-400 hoverEle overflow-hidden rounded-md">
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="w-full outline-none bg-gray-100 dark:bg-gray-700 text-sm px-4 py-2.5"
        />
      </div>

      <ul className=" mt-8 space-y-4">
        <li className="flex flex-wrap gap-4 text-base">
          Discount <span className="ml-auto font-bold">${discount}</span>
        </li>
        <li className="flex flex-wrap gap-4 text-base">
          Shipping <span className="ml-auto font-bold">$2.00</span>
        </li>
        <li className="flex flex-wrap gap-4 text-base">
          Tax <span className="ml-auto font-bold">$4.00</span>
        </li>
        <li className="flex flex-wrap gap-4 text-base font-bold">
          Total <span className="ml-auto">${totalPrice.toFixed(2)}</span>
        </li>
      </ul>

      <div className="mt-8 flex flex-col gap-3 text-center">
        {loading ? (
          <button
            type="submit"
            className="disabled:opacity-50 text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-red-400 hover:bg-red-400/60 hoverEle text-white rounded-md"
          >
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-red-400 hover:bg-red-400/60 hoverEle text-white rounded-md"
          >
            Checkout
          </button>
        )}
        <Link
          href="/"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-red-400 hover:text-white  hover:bg-red-400 border border-red-400 hoverEle rounded-md"
        >
          Continue Shopping
        </Link>
      </div>
    </form>
  );
};

export default Checkout;
