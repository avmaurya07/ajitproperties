import mongoose from "mongoose";

const propertyFeatureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Your luxury. Your lifestyle.",
    },
    subtitle: {
      type: String,
      default: "REAL ESTATE",
    },
    description: {
      type: String,
      default:
        "At our core, we believe finding a home should feel comforting, not complicated. That's why we offer trusted listings, expert support,",
    },
    buttonText: {
      type: String,
      default: "View Properties",
    },
    buttonUrl: {
      type: String,
      default: "/properties",
    },
    image: {
      type: String,
      default: "/assets/img/home/propertie-feature-image.jpeg",
    },
    backgroundImage: {
      type: String,
      default: "/assets/img/home-1/propertie/propertie-feature-bg.jpg",
    },
  },
  {
    timestamps: true,
  },
);

const PropertyFeature =
  mongoose.models.PropertyFeature ||
  mongoose.model("PropertyFeature", propertyFeatureSchema);

export default PropertyFeature;
