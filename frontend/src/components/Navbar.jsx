import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart?.items?.reduce((s, it) => s + (it.quantity || 0), 0) || 0;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">🛒 Nexora Shop</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({count})</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}
