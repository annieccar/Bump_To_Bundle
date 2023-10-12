import express from "express";
import {
  validateUser,
  validateUserLogIn,
} from "../Validators/CreateUser.validator.js";
import { checkUserDoesntExists } from "../middlewares/checkUserDoesntExist.js";
import { checkUserExistsByEmailWithPassword } from "../middlewares/checkUserExistsByEmailWithPassword.js";
import { hashPassword, verifyPassword } from "../helpers/argon2Helper.js";

import { addOne, login, logout } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/signup",
  validateUser,
  checkUserDoesntExists,
  hashPassword,
  addOne
);

router.post(
  "/login",
  validateUserLogIn,
  checkUserExistsByEmailWithPassword,
  login
);

router.get("/logout", logout);

export default router;
