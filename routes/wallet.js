import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import {WalletAddSchema} from "../validator/Wallet.schema.js"
import WalletService from "../services/WalletService.js"

const router = Router();
router.use(authMiddleware);
router.post(
  "/add",
  validator(WalletAddSchema),
  asyncHandler(async (req, res) => {
    const { amount ,type} = req?.validated.body;
    const userId = req?.validated.userId;
    const result = await WalletService.add(userId,amount,type);
    res.status(200).json(result);
  }),
);
router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const { userId } = req?.user
    const result = await WalletService.getWallet(userId);
    res.status(200).json(result);
  }),
);
router.get(
  "/list/config",
  asyncHandler(async (req, res) => {
    const result = await WalletService.getConfig();
    res.status(200).json(result);
  }),
);

export default router;
