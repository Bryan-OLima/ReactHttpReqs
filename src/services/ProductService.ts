import type { IProudct } from "../interfaces/IProduct";

const url = "http://localhost:3000/products";

export const ProductService = {
  getAllProducts: async (): Promise<IProudct[]> => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro na rede");

      const products = await res.json();
      return products;
    } catch (e: unknown) {
      console.error(`Error at getting all products: ${e}`);
      throw e;
    }
  },

  setProduct: async (name: string, price: number): Promise<void> => {
    try {
      const product: IProudct = {
        id: crypto.randomUUID(),
        name: name,
        price: price,
      };
      await post(product);
    } catch (e) {
      console.error(`Error at saving product in database ${e}`);
    }
  },
};

const post = async (item: unknown) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};
