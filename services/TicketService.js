import Cart from "../models/CartModel.js";
import Chat from "../models/ChatModel.js";
import Ticket from "../models/TicketModel.js";
import User from "../models/UserModel.js";

const TicketService = {
  async list(userId) {
    const tickets = await Ticket.find({ userId }).populate(["userId","chats"]);
    if (!tickets) {
      return [];
    }
    return { status: true, tickets };
  },
  async add(ticketData,userId) {
      const ticket = await Ticket.create({
      ...ticketData,
      userId
    });
    return { status: true,message : "Ticket Created successful",ticket};
  },
  async addMessage(message,userId,sender,ticketId) {
      const msg = await Chat.create({
      userId,
      sender,
      message
    });
    const ticket = await Ticket.findOne({_id : ticketId});
    ticket.chats.push(msg._id);
    ticket.save();
    return { status: true,messageObj : msg};
  },
  async updateStatus(id,status) {
      const ticket = await Ticket.findOne({_id : id});
    ticket.status = status;
    ticket.save();
    return { status: true,message : `Ticket Successfuly ${status}`};
  },

};

export default TicketService;
