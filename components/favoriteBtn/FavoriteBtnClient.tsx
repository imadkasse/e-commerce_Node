"use client";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../login&signUp/context/user";

type Fav = {
  isFavorite: boolean; // Initial favorite status
  productId?: string | undefined;
};

const FavoriteBtnClient = ({ isFavorite, productId }: Fav) => {
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [favPro, setFavPro] = useState<boolean>(isFavorite);

  useEffect(() => {
    const newToken = Cookies.get("token");
    setToken(newToken);
  }, []);

  useEffect(() => {
    const handleUserData = async () => {
      if (token) {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/data-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data.data.data.user);
      }
    };

    if (token) {
      handleUserData();
    }
  }, [token, setUser]);

  const addProductToFavorites = async (productId: string | undefined) => {
    if (!token) {
      toast.error("You need to be logged in to add to favorites!", {
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
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/favorite/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to favorites!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });

      // Update user's favorites and component state
      if (data.data.status === "success") {
        //@ts-expect-error
        setUser({
          ...user,
          //@ts-expect-error
          favorites: [...user?.favorites, data.data.data],
        });
      }
      setFavPro(true);
      router.refresh(); // Optionally refresh the page to sync state
    } catch (error) {
      toast.error("Failed to add to favorites!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute z-0 top-0 p-5 right-0">
        {isFavorite ? (
          <button disabled>
            <Favorite className="fill-red-400" />
          </button>
        ) : loading ? (
          <Loader />
        ) : favPro ? (
          <button disabled>
            <Favorite className="fill-red-400" />
          </button>
        ) : (
          <div>
            <button onClick={() => addProductToFavorites(productId)}>
              <FavoriteBorderOutlined className="text-2xl text-gray-500 hover:text-red-400" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteBtnClient;
