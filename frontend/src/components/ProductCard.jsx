export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image || "/placeholder.png"} alt={product.name} className="card-img" />
      <h3 className="card-title">{product.name}</h3>
      <p className="card-price">₹{product.price}</p>
      <button className="btn" onClick={() => onAdd(product._id)}>Add to cart</button>
    </div>
  );
}
