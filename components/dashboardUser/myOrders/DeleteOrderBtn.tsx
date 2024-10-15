"use client";
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Cookies from "js-cookie";

type Props = {
  id: string;
};

const DeleteOrderBtn = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = Cookies.get("token");

  const handelDeleteOrder = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("deleted successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      router.push('/dashboard-user')
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("oops, an error occurred while deleting", {
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <button
          onClick={() => {
            handelDeleteOrder(id);
          }}
          className="dark:text-red-700 text-red-600 dark:hover:text-red-800/60 hoverEle hover:text-red-400/60"
        >
          <DeleteOutline className="" />
        </button>
      )}
    </>
  );
};

export default DeleteOrderBtn;
