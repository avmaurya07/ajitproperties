import mongoose from "mongoose";

const houseOfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "What This House Offers",
    },
    subtitle: {
      type: String,
      default: "HOUSE HIGHLIGHTS",
    },
    offers: [
      {
        name: {
          type: String,
          required: true,
        },
        icon: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          default: 6,
        },
        countText: {
          type: String,
          default: "Properties",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const HouseOffer =
  mongoose.models.HouseOffer || mongoose.model("HouseOffer", houseOfferSchema);

export default HouseOffer;
