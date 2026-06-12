
import User from "../models/UserModel.js"
import Deposit from "../models/DepositModel.js"
import Setting from "../models/SettingModel.js";
import Product from "../models/ProductModel.js";
import Ticket from "../models/TicketModel.js";
const AdminService = {
  async getUsers() {
      const users = await User.find();
      return {
        status: true,
        users
      };
  },
  async getDeposits() {
      const deposits = await Deposit.find({status : "pending" , type : "deposit"}).populate("userId");
      return {
        status: true,
        deposits
      };
  },
  async getTickets() {
      const tickets = await Ticket.find({status : "open"}).populate("chats");
      return {
        status: true,
        tickets
      };
  },
  async getPaymentDetails() {
       const settings = await Setting.findOne();
      return {
        status: true,
        paymentDetails : settings?.paymentMethods.crypto.addresses
      };
  },
  async updateBalance(balance,id) {
       const user = await User.findOne({_id : id});
       user.balance += Number(balance);
       user.save();
      return {
        status: true,
        message : "Balance adjusted successfully"
      };
  },
  async updateRole(role,id) {
       const user = await User.findOne({_id : id});
       user.role = role
       user.save();
      return {
        status: true,
        message : "Role Switched successfully"
      };
  },
  async updatePaymentMethod(paymentsConfig) {
       const payments = await Setting.findOne();
       payments.paymentMethods.crypto.addresses = paymentsConfig
       payments.save();
      return {
        status: true,
        message : "Payment updated successfully"
      };
  },
  async updateDeposit(id,action) {
       const deposit = await Deposit.findOne({_id : id});
       deposit.status = action
       deposit.save();
      return {
        status: true,
        message : `Deposit ${action} successfully`
      };
  },
  async addProduct(card) {
       const product = await Product.create(card);
      return {
        status: true,
        message : `Product ${card.id} Added successfully`,
        product
      };
  },
  async deleteProduct(id) {
       const product = await Product.findByIdAndDelete(id);
      return {
        status: true,
        message : `Product deleted successfully`,
      };
  },
};

export default AdminService;