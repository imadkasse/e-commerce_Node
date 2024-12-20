"use client";
import {
  AddOutlined,
  DeleteOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "../login&signUp/context/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useTotalPrice } from "./context/price";

interface Props {
  id: string;
  price: number;
}

const ShoppingCartBtn = ({ id, price }: Props) => {
  const [amount, setAmount] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const token = Cookies.get("token");
  const { user, setUser } = useUser();
  const router = useRouter();

  // edit total price
  const { totalPrice, setTotalPrice } = useTotalPrice();

  const amountPrice = price * amount;

  const addHandler = () => {
    setAmount(amount + 1);
    setTotalPrice(totalPrice + price);
    console.log(totalPrice);
  };

  const minusHandler = () => {
    if (amount > 1) {
      // لتجنب أن يصبح العدد صفرًا
      setAmount(amount - 1);
      setTotalPrice(totalPrice - price);
      console.log(totalPrice);
    }
  };

  const removeHandler = async (id: string) => {
    if (!token) {
      toast.error("You need to be logged in to add to shopcart!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      return;
    }
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/shopCart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("remove to cart successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      //@ts-expect-error
      setUser({
        ...user,
        //@ts-expect-error
        shopCart: [...user?.shopCart.filter((product) => product._id !== id)],
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to add to cart, please try again.", {
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
    <div className="flex justify-between mt-4">
      <div className="flex items-center flex-grow  justify-between pr-6">
        <div className="flex items-center px-2.5 py-1.5 border border-gray-300  text-xs outline-none bg-transparent rounded-md">
          <button className="" onClick={minusHandler}>
            <RemoveOutlined fontSize="small" />
          </button>

          <span className="mx-2.5 text-[16px]">{amount}</span>

          <button className="" onClick={addHandler}>
            <AddOutlined fontSize="small" />
          </button>
        </div>
        <span className="text-gray-800 dark:text-gray-200 font-bold">
          {price} USD
        </span>
      </div>
      <button
        className="hover:text-red-400 hoverEle"
        onClick={() => {
          removeHandler(id);
        }}
        disabled={loading} // تعطيل الزر أثناء التحميل
      >
        {loading ? (
          <Loader /> // يمكنك استخدام Loader هنا
        ) : (
          <DeleteOutlined />
        )}
      </button>
    </div>
  );
};

export default ShoppingCartBtn;
