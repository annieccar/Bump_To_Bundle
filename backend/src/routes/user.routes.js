import express from "express";

import {
  getAll,
  addOne,
  editOne,
  deleteOne,
  getOne,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", addOne);
router.put("/:id", editOne);
router.delete("/:id", deleteOne);

export default router;
