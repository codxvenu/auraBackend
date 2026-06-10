import Cart from "../models/CartModel.js";

const CartService = {
  async addItem(productId, userId) {
    let cart = await Cart.findOne({ userId });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }],
      });

      return cart;
    }

    const existingItem = cart.items.find(
      (item) => item?.productId?.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
      });
    }

    await cart.save();
    await cart.populate("items.productId");
    return { status: true, cart: cart.items,message : "Item Added TO Cart" };
  },
  async delete(userId, productId) {
    await Cart.updateOne(
      { userId },
      {
        $pull: {
          items: {
            productId,
          },
        },
      },
    );
    return {
      status: true,
    };
  },
  async getCart(userId) {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return [];
    }
    return { status: true, cart: cart.items };
  },
  async quantityInc(userId, id) {
    const cart = await Cart.findOne({ userId });

    const item = cart.items.find((item) => item.productId.toString() === id);

    if (!item) throw Error("item not found");

    item.quantity += 1;

    await cart.save();
    return { status: true };
  },
  async quantityDec(userId, id) {
    const cart = await Cart.findOne({ userId });

    const idx = cart.items.findIndex((item) => item.productId.toString() === id);
    const item = cart.items[idx];
    if (!item) throw Error("item not found");
    if(item.quantity == 1) {
      cart.items.splice(idx, 1);
    }else{
      item.quantity -= 1;
    }
    await cart.save();
    return { status: true };
  },
};

export default CartService;
