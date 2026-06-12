import Deposit from "../models/DepositModel.js";
import Setting from "../models/SettingModel.js";

const WalletService = {
  async add(userId, amount,type,fileId) {
    const deposit = await Deposit.create({
      userId,
      amount,
      type,
      fileId,
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
  async getConfig(){
      const wallet = await Setting.findOne();
    return {status : true,wallet : wallet?.paymentMethods?.crypto?.addresses}
    },
};

export default WalletService;
