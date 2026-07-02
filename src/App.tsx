import { useEffect, useState } from "react";
import "./App.css";
import type { IProudct } from "./interfaces/IProduct";
import { ProductService } from "./services/ProductService";

function App() {
  const [products, setProducts] = useState<IProudct[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await ProductService.getAllProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleSubmit = () => {
    const saveProduct = async (name: string, price: number): Promise<void> => {
      ProductService.setProduct(name, price);
    };

    saveProduct(name, Number(price));
  };

  return (
    <div className="app">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - R$ {p.price}
          </li>
        ))}
      </ul>
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          Nome:{" "}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
          />
        </label>
        <label>
          Preço:{" "}
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
          />
        </label>
        <input type="submit" value="Salvar" />
      </form>
    </div>
  );
}

export default App;
