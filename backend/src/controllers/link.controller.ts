import mongoose from "mongoose";
import type { Request, Response } from "express";
import linkModel from "../models/link.model.js";
import shareLinkModel from "../models/shareLink.models.js";
import crypto from "crypto";
import userModel from "../models/user.model.js";

export const createCard = async (req: Request, res: Response) => {
    try {
        const details = req.body;
        const updateDetails = {
            ...details,
            userId: req.user?._id,
        };
        await linkModel.create(updateDetails);
        // console.log("backend details:",updateDetails)
        res.status(200).json({ msg: "link create successfully", updateDetails });

    } catch (err: any) {
        console.log("error:", err);
        res.status(500).json({ msg: "server crashed" });
    }
}


const allowedTags = [
    "YouTube",
    "LinkedIn",
    "Facebook",
    "GitHub",
    "Twitter",
    "Other",
] as const;

type TagType = (typeof allowedTags)[number];

export const tagLinks = async (req: Request, res: Response) => {
    try {
        const tag = req.params.tag as TagType;

        if (!allowedTags.includes(tag)) {
            return res.status(400).json({
                msg: "Invalid tag",
            });
        }

        if (!req.user?._id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const links = await linkModel.find({
            tag,
            userId: new mongoose.Types.ObjectId(req.user._id),
        });

        res.status(200).json({
            msg: "Links fetched successfully",
            links,
        });
    } catch (err: any) {
        console.log("error:", err);
        res.status(500).json({ msg: "server crashed" });
    }
};


export const removeLink = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;

        await linkModel.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            message: "Link deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete link",
        });
    }
};

export const createShareLink = async (req: Request, res: Response) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        let share = await shareLinkModel.findOne({
            userId: req.user._id,
        });

        if (!share) {
            share = await shareLinkModel.create({
                userId: req.user._id,
                hash: crypto.randomBytes(16).toString("hex"),
            });
        }

        res.status(200).json({
            shareUrl: `http://localhost:5173/share/${share.hash}`,
        });

    } catch (error) {
        res.status(500).json({
            message: "Share link failed",
        });
    }
};

