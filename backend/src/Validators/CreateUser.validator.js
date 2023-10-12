import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  password: Joi.string().min(8).alphanum().required(),
});

const userLogInSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).alphanum().required(),
});

export const validateUser = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

export const validateUserLogIn = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userLogInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};
