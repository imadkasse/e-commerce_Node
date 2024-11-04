export interface User {
    _id: string;
    username: string;
    email: string;
    active: boolean;
    favorites: Favorites[];
    shopCart: Shop;
    orders: Order[];
  }