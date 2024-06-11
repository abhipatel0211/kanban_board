import express from "express";

import { reorderController } from "../controller/reorderController.js";
const router = express.Router();

router.put("/reorder", reorderController);

export default router;
