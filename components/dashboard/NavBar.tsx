"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { ArrowForwardOutlined } from "@mui/icons-material";
import { useSidebar } from "./context/sidebarCont";

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | Event) => {
      // تحقق مما إذا كان النقر خارج القائمة

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
  }, [showUserMenu]);
  const { isOpen, toggleSidebar } = useSidebar();
  return (
    <header
      className={`sticky top-0 z-999 bg-gray-50 border-b  dark:bg-gray-800  flex  w-full transition duration-300 h-16 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none `}
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center  md:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            onClick={toggleSidebar}
            className="w-16  dark:text-white text-black  p-2 h-[63px] group "
          >
            <ArrowForwardOutlined
              className={`${isOpen ? "group-hover:rotate-180" : ""} hoverEle`}
            />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
          {/* <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image width={32} height={32} src={"/imgs/1.png"} alt="Logo" />
          </Link> */}
        </div>

        <div className="flex items-center gap-6  w-full justify-end ">
          {/* <!-- Dark Mode Toggler --> */}
          <DarkModeSwitcher />
          {/* <!-- Dark Mode Toggler --> */}

          {/* <!-- User Area --> */}
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
                className="z-50 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>Bonnie Green</div>
                  <div className="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
