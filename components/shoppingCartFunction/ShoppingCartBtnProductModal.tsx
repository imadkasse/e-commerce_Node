"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import Loader from "../loader/Loader";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../login&signUp/context/user";

interface Props {
  productId: string;
  isInShoppingCart: boolean;
}

const ShoppingCartBtnProductModal = ({
  productId,
  isInShoppingCart,
}: Props) => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, setUser } = useUser();

  const addToCart = async (productId: string) => {
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/shopCart/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      if (response.data.status === "success") {
        //@ts-expect-error
        setUser({
          ...user,
          //@ts-expect-error
          shopCart: [...user?.shopCart, response.data.data.product],
        });
      }

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
    <>
      {isInShoppingCart ? (
        <Tooltip title="Already in Shopping Cart" placement="top">
          <button className="bg-red-400/60 cursor-not-allowed flex items-center gap-3 p-2 justify-between text-white font-medium rounded-lg text-sm hover:bg-red-400/60">
          <p> Already in Shopping Cart</p>
          <AddShoppingCartOutlined />
          </button>
        </Tooltip>
      ) : loading ? (
        <Loader />
      ) : (
        <button
          onClick={() => addToCart(productId)}
          className="flex items-center p-2 gap-3 justify-between text-white border border-red-400 font-medium rounded-lg text-sm hoverEle hover:bg-red-400"
        >
          <p>Add to Shop Cart</p>
          <AddShoppingCartOutlined />
        </button>
      )}
    </>
  );
};

export default ShoppingCartBtnProductModal;
