import model from "../models/index.js";

export const checkUserDoesntExists = async (req, res, next) => {
  const [userByEmail] = await model.user.findOneByEmail(req.body.email);

  if (userByEmail.length) {
    return res
      .status(400)
      .json({ message: "A user with this email adress already exists" });
  }

  return next();
};
