import { Router } from "express";
import AuthService from "../services/AuthService.js";
import { authMiddleware } from "../middleware/auth.js";
import asyncHandler from "express-async-handler";
import { validator } from "../middleware/validators.js";
import {
  LoginSchema,
  RegisterSchema,
  MeSchema,
} from "../validator/Auth.schema.js";
import { generate2FA, verify2FA ,deactivate2FA,login} from "../utils/createSecret.js";

const router = Router();
// router.use(authMiddleware);
router.post(
  "/login",
  validator(LoginSchema),
  asyncHandler(async (req, res) => {
    const { user } = req?.validated.body;
    const result = await AuthService.login(user);
    if (!result.status) {
      return res.status(401).json(result);
    }
    if(!result?.user?.twoFactorEnabled){
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: false, // true in production HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } 
    res.status(200).json(result);
  }),
);
router.post(
  "/register",
  validator(RegisterSchema),
  asyncHandler(async (req, res) => {
    const { user } = req?.validated.body;
    const result = await AuthService.register(user);
    
    res.status(200).json(result);
  }),
);
router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId  = req?.user?.userId;
    const result = await AuthService.me(userId);
    res.status(200).json(result);
  }),
);
router.post(
  "/2fa/login",
  asyncHandler(async (req, res) => {
    const { token,userId } = req?.body;
    const result = await login(token,null,userId);
     res.cookie("token", result.token, {
        httpOnly: true,
        secure: false, // true in production HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    res.status(200).json(result);
  }),
);
router.get(
  "/2fa/generate",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const result = await generate2FA();
    res.status(200).json(result);
  }),
);
router.post(
  "/2fa/verify",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { token,secret } = req?.body;
    const userId  = req?.user?.userId;
    const result = await verify2FA(token,secret,userId);
    res.status(200).json(result);
  }),
);
router.post(
  "/2fa/deactivate",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { token } = req?.body;
    const userId  = req?.user?.userId;
    const result = await deactivate2FA(token,userId);
    res.status(200).json(result);
  }),
);
router.get(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  secure: "lax",
  sameSite: "strict",
});
    res.status(200).json({status : true, message : "Logout success"});
  }),
);
export default router;
