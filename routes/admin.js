import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import CartService from "../services/CartService.js";
import { CartAddItemSchema } from "../validator/Cart.schema.js";
import AdminService from "../services/AdminService.js";

const router = Router();
router.use(authMiddleware);
router.get(
  "/list/users",
  asyncHandler(async (req, res) => {
    const result = await AdminService.getUsers();
    res.status(200).json(result);
  }),
);
router.get(
  "/list/payments",
  asyncHandler(async (req, res) => {
    const result = await AdminService.getPaymentDetails();
    res.status(200).json(result);
  }),
);
router.get(
  "/list/deposits",
  asyncHandler(async (req, res) => {
    const result = await AdminService.getDeposits();
    res.status(200).json(result);
  }),
);
router.post(
  "/updateBalance",
  asyncHandler(async (req, res) => {
    const { balance,id } = req?.body
    const result = await AdminService.updateBalance(balance,id);
    res.status(200).json(result);
  }),
);
router.post(
  "/updateRole",
  asyncHandler(async (req, res) => {
    const { role,id } = req?.body
    const result = await AdminService.updateRole(role,id);
    res.status(200).json(result);
  }),
);
router.post(
  "/updatePaymentMethod",
  asyncHandler(async (req, res) => {
    const { paymentsConfig } = req?.body
    const result = await AdminService.updatePaymentMethod(paymentsConfig);
    res.status(200).json(result);
  }),
);
router.post(
  "/updateDeposit",
  asyncHandler(async (req, res) => {
    const { id,action } = req?.body
    const result = await AdminService.updateDeposit(id,action);
    res.status(200).json(result);
  }),
);
router.post(
  "/addProduct",
  asyncHandler(async (req, res) => {
    const { cardData } = req?.body
    const result = await AdminService.addProduct(cardData);
    res.status(200).json(result);
  }),
);
router.post(
  "/updateDeposit",
  asyncHandler(async (req, res) => {
    const { id,action } = req?.body
    const result = await AdminService.updateDeposit(id,action);
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
