import Image from "next/image";
import React from "react";
import FavoriteBtn from "./FavoriteBtn";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

interface Favorite {
  _id: string;
  name: string;
  price: number;
  images: Array<string>;
}

const Favorite = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="px-6 md:px-10 min-h-screen  bg-white text-light-text dark:text-dark-text bg-light-background/50 dark:bg-gray-800 py-4">
        <div className="w-full  h-full flex flex-col gap-3 justify-center items-center ">
          <Link
            href="/login"
            className="text-4xl flex flex-col text-center gap-3"
          >
            You Are Not Loggin
            <span className="hover:text-red-400 hoverEle">
              Please Click Here To Log In
            </span>
          </Link>
          <Link href="/" className="text-4xl ">
            <span className="hover:text-red-400 hoverEle">home page</span>
          </Link>
        </div>
      </div>
    );
  }
  const data = await axios.get(
    `${process.env.BACK_URL}/api/eco/products/favorite/allItems`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const favorites: Favorite[] = data.data.data.favorites;

  return (
    <div className="py-8 bg-light-background/50 dark:bg-gray-800 min-h-screen px-6 md:px-10 text-light-text dark:text-dark-text">
      <div className="grid md:grid-cols-3 gap-4 ">
        {data ? (
          favorites.map((favorite) => {
            return (
              <div key={favorite._id} className="md:col-span-3 space-y-4">
                <div className="flex gap-4 bg-gray-100 dark:bg-gray-700 px-4 py-6 rounded-md ">
                  <div className="flex gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                      <Image
                        width={150}
                        height={150}
                        alt="imgFav"
                        src="/imgs/1.png"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-base font-bold ">
                          {favorite.name}
                        </h3>
                        <p className="text-sm font-semibold  mt-2 flex items-center gap-2">
                          Color:
                          <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col">
                    <FavoriteBtn id={favorite._id} />
                    <h3 className="text-base font-bold  mt-auto">
                      ${favorite.price}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-white">Not any Product </h1>
        )}
        {favorites.length === 0 ? <h1 className="text-red-400 text-4xl col-span-4 text-center ">Not any Product</h1> : ""}
      </div>
    </div>
  );
};

export default Favorite;
