import mongoose from "mongoose";

const homeProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "The Cityscape Collection",
    },
    subtitle: {
      type: String,
      required: true,
      default: "OUR PROJECT",
    },
    maxProperties: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  },
);

const HomeProject =
  mongoose.models.FeaturedProperties ||
  mongoose.model("FeaturedProperties", homeProjectSchema, "featuredproperties");

export default HomeProject;
