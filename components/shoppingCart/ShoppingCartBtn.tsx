"use cleint";
import { AddOutlined, DeleteOutlined, RemoveOutlined } from "@mui/icons-material";
import React, { useState } from "react";

const ShoppingCartBtn = () => {
  const [amount, setAmount] = useState<number>(1);
  const addHandler = () => {
    setAmount(amount + 1);
  };
  const minusHandler = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  return (
    <div className="flex justify-between mt-4">
      <div>
        <div className="flex items-center px-2.5 py-1.5 border border-gray-300  text-xs outline-none bg-transparent rounded-md">
          <button className="" onClick={minusHandler}>
            <RemoveOutlined fontSize="small" />
          </button>

          <span className="mx-2.5 text-[16px]">{amount}</span>

          <button className="" onClick={addHandler}>
            <AddOutlined fontSize="small" />
          </button>
        </div>
      </div>
      <button className="hover:text-red-400 hoverEle">
        <DeleteOutlined />
      </button>
    </div>
  );
};

export default ShoppingCartBtn;
