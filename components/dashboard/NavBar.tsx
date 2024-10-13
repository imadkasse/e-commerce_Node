"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { ArrowForwardOutlined, LogoutOutlined } from "@mui/icons-material";
import { useSidebar } from "./context/sidebarCont";
import { useAdmin } from "./context/useAdmin";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { admin, setAdmin } = useAdmin();
  const router = useRouter();

  const token = Cookies.get("token-admin");

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

  useEffect(() => {
    console.log(admin);
    console.log(token);
  }, [admin, token]);

  const { isOpen, toggleSidebar } = useSidebar();

  const handleSignOut = () => {
    Cookies.remove("token-admin");
    // window.location.reload();
    router.push("/dashboard/login-admin");

    router.refresh();
    setAdmin(null);
  };

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
        </div>

        <div className="flex items-center gap-6  w-full justify-end ">
          {/* <!-- Dark Mode Toggler --> */}
          <DarkModeSwitcher />
          {/* <!-- Dark Mode Toggler --> */}

          {/* <!-- User Area --> */}
          <div className="relative z-50">
            {admin ? (
              <div>
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
                      <div>{admin.username}</div>
                      <div className="font-medium truncate">{admin.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="avatarButton"
                    >
                      <li>
                        <Link
                          href="/dashboard/"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/orders"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/users"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Users
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/products"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Products
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <button
                        onClick={handleSignOut}
                        className="flex justify-between w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-600 rounded-2xl dark:hover:bg-red-700 dark:text-gray-200 hoverEle hover:text-white"
                      >
                        <p>Sign out</p>
                        <LogoutOutlined />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/dashboard/login-admin"
                className="text-gray-800 dark:text-white bg-red-400 hoverEle hover:bg-red-400/60  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-red-400/60 "
              >
                Log in
              </Link>
            )}
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
