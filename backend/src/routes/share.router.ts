import { Router } from "express";
const router:Router = Router();

import * as shareController from "../controllers/share.controller.js";
 
router.get("/:hash", shareController.getSharedDashboard);


export default router;
