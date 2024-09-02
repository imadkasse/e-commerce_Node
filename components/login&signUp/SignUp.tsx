"use client";
import {
  DarkModeOutlined,
  FacebookOutlined,
  LightMode,
} from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SignUp = () => {
  type Theme = null | boolean;
  type text = string | number;
  const [darkMode, setDarkMode] = useState<Theme>(null);
  const [username, setUserName] = useState<text>("");
  const [email, setEmail] = useState<text>("");
  const [password, setPassword] = useState<text>("");
  const [passwordConfirmed, setPasswordConfirmed] = useState<text>("");

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const handelSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.BACK_URL}/api/eco/users/signup`,
        {
          username: username,
          email: email,
          password: password,
          passwordConfirmed: passwordConfirmed,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Signup successful!");
    } catch (error) {
      console.log(error);
    }
  };
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
        <button
          onClick={toggleTheme}
          className=" p-2 w-10 rounded-full flex justify-center  text-sm tracking-wider font-medium   hoverEle dark:hover:bg-gray-600  hover:bg-gray-300"
        >
          {darkMode ? (
            <DarkModeOutlined className="hoverEle" />
          ) : (
            <LightMode className="hoverEle" />
          )}
        </button>
        <form
          className="flex flex-col justify-center p-10 w-full  "
          onSubmit={handelSignUp}
        >
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              username
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm the password
            </label>
            <input
              value={passwordConfirmed}
              onChange={(e) => {
                setPasswordConfirmed(e.target.value);
              }}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <h3 className="text-sm px-1 font-semibold">
                you have a Account?
                <Link href={"/login"} className="text-blue-400 px-2">
                  login
                </Link>
              </h3>
            </div>
          </div>
          <button
            type="submit"
            className="text-white   font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark-buttonPrimary dark:hover:bg-dark-buttonPrimary/80 hoverEle bg-light-buttonPrimary hover:bg-light-buttonPrimary/80"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
