import { Favorites } from "./favorites";
import { Order } from "./orderProduct";
import { ShopCartItems } from "./shoppingCart";

export interface User {
    _id: string;
    username: string;
    email: string;
    active: boolean;
    favorites: Favorites[];
    shopCart: ShopCartItems[];
    orders: Order[];
  }