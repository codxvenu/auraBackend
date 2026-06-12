import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import TicketService from "../services/TicketService.js";

const router = Router();
router.use(authMiddleware);
router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const userId = req?.user?.userId;
    const result = await TicketService.list(userId);
    res.status(200).json(result);
  }),
);
router.get(
  "/updateStatus/:status/:id",
  asyncHandler(async (req, res) => {
    const {id,status} = req.params
    const userId = req?.user?.userId;
    const result = await TicketService.updateStatus(id,status);
    res.status(200).json(result);
  }),
);
router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const userId = req?.user?.userId;
    const { ticketData} = req?.body;
    const result = await TicketService.add(ticketData,userId);
    res.status(200).json(result);
  }),
);
router.post(
  "/addMessage",
  asyncHandler(async (req, res) => {
    const userId = req?.user?.userId;
    const { message,sender,ticketId} = req?.body;
    const result = await TicketService.addMessage(message,userId,sender,ticketId);
    res.status(200).json(result);
  }),
);
export default router;
