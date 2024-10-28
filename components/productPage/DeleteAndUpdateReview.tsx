"use client";
import { DeleteOutlineOutlined, Edit } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";

type Props = {
  id: string;
  reviewMsg: string;
  ratingNum: number;
};

const DeleteAndUpdateReview = ({ id, reviewMsg, ratingNum }: Props) => {
  const [editReviewMsg, setEditReviewMsg] = useState<string>(reviewMsg);
  const [editRatingNum, setEditRatingNum] = useState<number | null>(ratingNum);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get("token");

  const handelDeleteReview = async (reviewId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      router.refresh();
      toast.success("Review Remove success!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
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

  const handleOpenCloseModal = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const handelUpdateReview = async (
    reviewId: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(typeof editRatingNum);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/reviews/${reviewId}`,
        { rating: editRatingNum, review: editReviewMsg },
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      router.refresh();
      toast.success("Review updated success!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      handleOpenCloseModal();
    } catch (error) {
      //@ts-ignore
      console.log(error.response.data.message);
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
    <div className="flex items-start ">
      <button
        onClick={handleOpenCloseModal}
        className=" text-blue-400 hoverEle dark:hover:text-blue-500/60 hover:text-blue-600   py-2 px-3  rounded-xl flex items-center gap-3 "
      >
        <Edit />
      </button>
      <button
        onClick={() => {
          handelDeleteReview(id);
        }}
        className=" text-red-400 hoverEle dark:hover:text-red-500/60 hover:text-red-600    py-2 px-3  rounded-xl flex items-center gap-3 "
      >
        <DeleteOutlineOutlined />
      </button>

      <div
        id="updateProductModal"
        aria-hidden="true"
        className={`${
          isOpen ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 flex  bg-black/40 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
      >
        <div className=" p-4 w-full max-w-2xl h-full  md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleOpenCloseModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                handelUpdateReview(id, e);
              }}
            >
              <textarea
                id="message"
                value={editReviewMsg}
                onChange={(e) => setEditReviewMsg(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Leave a Review..."
              ></textarea>
              <div className="flex  items-center my-3 gap-3">
                <p className="font-semibold">Rating:</p>
                <Rating
                  className="text-red-400"
                  name="read-only"
                  value={editRatingNum}
                  onChange={(event, newValue) => {
                    setEditRatingNum(newValue);
                  }}
                />
              </div>
              <button
                type="submit"
                className="  flex justify-end  rounded-md mt-2"
              >
                <h1 className="border-2 border-blue-500 hoverEle hover:bg-blue-500 hover:text-white dark:text-white py-2 px-4 rounded-md mt-2">
                  Update
                </h1>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAndUpdateReview;
