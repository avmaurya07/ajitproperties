import mongoose from "mongoose";

const homeTestimonialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Hear from Happy Homeowners",
    },
    subtitle: {
      type: String,
      default: "CUSTOMER TESTIMONIALS",
    },
    description: {
      type: String,
      default:
        "Discover what our satisfied homeowners have to say about their journey. Real stories, real experiences, and real trust—built one home at a time.",
    },
    clientInfo: {
      image: {
        type: String,
        default: "/assets/img/home-1/testimonial/client-info.png",
      },
      text: {
        type: String,
        default: "More then <span>25K</span> clients Reviews",
      },
    },
    testimonials: [
      {
        text: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          default: 5,
          min: 1,
          max: 5,
        },
        clientName: {
          type: String,
          required: true,
        },
        clientPosition: {
          type: String,
          required: true,
        },
        clientImage: {
          type: String,
          default: "/assets/img/home-1/testimonial/client-info-right-img.png",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const HomeTestimonial =
  mongoose.models.HomeTestimonial ||
  mongoose.model("HomeTestimonial", homeTestimonialSchema);

export default HomeTestimonial;
