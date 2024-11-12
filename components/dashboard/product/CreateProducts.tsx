"use client";
import Cookies from "js-cookie";
import { AddOutlined } from "@mui/icons-material";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateProducts = () => {
  const token = Cookies.get("token-admin");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<File[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handelCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (image && image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("rating", rating.toString()); // تأكد من تحويل القيم إلى نصوص
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("category", category);

    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // تحديد نوع المحتوى كـ multipart/form-data
          },
        }
      );

      handleClick();
      setToggle(false);
      router.refresh();
      setName("");
      setDescription("");
      setCategory("");
      setName("");
      setQuantity(0);
      setPrice(0);
      setRating(0);
      setImage(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (!token) {
    return <div className=""></div>;
  }
  return (
    <div className="py-2 flex justify-end">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Created Product
        </Alert>
      </Snackbar>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
        className=" flex justify-between items-center gap-3 text-white bg-red-400 hover:bg-red-400/60 focus:ring-2 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-400/60 dark:focus:ring-red-300"
      >
        <h1 className="text-base  ">Create Product</h1>
        <AddOutlined />
      </button>

      {toggle && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 overflow-y-scroll">
          <div className="relative px-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Product
              </h3>
              <button
                onClick={() => {
                  setToggle(false);
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-3" onSubmit={handelCreate}>
                <div>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    placeholder="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => {
                      setRating(Number(e.target.value));
                    }}
                    placeholder="rating"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                    placeholder="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                    }}
                    placeholder="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="file"
                    accept="image/*" // تأكد من قبول الصور فقط
                    onChange={(e) => {
                      if (e.target.files) {
                        const selectedImages = Array.from(e.target.files); // تحويل الملفات إلى مصفوفة
                        setImage(selectedImages); // تحديث الحالة بالصور المحددة
                      }
                    }}
                    multiple
                    placeholder="images"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full hoverEle text-white bg-red-400 ${
                    loading
                      ? "bg-red-400/60 dark:bg-red-400/60 cursor-not-allowed"
                      : "hover:bg-red-400/60 dark:hover:bg-red-400/60"
                  }   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400  `}
                >
                  {loading ? "Createing Product..." : "Create "}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProducts;
