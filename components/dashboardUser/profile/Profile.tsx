"use client ";
import { useUser } from "@/components/login&signUp/context/user";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Profile = () => {
  const { user } = useUser();
  return (
    <div className=" w-full h-full p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4 relative">

      </div>
      <div className="flex xs:flex-col   items-center gap-5 justify-center pb-10">
        <Image
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/imgs/user.png"
          width={150}
          height={150}
          alt="Bonnie image"
        />
        <div className="flex flex-col">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.username}
          </h5>
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">
            User || admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
