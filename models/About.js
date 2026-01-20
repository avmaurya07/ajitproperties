import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.About || mongoose.model("About", aboutSchema);
