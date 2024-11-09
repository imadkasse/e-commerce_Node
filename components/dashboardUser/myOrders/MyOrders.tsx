"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Order } from "@/components/types/orderProduct";
import DeleteOrderBtn from "./DeleteOrderBtn";
import Loader from "@/components/loader/Loader";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/orders/orderByUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [token]); // اعتمد على token فقط

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="w-full h-full  overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        <div className="border w-full h-full flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                orders
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {orders?.map((order) => {
              return (
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  key={order._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4  text-center font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">{order.address}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {order.date.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4">${order.price}</td>
                  <td className="px-6 py-4 text-center">
                    <DeleteOrderBtn id={order._id} fetchOrders={fetchOrders} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
MyOrders.displayName = "MyOrders";
export default MyOrders;
