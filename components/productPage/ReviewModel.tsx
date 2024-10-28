import {
  DeleteOutlineOutlined,
  Edit,
  Favorite,
  Remove,
  RemoveOutlined,
  Star,
} from "@mui/icons-material";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import DeleteAndUpdateReview from "./DeleteAndUpdateReview";

type Props = {
  reviews: Review[];
};

const ReviewModel = async ({ reviews }: Props) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  let userID: string;
  if (token) {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.data.data.user.role === "user") {
      userID = data.data.data.user._id;
      console.log(data.data.data.user.username);
    }
  }

  return (
    <>
      {reviews.map((review) => {
        return (
          <div className="border rounded-lg py-3 px-4 my-5" key={review._id}>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-4">
                <div>
                  <Image
                    width={5000}
                    height={5000}
                    src="/imgs/1.png"
                    alt="Product"
                    className=" w-14 h-14 rounded-full border  "
                  />
                </div>
                <div>
                  <div className="flex w-[60px] items-center justify-center gap-1 bg-amber-300 py-1 px-2 rounded-lg">
                    <span className="text-amber-900">{review.rating}</span>
                    <Star className="text-amber-600" />
                  </div>

                  <div>
                    <h1 className="text-xl">{review.user.username}</h1>
                  </div>
                </div>
              </div>
              {userID === review.user._id ? (
                <DeleteAndUpdateReview
                  id={review._id}
                  reviewMsg={review.review}
                  ratingNum={review.rating}
                />
              ) : (
                ""
              )}
            </div>

            <div>
              <p>{review.review}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReviewModel;
