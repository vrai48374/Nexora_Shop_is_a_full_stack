import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

// POST /api/cart -> add item
router.post("/", addToCart);

// GET /api/cart -> get all cart items
router.get("/", getCart);

// DELETE /api/cart/:id -> remove item
router.delete("/:id", removeFromCart);

export default router;
