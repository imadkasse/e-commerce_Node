"use client";
import { DeleteOutlined, FavoriteSharp } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../login&signUp/context/user";

interface Id {
  id: string;
}

const FavoriteBtn = ({ id }: Id) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { user, setUser } = useUser();

  const handelDelete = async (id: string) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/favorite/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("remove item successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });

      // update user in context
      //@ts-expect-error
      setUser({
        ...user,
        //@ts-expect-error
        favorites: [...user?.favorites.filter((product) => product._id !== id)],
      });

      router.refresh();
    } catch (error) {
      toast.error("Failed to reomve to favorites, please try again.", {
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
