import mongoose from "mongoose";

const shareLinkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
        unique: true,
    },
});

const shareLinkModel = mongoose.model("ShareLink", shareLinkSchema);

export default shareLinkModel;