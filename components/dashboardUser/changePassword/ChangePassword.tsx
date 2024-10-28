"use client";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");

  const router = useRouter();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/update-password`,
        {
          passwordCurrent,
          password,
          passwordConfirmed,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("password Update successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      router.refresh();
      setPasswordCurrent("");
      setPassword("");
      setPasswordConfirmed("");
    } catch (error) {
      toast.error("Failed to Update password, please try again.", {
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
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleEdit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Current password
          </label>
          <input
            type="password"
            value={passwordCurrent}
            onChange={(e) => {
              setPasswordCurrent(e.target.value);
            }}
            placeholder="*******************"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="*******************"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirmed New Password
          </label>
          <input
            type="password"
            value={passwordConfirmed}
            onChange={(e) => {
              setPasswordConfirmed(e.target.value);
            }}
            placeholder="*******************"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-400 border hoverEle border-red-400 rounded-lg hover:bg-red-500/60 "
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
