import { useEffect, useState } from "react";
import "./App.css";
import type { IProudct } from "./interfaces/IProduct";
import { ProductService } from "./services/ProductService";

function App() {
  const [products, setProducts] = useState<IProudct[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = () => {
    const saveProduct = async (name: string, price: number): Promise<void> => {
      ProductService.setProduct(name, price);
    };

    const parsedPrice = Number(price);

    // This code part is how to add dynamicaly without consulting db
    // const dummyProduct: IProudct = {
    //   id: crypto.randomUUID(),
    //   name,
    //   price: parsedPrice,
    // };

    // setProducts((prev) => [...prev, dummyProduct]);
    saveProduct(name, parsedPrice);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error(e);
        setErrorMessage(
          "Erro ao tentar carregar os produtos. Recarregue a página ou aguarde alguns minutos",
        );
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="app">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando Lista...</p>}
      {errorMessage}
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
        {/* <input type="submit" value="Salvar" /> */}
        <button onClick={handleSubmit}>Salvar</button>
      </form>
    </div>
  );
}

export default App;
