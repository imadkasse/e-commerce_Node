"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdmin } from "../context/useAdmin";

const LoginDashboard = () => {
  const router = useRouter();

  const { setAdmin } = useAdmin();

  const [email, setEmail] = useState<string>("Admin1@gm.com");
  const [password, setPassword] = useState<string>("kasseImad");

  const [loading, setLoading] = useState<boolean>(false);

  const handelLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/login`,
        {
          email: email,
          password: password,
        }
      );

      if (data.data.data.user.role === "admin") {

        toast.success("login successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-white text-black dark:bg-gray-800 dark:text-white",
        });

        const token = data.data.token;
        Cookies.set("token-admin", token);

        setAdmin(data.data.data.user);

        router.push("/dashboard/");
        router.refresh();
      } else {
        toast.error(
          "you are not a admin, please go to /login to login for users",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "bg-white text-black dark:bg-gray-800 dark:text-white",
          }
        );
      }
    } catch (error) {
      toast.error("oops an error, please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className=" h-screen">
      <div className="flex  justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handelLogin}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  !loading
                    ? "bg-red-400 hover:bg-red-500/60 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-400 dark:hover:bg-red-500/60 hoverEle dark:focus:ring-red-400"
                    : "cursor-not-allowed dark:bg-red-500/60 bg-red-500/60"
                }`}
              >
                {!loading ? <h1>Sign In</h1> : <Loader />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginDashboard;
