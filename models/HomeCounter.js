import mongoose from "mongoose";

const homeCounterSchema = new mongoose.Schema(
  {
    counters: [
      {
        number: {
          type: String,
          required: true,
        },
        suffix: {
          type: String,
          default: "",
        },
        text: {
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

const HomeCounter =
  mongoose.models.HomeCounter ||
  mongoose.model("HomeCounter", homeCounterSchema);

export default HomeCounter;
