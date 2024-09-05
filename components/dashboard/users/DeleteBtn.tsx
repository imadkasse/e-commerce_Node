"use client";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface DeleteBtnProps {
  id: string;
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ id }) => {
  const router = useRouter();
  const deleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/${id}`
      );
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={deleteUser}
      className="font-medium text-red-600 dark:text-red-500 ml-1"
    >
      <DeleteOutlined className="hover:text-red-600/70 dark:hover:text-red-500/70 hoverEle" />
    </button>
  );
};

export default DeleteBtn;
