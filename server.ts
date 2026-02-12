import express from "express";
import Stripe from "stripe";
import cors from "cors";

const stripe = new Stripe(
  "sk_test_51My2HlAidB9BOOfUe0ufDFYJGtTkuQOSSRJYxfnc25gLn3Vh2I6Q8lvB2ixgyNExDUjvlHxSkNgcxxnGJWb73R2F00cQSfPmu2"
);

const app = express();
app.use(express.json());
app.use(cors());

const port = 3333;

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "";
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type CartItem = {
  product: Product;
  quantity: number;
};

app.post("/create-session", async (req, res) => {
  const products = req.body as CartItem[];

  const customer = await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:5173/success",
    success_url: "http://localhost:5173/success",
    mode: "payment",
    line_items: products.map(({ product, quantity }) => {
      return {
        price_data: {
          unit_amount: product.price * 100,
          currency: "brl",
          product_data: {
            name: product.title,
            images: [product.image],
          },
        },
        metadata: {
          title: product.title,
          image: product.image
        },
        quantity,
      };
    }),
  });

  const { url } = customer;
  res.send(url);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
