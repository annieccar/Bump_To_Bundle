import { verifyPassword } from "../helpers/argon2Helper.js";
import { encodeJWT } from "../helpers/jwtHelper.js";
import model from "../models/index.js";

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await model.user.findOne(id);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getAll = async (req, res) => {
  try {
    const [users] = await model.user.findAll();
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const addOne = async (req, res) => {
  const user = req.body;
  try {
    const [result] = await model.user.insert(user);
    if (result.affectedRows) {
      const userId = result.insertId;
      const userDetails = await model.user.findOne(userId);
      if (userDetails) {
        const details = userDetails[0][0];
        delete details.password;

        const token = encodeJWT(details);

        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: false,
        });

        res.status(201).json(details);
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  try {
    const isVerified = await verifyPassword(
      req.user.password,
      req.body.password
    );
    if (isVerified) {
      delete req.user.password;
      const token = encodeJWT(req.user);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
      });
      res.status(200).json(req.user);
    } else {
      res.status(401).send("wrong credentials");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const editOne = async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  try {
    const [result] = await model.user.update({ ...user, id });
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await model.user.delete(id);

    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};
