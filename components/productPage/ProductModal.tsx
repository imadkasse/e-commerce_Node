import {
  AddShoppingCartOutlined,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  LocalMallOutlined,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReviewModel from "./ReviewModel";
import AddReview from "./AddReview";
import PrviewsImages from "./PrviewsImages";
import ShoppingCartBtnProductModal from "../shoppingCartFunction/ShoppingCartBtnProductModal";
import { cookies } from "next/headers";
import FavoriteBtn from "../favoriteBtn/FavoriteBtn";

interface Id {
  id: string;
}
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviews: Review[];
}
interface FavoriteProduct {
  _id: string;
}

interface ShopCartProduct {
  _id: string;
}

const ProductModal: React.FC<Id> = async ({ id }) => {
  const data = await axios.get(
    `${process.env.BACK_URL}/api/eco/products/${id}`
  );
  const product: Product = data.data.data.data;
  console.log("img", product.images);

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="">
        <div className="font-sans  w-full text-light-text dark:text-dark-text  bg-light-background/10 dark:bg-gray-800 ">
          <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 border p-6 rounded-lg">
              <PrviewsImages
                imagesArr={product.images}
                favProduct={[]}
                product={product}
              />

              <div className="lg:col-span-2">
                <h2 className="text-2xl font-extrabold ">
                  {product.name} | {product.category}
                </h2>

                <div className="flex space-x-2 mt-4">
                  <Rating
                    className="text-red-400"
                    name="half-rating-read"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <h4 className=" text-base">{product.rating}</h4>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <p className=" text-3xl font-bold">${product.price}</p>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button className="min-w-[200px] px-4 py-3 flex items-center justify-evenly bg-red-400 hover:bg-red-400/60 hoverEle text-white text-sm font-semibold rounded">
                    Buy now
                    <LocalMallOutlined />
                  </button>
                  <ShoppingCartBtnProductModal
                    isInShoppingCart={false}
                    productId={product._id}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-md border p-6">
              <h1 className="text-2xl font-bold">Reviews:</h1>
              <div>
                {/* Comments  */}
                <ReviewModel reviews={product.reviews} />
              </div>
              <div>
                <AddReview id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dataFav = await axios.get(
    `${process.env.BACK_URL}/api/eco/products/favorite/allItems`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const favorites: FavoriteProduct[] = dataFav.data.data.favorites;
  const favProduct = favorites.map((fav) => fav._id);

  const dataShopCart = await axios.get(
    `${process.env.BACK_URL}/api/eco/products/shopCart/allItems`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const shopCartItems: ShopCartProduct[] = dataShopCart.data.data.shopCart;
  const shopCartIds = shopCartItems.map((item) => item._id);

  return (
    <div className="">
      <div className="font-sans  w-full text-light-text dark:text-dark-text  bg-light-background/10 dark:bg-gray-800 ">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 border p-6 rounded-lg">
            <PrviewsImages
              imagesArr={product.images}
              favProduct={favProduct}
              product={product}
            />

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold ">
                {product.name} | {product.category}
              </h2>

              <div className="flex space-x-2 mt-4">
                <Rating
                  className="text-red-400"
                  name="half-rating-read"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />
                <h4 className=" text-base">{product.rating}</h4>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <p className=" text-3xl font-bold">${product.price}</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button className="min-w-[200px] px-4 py-3 flex items-center justify-evenly bg-red-400 hover:bg-red-400/60 hoverEle text-white text-sm font-semibold rounded">
                  Buy now
                  <LocalMallOutlined />
                </button>
                {shopCartIds.includes(product._id) ? (
                  <ShoppingCartBtnProductModal
                    productId={product._id}
                    isInShoppingCart={true}
                  />
                ) : (
                  <ShoppingCartBtnProductModal
                    productId={product._id}
                    isInShoppingCart={false}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-md border p-6">
            <h1 className="text-2xl font-bold">Reviews:</h1>
            <div>
              {/* Comments  */}
              <ReviewModel reviews={product.reviews} />
            </div>
            <div>
              <AddReview id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
