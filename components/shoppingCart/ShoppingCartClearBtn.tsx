"use client";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";

interface Props {
  isItems: boolean;
}

const ShoppingCartClearBtn = ({ isItems }: Props) => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handelDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/shopCart/allItems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("delete successful");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {isItems ? (
        ""
      ) : loading ? (
        <button
          onClick={handelDelete}
          className="flex items-center gap-2 text-red-400 hover:text-white border border-red-400 hover:bg-red-400 hoverEle   font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 "
        >
          <p>Clear</p>
          <RemoveShoppingCartOutlined />
        </button>
      ) : (
        <Loader />
      )}
      
    </div>
  );
};

export default ShoppingCartClearBtn;
