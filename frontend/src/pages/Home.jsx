import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart, loading } = useCart();
  const [fetching, setFetching] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setErr("");
        setFetching(true);
        const res = await API.get("/products");
        setProducts(res.data || []);
      } catch (e) {
        setErr("Failed to load products");
        console.error(e);
      } finally {
        setFetching(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart");
    } catch {
      alert("Failed to add");
    }
  };

  if (fetching) return <Loader />;
  return (
    <div>
      <h2>Products</h2>
      {err && <p className="error">{err}</p>}
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={handleAdd} />
        ))}
      </div>
      {loading && <div style={{marginTop:8}}>Updating cart...</div>}
    </div>
  );
}
