import mongoose from "mongoose";

const homeContactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Send Us Message",
    },
    subtitle: {
      type: String,
      default: "BOOK APPOINTMENT",
    },
    mapEmbed: {
      type: String,
      default:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5733634314897!2d100.90275000000001!3d12.8708096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102941744fdc3d1%3A0xeb2643eac204ed35!2sTiger%20Park%20Pattaya!5e0!3m2!1sen!2sin!4v1767354493548!5m2!1sen!2sin",
    },
    formCategories: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const HomeContact =
  mongoose.models.HomeContact ||
  mongoose.model("HomeContact", homeContactSchema);

export default HomeContact;
