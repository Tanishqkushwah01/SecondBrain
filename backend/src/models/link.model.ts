import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },

    tag: {
      type: String,
      required: true,
      enum: [
        "YouTube",
        "LinkedIn",
        "Facebook",
        "GitHub",
        "Twitter",
        "Other",
      ],
    },
    // thumbnail:{
    //   type: String,
    //   required: true
    // },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const linkModel = mongoose.model("Link", linkSchema);

export default linkModel;