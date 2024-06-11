import express from "express";
import { OptionController } from "../controller/optionController.js";
import { getOptionController } from "../controller/optionController.js";
import { getSpecificOptionController } from "../controller/optionController.js";
import { updateOptionController } from "../controller/optionController.js";
import { deleteOptionController } from "../controller/optionController.js";

const router = express.Router();

router.post("/option", OptionController);
router.get("/option", getOptionController);
router.get("/option/:id", getSpecificOptionController);
router.put("/option/:id", updateOptionController);
router.delete("/option/:id", deleteOptionController);

export default router;
