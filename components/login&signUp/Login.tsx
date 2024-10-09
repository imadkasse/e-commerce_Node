"use client";
import Cookies from "js-cookie";
import {
  DarkModeOutlined,
  FacebookOutlined,
  LightMode,
} from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../loader/Loader";

const Login = () => {
  type Theme = null | boolean;
  const router = useRouter();

  const [darkMode, setDarkMode] = useState<Theme>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("Admin17@gm.com");
  const [password, setPassword] = useState<string>("kasseImad");

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

  const handelLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/login`,
        {
          email: email,
          password: password,
        }
      );

      const token = data.data.token;
      Cookies.set("token", token);

      console.log("Login successful!");
      router.push("/");
    } catch (error) {
      console.log(error);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2  bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text ">
      <div className="xs:hidden md:block">
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
          className="flex flex-col justify-center p-24 w-full  "
          onSubmit={handelLogin}
        >
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
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <h3 className="text-sm px-1 font-semibold">
                {" "}
                don`t have a Account{" "}
                <Link href={"/signup"} className="text-blue-400">
                  singUp{" "}
                </Link>
              </h3>
            </div>
          </div>
          <button
            type="submit"
            className={`text-white  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ${
              loading
                ? "dark:bg-dark-buttonPrimary dark:hover:bg-dark-buttonPrimary/80 hoverEle bg-light-buttonPrimary hover:bg-light-buttonPrimary/80"
                : "cursor-not-allowed dark:bg-dark-buttonPrimary/80  bg-light-buttonPrimary/80"
            } `}
          >
            {loading ? <h1>Sign Up</h1> : <Loader />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
