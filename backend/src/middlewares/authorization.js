import jwt from "jsonwebtoken";

import { decodeJWT, catchError } from "../helpers/jwtHelper.js";
const { verify } = jwt;

const { TOKEN_SECRET } = process.env;

export const authorization = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided.",
    });
  } else {
    verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }

      const data = decodeJWT(token);

      return next();
    });
  }
};
