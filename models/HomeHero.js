import mongoose from "mongoose";

const homeHeroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Find Your Dream Property With Us",
    },
    subtitle: {
      type: String,
      default: "SEARCH SMART. LIVE SMART",
    },
    description: {
      type: String,
      default:
        "Discover the perfect home that fits your lifestyle and budget. Browse our exclusive listings and find your ideal property today.",
    },
    backgroundImage: {
      type: [String],
      default: ["/assets/img/home/banner.jpeg"],
    },
    searchCategories: [
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
    searchLocations: [
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
    buttonLinks: [
      {
        text: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        icon: {
          type: String,
          default: "flaticon-right-arrow",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", homeHeroSchema);

export default HomeHero;
