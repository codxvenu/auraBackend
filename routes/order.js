import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import OrderService from "../services/OrderService.js";

const router = Router();
router.use(authMiddleware);
router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const userId = req?.user?.userId;
    const result = await OrderService.list(userId);
    res.status(200).json(result);
  }),
);
router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const userId = req?.user?.userId;
    const { productIds,finalTotal } = req?.body;
    const result = await OrderService.add(userId, productIds,finalTotal);
    console.log(result)
    res.status(200).json(result);
  }),
);
export default router;
