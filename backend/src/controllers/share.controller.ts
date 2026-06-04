
import mongoose from "mongoose";
import type { Request, Response } from "express";
import linkModel from "../models/link.model.js";
import shareLinkModel from "../models/shareLink.models.js";
import crypto from "crypto";
import userModel from "../models/user.model.js";

export const getSharedDashboard = async (req: Request, res: Response) => {
    try {
        const hash = req.params.hash;

        if (!hash || Array.isArray(hash)) {
            return res.status(400).json({
                message: "Invalid hash",
            });
        }

        const share = await shareLinkModel.findOne({ hash });

        if (!share) {
            return res.status(404).json({
                message: "Invalid share link",
            });
        }

        const user = await userModel
            .findById(share.userId)
            .select("name username email");

        const cards = await linkModel.find({
            userId: share.userId,
        });

        return res.status(200).json({
            adminName: user?.name || user?.name || "Admin",
            cards,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch shared dashboard",
        });
    }
};