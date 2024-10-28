"use client";
import { useUser } from "@/components/login&signUp/context/user";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Edit = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { user, setUser } = useUser();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/update-user`,
        {
          username: userName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("user Update successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      setEmail("");
      setUserName("");

      //@ts-expect-error
      setUser({
        ...user,
        username: userName,
        email: email,
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to Update user, please try again.", {
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
    <section className="">
      <div className="max-w-2xl px-4  mx-auto ">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Profile
        </h2>
        <form onSubmit={handleEdit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder={user?.username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder={user?.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-red-400 inline-flex items-center hover:text-white border border-red-400 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Edit;
