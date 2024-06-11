import express from "express";
import { InsideOptionController } from "../controller/insideOptionController.js";
import { getInsideOptionController } from "../controller/insideOptionController.js";
import { getSpecificInsideOptionController } from "../controller/insideOptionController.js";
import { updateInsideOptionController } from "../controller/insideOptionController.js";
import { deleteInsideOptionController } from "../controller/insideOptionController.js";

const router = express.Router();

router.post("/create-insideoption", InsideOptionController);
router.get("/get-insideoption", getInsideOptionController);
router.get("/get-insideoption/:id", getSpecificInsideOptionController);
router.put("/put-insideoption/:id", updateInsideOptionController);
router.delete("/delete-insideoption/:id/:listid", deleteInsideOptionController);

export default router;
