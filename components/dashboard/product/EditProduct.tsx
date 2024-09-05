"use client";
import { EditOutlined } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Product {
  idPro: string;
  namePro?: string;
  pricePro?: number;
  descriptionPro?: string;
  imagePro?: string;
  categoryPro?: string;
  quantityPro?: number;
  newPricePro?: number;
  ratingPro?: number;
  availabilityPro?: boolean;
}

const EditProduct: React.FC<Product> = ({
  idPro,
  namePro,
  pricePro,
  descriptionPro,
  imagePro,
  categoryPro,
  quantityPro,
  newPricePro,
  ratingPro,
  availabilityPro,
}) => {
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  const [newPrice, setNewPrice] = useState<number>(newPricePro || 0);
  const [category, setCategory] = useState<string>(categoryPro || "");
  const [name, setName] = useState<string>(namePro || "");
  const [description, setDescription] = useState<string>(descriptionPro || "");
  const [price, setPrice] = useState<number>(pricePro || 0);
  const [rating, setRating] = useState<number>(ratingPro || 0);
  const [quantity, setQuantity] = useState<number>(quantityPro || 0);
  const [image, setImage] = useState<string>(imagePro || "");
  const [availability, setAvailability] = useState<boolean>(
    availabilityPro || false
  );

  const handelUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const product = {
        name: name || namePro,
        description: description || descriptionPro,
        rating: rating || ratingPro,
        price: price || pricePro,
        quantity: quantity || quantityPro,
        category: category || categoryPro,
        images: image || imagePro,
        newPrice: newPrice || newPricePro,
        availability: availability,
      };
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/products/${idPro}`,
        product
      );
      router.refresh();
      setToggle(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
        className="font-medium text-blue-600 dark:text-blue-500 mr-1"
      >
        <EditOutlined className="hover:text-blue-600/70 dark:hover:text-blue-500/70  hoverEle" />
      </button>
      {toggle && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 overflow-y-scroll">
          <div className="relative px-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Product
              </h3>
              <button
                onClick={() => {
                  setToggle(false);
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-3" onSubmit={handelUpdate}>
                <div>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    placeholder="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => {
                      setRating(Number(e.target.value));
                    }}
                    placeholder="rating"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                    placeholder="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => {
                      setNewPrice(Number(e.target.value));
                    }}
                    placeholder="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                    }}
                    placeholder="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                    placeholder="images"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={availability.toString()} // القيمة المختارة
                    onChange={(e) => setAvailability(e.target.value === "true")} // تحديث الحالة بناءً على الخيار المختار
                  >
                    <option value="true">available</option>
                    <option value="false">not available</option>
                  </select>
                  <p>Current availability: {availability.toString()}</p>
                </div>

                <button
                  type="submit"
                  className="w-full hoverEle text-white bg-red-400 hover:bg-red-400/60 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-400/60 dark:focus:ring-white"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProduct;
