import express from "express";

import {
  getAll,
  addOne,
  editOne,
  deleteOne,
  getOne,
  offerOne,
  getAllUserHasGift,
  editUserHasGiftQty,
  editItemQty,
  deleteOneUserHasGift,
  getAllUserHasGiftByGiftId,
} from "../controllers/item.controller.js";
import { uploadItemPhoto } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);
router.get("/mygifts/:userId", getAllUserHasGift);
router.get("/offered/:giftId", getAllUserHasGiftByGiftId);
router.post("/", uploadItemPhoto, addOne);
router.put("/:id", uploadItemPhoto, editOne);
router.put("/editoffered/:id", editUserHasGiftQty);
router.put("/editqty/:id", editItemQty);
router.delete("/:id", deleteOne);
router.delete("/offered/:id", deleteOneUserHasGift);
router.post("/offer", offerOne);

export default router;
