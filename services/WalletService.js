import Deposit from "../models/DepositModel.js";

const WalletService = {
  async add(userId, amount,type) {
    const deposit = await Deposit.create({
      userId,
      amount,
      type,
      status: "pending",
    });

    return {
      status: true,
      deposit,
    };
  },
  async getWallet(userId){
      const trnx = await Deposit.find({ userId })
    .sort({ createdAt: -1 });
       if (!trnx) {
      return [];
    }
    return {status : true,trnx}
    },
};

export default WalletService;
