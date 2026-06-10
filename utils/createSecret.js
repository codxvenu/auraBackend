import speakeasy from "speakeasy";
import QRCode from "qrcode";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import { env } from "../config/env.js";
export const login = async (token, secret,userId) => {
   const user = await User.findById(userId);
  const seckey = secret ?? user.twoFactorSecret
  const verified = speakeasy.totp.verify({
    secret : seckey,
    encoding: "base32",
    token,
  });

  if(!verified) throw new Error("Wrong Code");
  const jwttoken = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          env.jwtSecret,
          {
            expiresIn: "7d",
          },
        );
 return {
    success : true,
    token : jwttoken,
    user,
    message : "TwoFactor Authentication Verified"
  };
};

export const generate2FA = async () => {
  const secret = speakeasy.generateSecret({
    name: "aura",
  });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  return{
    success : true,
    secret: secret.base32,
    qrCode,
  };
};
export const verify2FA = async (token, secret,userId) => {
  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });

  if(!verified) throw new Error("Wrong Code");

 const user = await User.findById(userId);
  user.twoFactorEnabled = true;
  user.twoFactorSecret = secret;

  user.save();
 return {
    success : true,
  };
};
export const deactivate2FA = async (token,userId) => {
  const user = await User.findById(userId);
  console.log(user?.twoFactorSecret);
  const verified = speakeasy.totp.verify({
    secret : user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if(!verified) throw new Error("Wrong Code");
  
  user.twoFactorEnabled = false;
  user.twoFactorSecret = null;

  user.save();
 return {
    success : true,
    message : "2fa Deactivated"
  };
};