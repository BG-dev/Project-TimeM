const Joi = require("joi");

const validateBoard = (boardData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(16384).required().label("Name"),
    description: Joi.string().min(3).max(16384).required().label("Description"),
    color: Joi.string()
      .valid(...colors)
      .label("Color"),
    creator: Joi.string().min(3).max(16384).required().label("Creator"),
  });
  return schema.validate(boardData);
};

module.exports = {
  validateBoard,
};
