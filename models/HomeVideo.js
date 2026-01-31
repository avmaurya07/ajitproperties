import mongoose from "mongoose";

const homeVideoSchema = new mongoose.Schema(
  {
    videoUrl: {
      type: [String],
      default: ["/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4"],
    },
    title: {
      type: String,
      default: "Works Videos",
    },
    subtitle: {
      type: String,
      default: "Recently",
    },
  },
  {
    timestamps: true,
  },
);

const HomeVideo =
  mongoose.models.HomeVideo || mongoose.model("HomeVideo", homeVideoSchema);

export default HomeVideo;
