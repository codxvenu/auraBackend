import Cart from "../models/CartModel.js";
import Orders from "../models/OrderModel.js";
import User from "../models/UserModel.js";

const OrderService = {
  async list(userId) {
    const Order = await Orders.find({ userId }).populate("products");
    if (!Order) {
      return [];
    }
    return { status: true, Order: Order };
  },
  async add(userId, productIds,finalprice) {
      const order = await Orders.create({
      userId,
      products: [...productIds],
      amount : finalprice
    });
    const user = await User.findOne({_id : userId})
    user.balance -= finalprice;
    user.save();
    await Cart.deleteOne({ userId });
    if (!order) {
      return [];
    }
    return { status: true,message : "Order successful",order };
  },

};

export default OrderService;
