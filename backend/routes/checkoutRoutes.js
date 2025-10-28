import express from "express";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();

// POST /api/checkout -> mock checkout
router.post("/", checkout);

export default router;
