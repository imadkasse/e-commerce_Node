import React from "react";
import MyOrders from "../myOrders/MyOrders";
import Profile from "../profile/Profile";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 border-red-400 ">
      <div className="border-2 border-gray-400 row-span-3 xs:col-span-3 md:col-span-2 rounded-lg">
        <MyOrders />
      </div>
      <div className="border-2 border-gray-400 flex flex-col  row-span-2 xs:col-span-3 md:col-span-1 rounded-lg">
        <Profile />
      </div>
    </div>
  );
};
Dashboard.displayName = "Dashboard";
export default Dashboard;
