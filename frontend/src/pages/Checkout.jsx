import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, checkout } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [busy, setBusy] = useState(false);

  const handlePay = async () => {
    if (!name || !email) return alert("Enter name & email");
    try {
      setBusy(true);
      const res = await checkout(cart.items);
      setReceipt(res.receipt || res);
    } catch (e) {
      alert("Checkout failed");
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  if (receipt) {
    return (
      <div>
        <h2>Receipt</h2>
        <div className="receipt">
          <p><strong>Total:</strong> ₹{receipt.total}</p>
          <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      <div style={{maxWidth:420}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="input" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="input" />
        <div style={{marginTop:8}}>
          <strong>Pay: ₹{cart.totalAmount || 0}</strong>
        </div>
        <button className="btn green" onClick={handlePay} disabled={busy}>
          {busy ? "Processing..." : `Pay ₹${cart.totalAmount || 0}`}
        </button>
      </div>
    </div>
  );
}
