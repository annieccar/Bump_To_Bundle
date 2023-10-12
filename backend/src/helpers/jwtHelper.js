import jwt from "jsonwebtoken";

const { TOKEN_SECRET } = process.env;
const { TokenExpiredError, sign } = jwt;

export const encodeJWT = (payload) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1h" });
};

export const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized: access token has expired." });
  }

  return res.status(401).send({ message: "Unauthorized." });
};

export const decodeJWT = (token) => {
  return jwt.decode(token, TOKEN_SECRET);
};
