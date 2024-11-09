"use client";
import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const AddReview = ({ id }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const newToken = Cookies.get("token");
    setToken(newToken);
  }, []);

  const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("You need to be logged in to add review !", {
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
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/reviews`,
        {
          rating: value,
          review: review,
          product: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Review Added success!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      setReview("");
      setValue(null);
      router.refresh();
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
    }
  };

  return (
    <div className="border rounded-md py-2 px-3 ">
      <form className="w-full mx-auto" onSubmit={handleAddReview}>
        <textarea
          id="message"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          placeholder="Leave a Review..."
        ></textarea>
        <div className="flex  items-center my-3 gap-3">
          <p className="font-semibold">Rating:</p>
          <Rating
            className="text-red-400"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              console.log(newValue);
            }}
          />
        </div>
        <button type="submit" className="  flex justify-end  rounded-md mt-2">
          <h1 className=" bg-red-500 hoverEle hover:bg-red-600/60 text-white py-2 px-4 rounded-md mt-2">
            Add
          </h1>
        </button>
      </form>
    </div>
  );
};

export default AddReview;
