"use client";
import { DeleteOutlined, FavoriteSharp } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";

interface Id {
  id: string;
}

const FavoriteBtn = ({ id }: Id) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 justify-end ">
      <button className="hoverEle">
        <FavoriteSharp className="fill-red-400" />
      </button>
      {loading ? (
        <button
          onClick={() => {
            handelDelete(id);
          }}
        >
          <DeleteOutlined className="hover:fill-red-800 hoverEle" />
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FavoriteBtn;
