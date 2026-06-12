import { Router } from "express";
import authRouter from "./auth.js"
import cartRouter from "./cart.js"
import productRouter from "./products.js"
import walletRouter from "./wallet.js"
import orderRouter from "./order.js"
import ticketRouter from "./ticket.js"
import adminRouter from "./admin.js"
import fileRouter from "./file.js"
const router = Router()


router.use("/admin",adminRouter)

router.use("/auth",authRouter)
router.use("/cart",cartRouter)
router.use("/product",productRouter)
router.use("/wallet",walletRouter)
router.use("/order",orderRouter)
router.use("/ticket",ticketRouter)
router.use("/file",fileRouter)
export default router