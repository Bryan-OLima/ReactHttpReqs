import type { IProudct } from "../interfaces/IProduct";

const url = "http://localhost:3000/products";

export const ProductService = {
  getAllProducts: async (): Promise<IProudct[]> => {
    try {
      const res = await fetch(url);
      if (!res.ok) console.error("Erro na resposta de rede");

      const products = await res.json();
      return products;
    } catch (e) {
      console.error(`Error at getting all products: ${e}`);
      return [];
    }
  },

  setProduct: async (name: string, price: number): Promise<void> => {
    try {
      const product: IProudct = {
        id: crypto.randomUUID(),
        name: name,
        price: price,
      };
      post(product);
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
