import mongoose from "mongoose";

const homeAboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Where Finding a House Feels Like Home",
    },
    subtitle: {
      type: String,
      default: "WHO WE ARE",
    },
    description: {
      type: String,
      default:
        "At our core, we believe finding a home should feel comforting, not complicated. That's why we offer trusted listings, expert support, and a seamless experience tailored to your needs and dreams.",
    },
    features: [
      {
        text: {
          type: String,
          required: true,
        },
      },
    ],
    buttonText: {
      type: String,
      default: "ABOUT US MORE",
    },
    buttonUrl: {
      type: String,
      default: "/about",
    },
    image: {
      type: String,
      default: "/assets/img/home/about.jpeg",
    },
    image2: {
      type: String,
      default: "/assets/img/home-1/about/about-02.png",
    },
    counter: {
      number: {
        type: String,
        default: "697",
      },
      suffix: {
        type: String,
        default: "k+",
      },
      text: {
        type: String,
        default: "LISTED PROPERTIES",
      },
    },
    callInfo: {
      text: {
        type: String,
        default: "Call Us 24/7",
      },
      phone: {
        type: String,
        default: "+208-6666-0112",
      },
    },
  },
  {
    timestamps: true,
  },
);

const HomeAbout =
  mongoose.models.HomeAbout || mongoose.model("HomeAbout", homeAboutSchema);

export default HomeAbout;
