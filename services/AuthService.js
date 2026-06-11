import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = "543341573542-o2j3ekg3enaq6l04n6eutgf5s43s7nld.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);


const AuthService = {
  async register(userData) {
    const existingUser = await User.findOne({
      email: userData.email,
    });

    if (existingUser) {
      return {
        status: false,
        error: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      fullname: userData.fullname,
      email: userData.email,
      password: hashedPassword,
    });

    return {
      status: true,
      message: "User created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    };
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        status: false,
        error: "Invalid credentials",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        status: false,
        error: "Invalid credentials",
      };
    }
    let token = ""
    if(!user?.twoFactorEnabled){
      token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        env.jwtSecret,
        {
          expiresIn: "7d",
        },
      );
    }
    const userObj = user.toObject();
    delete userObj.password;
    return {
      status: true,
      token : token,
      user: userObj,
      message: "Login successful",
    };
  },
  async Glogin(token) {

      const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID, // Rejects token if issued to a different app
    });

    // Extract the verified user details safely
    const payload = ticket.getPayload();
    
    // Google's unique, persistent string identifier for this user
    const googleId = payload['sub']; 
    const { email,name } = payload;

    const Curruser = await User.findOne({ email });
    let user = Curruser
    if (!Curruser) {
     user = User.create({
      fullname: name,
      email,
      password: googleId,
    });
    }
    console.log(user)
    const  authtoken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        env.jwtSecret,
        {
          expiresIn: "7d",
        },
      );
    const userObj = user.toObject();
    delete userObj.password;
    return {
      status: true,
      token : authtoken,
      user: userObj,
      message: "Login successful",
    };
  },
  async me(userId) {
    const user = await User.findById(userId).select("-password");
    return {
      status: true,
      user,
    };
  },
};

export default AuthService;
