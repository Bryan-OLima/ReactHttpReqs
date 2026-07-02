import { useEffect, useState } from "react";
import "./App.css";
import type { IProudct } from "./interfaces/IProduct";
import { ProductService } from "./services/ProductService";

function App() {
  const [products, setProducts] = useState<IProudct[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleIsApiLoading = () => {
    setIsApiLoading((e) => !e);
  };

  const handleDeleteItems = async (id: string) => {
    try {
      await ProductService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setErrorMessage("Erro ao tentar deletar item");
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    handleIsApiLoading();

    try {
      const dummyProduct: IProudct = {
        id: String(products.length + 1),
        name,
        price: Number(price),
      };

      setProducts((prev) => [...prev, dummyProduct]);
      await ProductService.setProduct(name, Number(price));
      setName("");
      setPrice("");
    } catch (e) {
      console.error(e);
    } finally {
      handleIsApiLoading();
      console.log(isApiLoading);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsApiLoading(true);
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
      {isLoading && <p>Carregando Lista...</p>}
      {errorMessage}
      {!isLoading && (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - R$ {p.price}
              <button onClick={() => handleDeleteItems(p.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}
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
        {isApiLoading && <button disabled>Aguarde...</button>}
        {!isApiLoading && <button>Salvar</button>}
      </form>
    </div>
  );
}

export default App;
