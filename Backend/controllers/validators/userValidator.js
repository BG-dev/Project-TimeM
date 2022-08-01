const Joi = require("joi");

const validateNewUser = (userData) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(30).required().label("Password"),
  });
  return schema.validate(userData);
};

const validateUser = (userData) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().min(8).max(30).required().label("Password"),
  });
  return schema.validate(userData);
};

module.exports = {
  validateUser,
  validateNewUser,
};
