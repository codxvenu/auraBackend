import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     fullname: { type: String,required: true },
     balance: { type: Number,default : 0 },
     email: { type: String, unique: true, required: true },
     password: { type: String, required: true },
     role : { type : String, default : "user"},
     twoFactorEnabled : { type : Boolean, default : false},
     twoFactorSecret : { type : String, default : false},
});

const User = mongoose.model("User", userSchema);

export default User;