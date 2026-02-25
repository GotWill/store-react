import { render } from "@testing-library/react";
import { CardProduct } from "./card-product";
import type { Product } from "../types/products";
import { BrowserRouter } from "react-router-dom";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

describe("Cart", () => {
  it("should show correct cart products", () => {
    const product: Product = {
      id: 1,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      category: "men's clothing",
      description: "Camisa confortavel para vestir",
      image: "",
      price: 50,
      rating: {
        count: 20,
        rate: 1,
      },
    };

    const { getByText } = render(
      <BrowserRouter>
        <CardProduct product={product} />
      </BrowserRouter>
    );

    getByText("Mens Casual Premium Slim Fit T-Shirts");
    getByText("R$ 50,00");
    getByText("Masculino");
  });
});
