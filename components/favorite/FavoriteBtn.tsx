"use client";
import { DeleteOutlined, FavoriteSharp } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";

interface Id {
  id: string;
}

const FavoriteBtn = ({ id }: Id) => {
  const router = useRouter();
  const handelDelete = async (id: string) => {
    try {
      const token = Cookies.get("token");
      console.log(token);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/favorite/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("delete product in favorites");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-4 justify-end">
      <button className="hoverEle">
        <FavoriteSharp className="fill-red-400" />
      </button>
      <button
        onClick={() => {
          handelDelete(id);
        }}
      >
        <DeleteOutlined className="hover:fill-red-800 hoverEle" />
      </button>
    </div>
  );
};

export default FavoriteBtn;
