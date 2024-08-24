"use client";
import { DarkModeOutlined, FacebookOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-2 bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text ">
      <div className="">
        <Image
          src={"/imgs/ecoLogin.jpeg"}
          width={9000}
          height={9000}
          alt="imgLogin"
          className="w-full object-cover h-screen"
        />
      </div>
      <div className="flex flex-col items-end p-3 ">
        <button className=" p-1 w-10 rounded-full flex justify-center  text-sm tracking-wider font-medium   hoverEle dark:hover:bg-gray-600  hover:bg-gray-300">
          <DarkModeOutlined fontSize="large" />
        </button>
        <form className="flex flex-col justify-center p-24 w-full  ">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <h3 className="text-sm px-1 font-semibold">
                {" "}
                don`t have a Account <Link href={"/signup"} className="text-blue-400">singUp </Link>
              </h3>
            </div>
          </div>
          <button
            type="submit"
            className="text-white   font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark-buttonPrimary dark:hover:bg-dark-buttonPrimary/80 hoverEle bg-light-buttonPrimary hover:bg-light-buttonPrimary/80"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
