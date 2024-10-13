import React from "react";
import { useSidebar } from "../context/sidebarCont";
import Link from "next/link";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "axios";
import { cookies } from "next/headers";
import { Order } from "@/components/types/orderProduct";

const Orders = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token-admin")?.value;

  let orders: Order[] = [];

  const fetchOrders = async () => {
    try {
      const data = await axios.get(`${process.env.BACK_URL}/api/eco/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      orders = data.data.data.orders;

      return orders;
    } catch (error) {
      console.error("Error fetching orders");
    }
  };
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

  if (token) {
    await fetchOrders();
  }

  return (
    <>
      {orders.length > 0 ? (
        <div className=" overflow-auto shadow-md sm:rounded-lg  ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  username & email
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr
                    key={order._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.username} |
                      <span className="text-gray-400">{order.email}</span>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 flex flex-col gap-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.products.map((product,index) => {
                        return (
                          <div className="" key={product._id}>
                            <h1><span className="pr-2">{index+1}-</span>{product.name}</h1>
                          </div>
                        );
                      })}
                    </th>
                    <td className="px-6 py-4">${order.price}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 "
                      >
                        <DeleteOutlined className="hover:text-red-600/70 dark:hover:text-red-500/70 hoverEle" />
                      </Link>
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
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
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
      ) : (
        ""
      )}
    </>
  );
};

export default Orders;
