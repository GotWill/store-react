export type Categories =
  | "jewelery"
  | "electronics"
  | "women's clothing"
  | "men's clothing";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Categories;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
