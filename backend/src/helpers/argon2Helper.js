import argon2 from "argon2";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    if (hashedPassword) {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const verifyPassword = (hashedPassword, password) => {
  return argon2.verify(hashedPassword, password);
};
