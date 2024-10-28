type Review = {
  _id: string;
  rating: number;
  review: string;
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
};
