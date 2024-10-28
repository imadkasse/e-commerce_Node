import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteBtn from "./DeleteBtn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const Users = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token-admin")?.value;

  const data = await axios.get(`${process.env.BACK_URL}/api/eco/users`);
  const users: User[] = data.data.data.data;

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl text-gray-700 dark:text-white">
          You are not authorized to access this page
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please
          <Link
            href="/dashboard/login-admin"
            className="text-red-400 hover:underline"
          >
            login as admin
          </Link>
          to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    width={500}
                    height={150}
                    className="w-10 h-10 rounded-full"
                    src="/imgs/1.png"
                    alt="Jese image"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {user.username}
                    </div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.role}</td>

                <td className="px-6 py-4 text-center">
                  <DeleteBtn id={user._id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </Link>
          </li>
          <li>
            <Link
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Users;
