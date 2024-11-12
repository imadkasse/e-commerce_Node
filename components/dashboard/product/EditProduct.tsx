"use client";
import { Add, CloseOutlined, EditOutlined } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Product {
  idPro: string;
  namePro?: string;
  pricePro?: number;
  descriptionPro?: string;
  imagePro?: string[];
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
  const [loading, setLoading] = useState<boolean>(false);

  const [newPrice, setNewPrice] = useState<number>(newPricePro || 0);
  const [category, setCategory] = useState<string>(categoryPro || "");
  const [name, setName] = useState<string>(namePro || "");
  const [description, setDescription] = useState<string>(descriptionPro || "");
  const [price, setPrice] = useState<number>(pricePro || 0);
  const [rating, setRating] = useState<number>(ratingPro || 0);
  const [quantity, setQuantity] = useState<number>(quantityPro || 0);
  const [arrImgs, setArrImgs] = useState<string[] | undefined>(imagePro); // url as string
  const [image, setImage] = useState<File[] | null>();

  const [availability, setAvailability] = useState<boolean>(
    availabilityPro || false
  );

 

  const handelUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (image && image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("rating", rating.toString()); // تأكد من تحويل القيم إلى نصوص
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("category", category);

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
        formData
      );
      router.refresh();
      setToggle(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
                  <div className="flex justify-between mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                    <label className="flex flex-col w-16 h-16 items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                      <Add />
                      <input
                        type="file"
                        accept="image/*" // تأكد من قبول الصور فقط
                        onChange={(e) => {
                          if (e.target.files) {
                            const selectedImages = Array.from(e.target.files);

                            setImage(selectedImages);
                            setArrImgs(selectedImages.map((img) => URL.createObjectURL(img)));
                          }
                        }}
                        className="hidden"
                        multiple
                      />
                    </label>

                    {arrImgs?.map((img, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 p-2 bg-gray-400 rounded-md cursor-pointer relative group transition-transform duration-300 ease-in-out"
                      >
                        <Image
                          src={img}
                          alt="imgProduct"
                          width={150}
                          height={150}
                          className=" w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
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
                  className={`w-full hoverEle text-white bg-red-400 ${
                    loading
                      ? "bg-red-400/60 dark:bg-red-400/60 cursor-not-allowed"
                      : "hover:bg-red-400/60 dark:hover:bg-red-400/60"
                  }   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400  `}
                >
                  {loading ? "Updating Product..." : "Update"}
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
