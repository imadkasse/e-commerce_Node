"use client";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DeleteBtnProps {
  id: string;
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const deleteProduct = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/${id}`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleOpenAndClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-slate-600 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
          <p className="text-center text-black dark:text-white text-lg font-semibold">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleOpenAndClose}
              className="py-2 px-4 rounded-md border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              onClick={deleteProduct}
              className="py-2 px-4 rounded-md font-semibold text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white transition-colors duration-200"
            >
              {loading ? "loading ..." : "DeleteProduct"}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleOpenAndClose}
        className="font-medium text-red-600 dark:text-red-500 ml-1"
      >
        <DeleteOutlined className="hover:text-red-600/70 dark:hover:text-red-500/70 hoverEle" />
      </button>
    </>
  );
};

export default DeleteBtn;
