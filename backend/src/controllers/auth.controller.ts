import type { Request, Response } from "express"
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        if (!code) {
            return res.status(400).json({ message: "Authorization code is missing" });
        }
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);


        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name, email, image: picture
            })
        }

        const { _id } = user;

         
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET as string,
            {
                expiresIn: "1d"
            }
        );
    //    console.log("user:",user);
        return res.status(200).json({
            message: "Success",
            token, user
        })

    } catch (err: any) {
        console.error("error:", err);
        res.status(500).json({ msg: "internal server error" });
    }
}