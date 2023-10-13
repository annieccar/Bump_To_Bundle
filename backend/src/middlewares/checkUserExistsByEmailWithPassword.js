import model from "../models/index.js";

export const checkUserExistsByEmailWithPassword = async (req, res, next) => {
  try {
    const [userByEmail] = await model.user.findOneByEmail(req.body.email);
    if (userByEmail.length) {
      const [user] = userByEmail;
      req.user = user;
      next();
    } else {
      res.status(401).send("wrong credentials");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
