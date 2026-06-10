import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import ProductService from "../services/ProductService.js"

const router = Router();
router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const result = await ProductService.getItems();
    res.status(200).json(result);
  }),
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const {id} = req?.params;
    const result = await ProductService.getItem(id);
    res.status(200).json(result);
  }),
);

export default router;
