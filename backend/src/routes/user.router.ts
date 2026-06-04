import { Router } from "express";
const router:Router = Router();

import * as linkController from "../controllers/link.controller.js";
import { googleLogin } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/user.middleware.js";

router.get("/google",googleLogin);
router.post("/link",authMiddleware,linkController.createCard);
router.get("/tag/:tag", authMiddleware, linkController.tagLinks);
router.delete("/link/:_id", authMiddleware, linkController.removeLink);
router.post("/share", authMiddleware,linkController.createShareLink);


export default router;
