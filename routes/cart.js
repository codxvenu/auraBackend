import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import CartService from "../services/CartService.js";
import { CartAddItemSchema } from "../validator/Cart.schema.js";

const router = Router();
router.use(authMiddleware);
router.post(
  "/add",
  validator(CartAddItemSchema),
  asyncHandler(async (req, res) => {
    const { itemId } = req?.validated.body;
    const userId = req?.validated.userId;
    const result = await CartService.addItem(itemId,userId);
    res.status(200).json(result);
  }),
);
router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const { userId } = req?.user
    const result = await CartService.getCart(userId);
    res.status(200).json(result);
  }),
);
router.patch(
  "/quantityInc/:id",
  asyncHandler(async (req, res) => {
    const { userId } = req?.user
    const { id } = req?.params
    const result = await CartService.quantityInc(userId,id);
    res.status(200).json(result);
  }),
);
router.patch(
  "/quantityDec/:id",
  asyncHandler(async (req, res) => {
    const { userId } = req?.user
    const { id } = req?.params
    const result = await CartService.quantityDec(userId,id);
    res.status(200).json(result);
  }),
);
router.delete(
  "/delete/:productId",
  asyncHandler(async (req, res) => {
    const { userId } = req?.user
    const {productId} = req?.params
    const result = await CartService.delete(userId,productId);
    res.status(200).json(result);
  }),
);

export default router;
