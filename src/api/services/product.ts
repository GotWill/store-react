import type { Product } from "@/types/products";

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const products = await fetch(`${import.meta.env.VITE_STORE_API}/products`, {
      cache: "no-cache",
    });

    return await products.json();
  }

  async getProduct(id: string): Promise<Product> {
    const getProduct = await fetch(`${import.meta.env.VITE_STORE_API}/products/${id}`, {
      cache: "force-cache",
    });

    return await getProduct.json();
  }

  async getProductsRelated(product: Product): Promise<Product[]> {
    const products = await this.getAllProducts();

    const relatedProducts = products.filter(
      (item) => item.id !== product.id && item.category === product.category
    );

    return relatedProducts;
  }
}

export const productService = new ProductService();
