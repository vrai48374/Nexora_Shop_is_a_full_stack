import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function CartPage() {
  const { cart, fetchCart, removeFromCart, loading } = useCart();
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return <Loader />;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.items.map((it) => (
              <div key={it.product._id} className="cart-row">
                <div>
                  <strong>{it.product.name}</strong>
                  <div>₹{it.product.price} × {it.quantity}</div>
                </div>
                <div>
                  <button
                    className="btn red"
                    onClick={async () => {
                      setBusyId(it.product._id);
                      try {
                        await removeFromCart(it.product._id);
                      } catch (e) {
                        alert("Remove failed");
                      } finally {
                        setBusyId(null);
                      }
                    }}
                    disabled={busyId === it.product._id}
                  >
                    {busyId === it.product._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ₹{cart.totalAmount}</h3>
          </div>
        </>
      )}
      {loading && <div style={{marginTop:8}}>Updating...</div>}
    </div>
  );
}
