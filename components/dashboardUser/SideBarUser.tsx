"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import Profile from "./profile/Profile";
import MyOrders from "./myOrders/MyOrders";
import {
  ArrowForwardIosOutlined,
  ModeEdit,
  Password,
  Person,
  PersonOutlined,
  ShoppingBag,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import Dashboard from "./home/Home";
import Edit from "./editProfile/Edit";
import ChangePassword from "./changePassword/ChangePassword";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

const SideBarUser = () => {
  const path = usePathname();
  const pathName = path.split("/");
  const [component, setComponent] = useState<ReactElement | null>(
    <Dashboard />
  );

  const handleComponentChange = (newComponent: ReactElement) => {
    setComponent(newComponent);
  };

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const token = Cookies.get("token");
  // if user not logged in
  if (!token) {
    return (
      <div className="px-6 md:px-10 h-screen  bg-white text-light-text dark:text-dark-text bg-light-background/50 dark:bg-gray-800 py-4">
        <div className="w-full  h-full flex  justify-center items-center ">
          <Link
            href="/login"
            className="text-4xl flex flex-col text-center gap-3"
          >
            You Are Not Loggin
            <span className="hover:text-red-400 hoverEle">
              Please Click Here To Log In
            </span>
          </Link>
        </div>
      </div>
    );
  }
  console.log(component?.type.name.toLowerCase());
  return (
    <div className="relative bg-light-background/50 dark:bg-gray-800 px-6 md:px-10 text-light-text dark:text-dark-text">
      <div className="flex py-4 ">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {pathName}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                {
                  //@ts-ignore
                  component?.type.name.toLowerCase()
                }
              </span>
            </div>
          </li>
        </ol>
      </div>

      <div className="flex md:flex-row xs:flex-col gap-7  ">
        <nav
          className={` md:w-60 xs:w-full h-[71vh]  border-r-2 border-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800 md:bg-gray-50 md:dark:bg-gray-800   `}
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => {
                    handleComponentChange(<Dashboard />);
                  }}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    //@ts-ignore
                    component?.type.name === "Dashboard"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <svg
                    className={`text-gray-500 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                      //@ts-ignore
                      component?.type.name === "Dashboard"
                        ? "dark:text-white text-gray-900 "
                        : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleComponentChange(<Profile />);
                  }}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    //@ts-ignore
                    component?.type.name === "Profile"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <Person
                    fontSize="medium"
                    className={`text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                      //@ts-ignore
                      component?.type.name === "Profile"
                        ? "dark:text-white text-gray-900 "
                        : ""
                    }`}
                  />
                  <span className="ms-3">Profile</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleComponentChange(<MyOrders />);
                  }}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    //@ts-ignore
                    component?.type.name === "MyOrders"
                      ? "bg-gray-100 dark:bg-gray-700 "
                      : ""
                  }`}
                >
                  <ShoppingBag
                    fontSize="medium"
                    className={`text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                      //@ts-ignore
                      component?.type.name === "MyOrders"
                        ? "dark:text-white text-gray-900 "
                        : ""
                    }`}
                  />
                  <span className="ms-3">Orders</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleComponentChange(<Edit />);
                  }}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    //@ts-ignore
                    component?.type.name === "Edit"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <ModeEdit
                    fontSize="medium"
                    className={`text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                      //@ts-ignore
                      component?.type.name === "Edit"
                        ? "dark:text-white text-gray-900 "
                        : ""
                    }`}
                  />
                  <span className="ms-3">Edit</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleComponentChange(<ChangePassword />);
                  }}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    //@ts-ignore
                    component?.type.name === "ChangePassword"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <Password
                    fontSize="medium"
                    className={`text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                      //@ts-ignore
                      component?.type.name === "ChangePassword"
                        ? "dark:text-white text-gray-900 "
                        : ""
                    }`}
                  />
                  <span className="ms-3">Change Password</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <section
          className={` p-7 relative ${
            isSidebarOpen ? "ml-0 flex-grow" : "ml-4 flex-grow"
          } `}
        >
          {isSidebarOpen ? (
            ""
          ) : (
            <button
              className=" p-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg"
              onClick={toggleSidebar}
            >
              <ArrowForwardIosOutlined fontSize="small" />
            </button>
          )}

          {component}
        </section>
      </div>
    </div>
  );
};

export default SideBarUser;
