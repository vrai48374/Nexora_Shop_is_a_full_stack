import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Helper: recalculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
};

// POST /api/cart -> Add item {productId, qty}
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [] });

    // Check if already in cart
    const existingItem = cart.items.find((item) => item.product.equals(productId));
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.populate("items.product");
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// GET /api/cart -> Get all items + total
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items.product");
    if (!cart) return res.json({ items: [], totalAmount: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// DELETE /api/cart/:id -> remove item
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne().populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => !item.product._id.equals(id));
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error: error.message });
  }
};
