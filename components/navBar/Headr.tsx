"use client";
import { ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Headr = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | Event) => {
      // تحقق مما إذا كان النقر خارج القائمة

      if (showMenu2 && !(e.target as HTMLElement).closest(".menu-container2")) {
        setShowMenu2(false);
      }
      if (showMenu && !(e.target as HTMLElement).closest(".menu-container2")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu, showMenu2]);
  return (
    <div className="sm:px-9 xs:px-6  bg-[#304C89]   sticky top-0  w-full z-50">
      <div className="flex items-center justify-between relative gap-2">
        <div>
          <div className="ar-dropdown flex relative">
            <button
              onClick={() => {
                setShowMenu2(!showMenu2);
              }}
              className="ar-dropdown-header w-full cursor-pointer inline-flex items-center gap-[12px] min-w-[200px] text-[16px] leading-[1.1] font-[500] h-[60px] bg-red-400 px-[15px] text-white"
            >
              <svg
                className="w-[30px] h-[30px] fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g>
                  <g>
                    <path d="M4.35 2C3.078 2 2 3.078 2 4.35v4.5c0 1.272 1.078 2.35 2.35 2.35h4.5c1.272 0 2.35-1.078 2.35-2.35v-4.5C11.2 3.078 10.122 2 8.85 2zM4 4.35c0-.168.182-.35.35-.35h4.5c.168 0 .35.182.35.35v4.5c0 .168-.182.35-.35.35h-4.5c-.168 0-.35-.182-.35-.35zM15.15 2c-1.272 0-2.35 1.078-2.35 2.35v4.5c0 1.272 1.078 2.35 2.35 2.35h4.5c1.272 0 2.35-1.078 2.35-2.35v-4.5C22 3.078 20.922 2 19.65 2zm-.35 2.35c0-.168.182-.35.35-.35h4.5c.168 0 .35.182.35.35v4.5c0 .168-.182.35-.35.35h-4.5c-.168 0-.35-.182-.35-.35zM2 15.15c0-1.272 1.078-2.35 2.35-2.35h4.5c1.272 0 2.35 1.078 2.35 2.35v4.5c0 1.272-1.078 2.35-2.35 2.35h-4.5C3.078 22 2 20.922 2 19.65zm2.35-.35c-.168 0-.35.182-.35.35v4.5c0 .168.182.35.35.35h4.5c.168 0 .35-.182.35-.35v-4.5c0-.168-.182-.35-.35-.35zM15.15 12.8c-1.272 0-2.35 1.078-2.35 2.35v4.5c0 1.272 1.078 2.35 2.35 2.35h4.5c1.272 0 2.35-1.078 2.35-2.35v-4.5c0-1.272-1.078-2.35-2.35-2.35zm-.35 2.35c0-.168.182-.35.35-.35h4.5c.168 0 .35.182.35.35v4.5c0 .168-.182.35-.35.35h-4.5c-.168 0-.35-.182-.35-.35z"></path>
                  </g>
                </g>
              </svg>
              <div className="flex items-center justify-between w-full ">
                All Categories
                <i className="ml-[50px] ">
                  <svg
                    className={`fill-white transform ${
                      showMenu2 ? "rotate-180" : "rotate-0"
                    } transform transition-transform duration-500`}
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                  </svg>
                </i>
              </div>
            </button>
          </div>
        </div>
        {showMenu2 && (
          <div className="z-50 absolute rounded-lg  w-[244px] py-4 top-16 flex flex-col gap-2 bg-white shadow dark:bg-gray-700">
            <div className="hover:bg-red-400 h-10 px-3 flex items-center hoverEle group">
              <Link
                className="text-black dark:text-white w-full  text-[16px] leading-[1.1] font-[500] group-hover:text-black/60 transition duration-1000"
                href="/login"
              >
                Accessories
              </Link>
            </div>

            <div className="hover:bg-red-400 h-10 px-3 flex items-center hoverEle group">
              <Link
                className="text-black dark:text-white w-full  text-[16px] leading-[1.1] font-[500] group-hover:text-black/60 transition duration-1000"
                href="/login"
              >
                Phones
              </Link>
            </div>

            <div className="hover:bg-red-400 h-10 px-3 flex items-center hoverEle group">
              <Link
                className="text-black dark:text-white w-full  text-[16px] leading-[1.1] font-[500] group-hover:text-black/60 transition duration-1000"
                href="/login"
              >
                Coumputer
              </Link>
            </div>

            <div className="hover:bg-red-400 h-10 px-3 flex items-center hoverEle group relative">
              <Link
                className="text-black dark:text-white w-full  text-[16px] leading-[1.1] font-[500] group-hover:text-black/60 transition duration-1000"
                href="/login"
              >
                T-shirt
              </Link>
              <ArrowForwardIos
                fontSize="small"
                className=" text-sm text-black dark:text-white group-hover:text-black/60 transition duration-1000"
              />
              <div className="group-hover:flex hoverEl absolute bg-gray-700 -right-44 w-44 hidden flex-col gap-2 py-2 top-0 rounded-md">
                <div className="hover:bg-red-400 h-10 px-3 flex items-center hoverEle text-black dark:text-white">
                  Men
                </div>
                <div className="hover:bg-red-400 h-10 px-3 flex items-center hoverEle text-black dark:text-white">
                  Women
                </div>
              </div>
            </div>
          </div>
        )}
        <ul className="list-nav-box hidden lg:flex flex-wrap items-center gap-[30px] ">
          <li className="close lg:hidden">X</li>
          <li className="leading-[1]">
            <Link
              className="text-[#FFF] hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
              href="products"
            >
              Accessories
            </Link>
          </li>
          <li className="leading-[1]">
            <Link
              className="text-[#FFF] hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
              href="products"
            >
              Networking
            </Link>
          </li>
          <li className="leading-[1]">
            <Link
              className="text-[#FFF] hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
              href="products"
            >
              Computers
            </Link>
          </li>
          <li className="leading-[1]">
            <Link
              className="text-[#FFF] hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
              href="products"
            >
              Phones
            </Link>
          </li>
          <li className="leading-[1]">
            <Link
              className="text-[#FFF] hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
              href="products"
            >
              Monitors
            </Link>
          </li>
        </ul>

        <div className="relative lg:hidden ">
          <button
            className="lg:hidden "
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {!showMenu ? (
              <svg
                className="w-[30px] h-[30px] cursor-pointer hover:fill-red-400 dark:hover:fill-red-400 dark:fill-[#FFF] fill-[#020101] transition-transform duration-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M2 7h20a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zM22 11H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2zM22 17H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2z"></path>
                </g>
              </svg>
            ) : (
              <svg
                className="w-[30px] h-[30px] cursor-pointer hover:fill-red-400 dark:hover:fill-red-400 dark:fill-[#FFF] fill-[#020101] transition-transform duration-500 transform rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M18.36 6.64a1 1 0 0 0-1.41 0L12 11.59 7.05 6.64a1 1 0 0 0-1.41 1.41L10.59 13l-4.95 4.95a1 1 0 0 0 1.41 1.41L12 14.41l4.95 4.95a1 1 0 0 0 1.41-1.41L13.41 13l4.95-4.95a1 1 0 0 0 0-1.41z"></path>
                </g>
              </svg>
            )}
          </button>
          {showMenu && (
            <ul
              className={`flex flex-col flex-wrap items-center gap-[30px] w-[200px] p-4 z-50 absolute -right-1 bg-white shadow dark:bg-gray-700 rounded-lg transition-opacity duration-300 ease-in-out transform  ${
                showMenu
                  ? "opacity-100 translate-y-0 "
                  : "opacity-0 -translate-y-10"
              }`}
            >
              <li className="leading-[1]">
                <Link
                  className="text-black dark:text-white hover:text-red-400 dark:hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
                  href="/"
                >
                  Accessories
                </Link>
              </li>
              <li className="leading-[1]">
                <Link
                  className="text-black dark:text-white hover:text-red-400 dark:hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
                  href="products"
                >
                  Networking
                </Link>
              </li>
              <li className="leading-[1]">
                <Link
                  className="text-black dark:text-white hover:text-red-400 dark:hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
                  href="products"
                >
                  Computers
                </Link>
              </li>
              <li className="leading-[1]">
                <Link
                  className="text-black dark:text-white hover:text-red-400 dark:hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
                  href="products"
                >
                  Phones
                </Link>
              </li>
              <li className="leading-[1]">
                <Link
                  className="text-black dark:text-white hover:text-red-400 dark:hover:text-red-400 text-[16px] leading-[1.1] font-[500]"
                  href="products"
                >
                  Monitors
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headr;