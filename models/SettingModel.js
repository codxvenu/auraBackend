import mongoose from "mongoose";

const paymentAddressSchema = new mongoose.Schema({
  network: {
    type: String,
    required: true, // TRC20, BEP20, ERC20
  },

  address: {
    type: String,
    required: true,
  },

  enabled: {
    type: Boolean,
    default: true,
  },
});

const settingsSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    maintenanceMessage: {
      type: String,
      default: "",
    },

    paymentMethods: {
      crypto: {
        enabled: {
          type: Boolean,
          default: true,
        },

        addresses: [paymentAddressSchema],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingsSchema);