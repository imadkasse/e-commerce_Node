"use client";
import Cookies from "js-cookie";
import {
  DarkModeOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowUp,
  LightMode,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../login&signUp/context/user";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchMenuValue, setSearchMenuValue] = useState("All Categories");
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const router = useRouter();

  type Theme = null | boolean;

  const [darkMode, setDarkMode] = useState<Theme>(null);

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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | Event) => {
      // تحقق مما إذا كان النقر خارج القائمة
      if (
        showSearchMenu &&
        !(e.target as HTMLElement).closest(".menu-container")
      ) {
        setShowSearchMenu(false);
      }

      if (
        showUserMenu &&
        !(e.target as HTMLElement).closest(".menu-container2")
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showSearchMenu, showUserMenu]);

  // const { toggleTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const { user, setUser } = useUser();

  const totalPrice =
    user?.shopCart.reduce((total, item) => {
      return total + item.price;
    }, 0) ?? 0;

  const roundedTotalPrice = parseFloat(totalPrice?.toFixed(0));

  const handelSignOut = () => {
    Cookies.remove("token");
    setUser(null);
    router.refresh();
  };

  return (
    <header className=" text-light-text dark:text-dark-text flex flex-col gap-5 bg-light-background/50 dark:bg-gray-800">
      <section className="bg-[#004d66] min-h-[40px] px-4 py-2 sm:px-10 flex items-center max-sm:flex-col">
        <button type="button" className="text-white text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            fill="#fff"
            className="mr-3 inline-block"
            viewBox="0 0 482.6 482.6"
          >
            <path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"></path>
          </svg>
          0675416320
        </button>
        <span className="border-l h-3 mx-6 max-sm:hidden"></span>
        <button
          type="button"
          className="text-white text-sm max-sm:my-2 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            fill="#fff"
            className="mr-3 inline-block"
            viewBox="0 0 479.058 479.058"
          >
            <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"></path>
          </svg>
          kasseimad81@gmail.com
        </button>
        <div className="sm:ml-auto text-white">
          <div>contact</div>
        </div>
      </section>
      <div className="flex flex-col gap-5 ">
        <nav className=" border-gray-200   py-2.5  px-6 ">
          <div className="flex items-center sm:justify-center md:justify-between flex-wrap sm:gap-4 xs:gap-3 xs:justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                width={50}
                height={50}
                className="mr-3 h-6 xs:h-9"
                alt="Flowbite Logo"
              />
            </Link>
            <div className="grow">
              <div className="">
                <div className="flex items-center ">
                  <button
                    onClick={() => {
                      setShowSearchMenu(!showSearchMenu);
                    }}
                    className="  flex items-center  justify-between gap-1 w-52 py-2.5 px-4 hoverEle    text-center text-sm font-medium  text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200  focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-600  dark:text-white dark:border-gray-600"
                  >
                    <h1 className="line-clamp-1">{searchMenuValue} </h1>
                    <KeyboardArrowUp
                      className={` ${
                        showSearchMenu ? "rotate-180" : "rotate-0"
                      } transform  duration-500`}
                      fontSize="small"
                    />
                  </button>
                  {showSearchMenu && (
                    <div className="relative">
                      <div className=" absolute xs:-right-6 sm:right-0 top-6 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <button
                              onClick={(e) => {
                                setSearchMenuValue("Mockups");
                              }}
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Mockups
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={(e) => {
                                setSearchMenuValue("Monitor");
                              }}
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Monitor
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={(e) => {
                                setSearchMenuValue("Acssisoir");
                              }}
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Acssisoir
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <form className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      className=" p-2.5 w-full z-20 text-sm text-gray-900 outline-none bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <button
                onClick={toggleTheme}
                className="p-2 w-10 hoverEle dark:hover:bg-gray-600  hover:bg-gray-300 rounded-full flex justify-center "
              >
                {darkMode ? (
                  <DarkModeOutlined className="hoverEle" />
                ) : (
                  <LightMode className="hoverEle" />
                )}
              </button>
              <Link
                href={"/shoppingCart"}
                className="p-2 w-10 hoverEle dark:hover:bg-gray-600  hover:bg-gray-300 rounded-full flex justify-center "
              >
                <div className="relative ">
                  <ShoppingCartOutlined />
                  <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 left-[60%]">
                    ${roundedTotalPrice || 0}
                  </span>
                </div>
              </Link>
              <Link
                href={"/favorite"}
                className="p-2 w-10 hoverEle dark:hover:bg-gray-600  hover:bg-gray-300 rounded-full flex justify-center "
              >
                <div className="relative ">
                  <FavoriteBorderOutlined />
                  <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 left-[60%]">
                    {user?.favorites.length || 0}
                  </span>
                </div>
              </Link>
              {user ? (
                <div className="relative z-50">
                  <button
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                    }}
                  >
                    <Image
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src="/imgs/user.png"
                      alt="User dropdown"
                      width={150}
                      height={100}
                    />
                  </button>
                  {showUserMenu && (
                    <div
                      id="userDropdown"
                      className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{user.username}</div>
                        <div className="font-medium truncate">{user.email}</div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="avatarButton"
                      >
                        <li>
                          <Link
                            href="/dashboard-user"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </ul>
                      <div className="py-1">
                        <button
                          onClick={handelSignOut}
                          className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-800 dark:text-white bg-red-400 hoverEle hover:bg-red-400/60  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-red-400/60 "
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
