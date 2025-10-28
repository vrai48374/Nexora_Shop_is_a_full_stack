import Cart from "../models/cartModel.js";

// POST /api/checkout -> mock checkout receipt
export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const cart = await Cart.findOne().populate("items.product");
    if (!cart) return res.status(400).json({ message: "Cart is empty" });

    const total = cart.totalAmount || 0;
    const timestamp = new Date();

    // Optional: Clear cart after checkout
    await Cart.deleteMany({});

    res.json({
      success: true,
      receipt: {
        total,
        timestamp,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};
