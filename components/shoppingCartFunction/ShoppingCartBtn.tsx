"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import Loader from "../loader/Loader";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  isInShoppingCart: boolean;
}

const ShoppingCartBtn = ({ productId, isInShoppingCart }: Props) => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const addToCart = async (productId: string) => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/shopCart/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("add to cart successfully ");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isInShoppingCart ? (
        <>
          <Tooltip title="Alredy in Shopping Cart" placement="top">
            <button className="bg-red-400/60 cursor-not-allowed  flex items-center p-2 justify-between hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 ">
              <AddShoppingCartOutlined />
            </button>
          </Tooltip>
        </>
      ) : loading ? (
        <button
          onClick={() => {
            addToCart(productId);
          }}
          className="flex items-center p-2 justify-between hoverEle text-white bg-red-400  font-medium rounded-lg text-sm   text-center hover:bg-red-400/60 "
        >
          <AddShoppingCartOutlined />
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ShoppingCartBtn;
