const Joi = require("joi");

const quoteSchema = Joi.object({
  text: Joi.string().required().max(256),
  authorId: Joi.number().required().min(1)
});

const authorSchema = Joi.object({
  name: Joi.string().required().min(1).max(30),
  quote: Joi.string().required().min(2).max(256)
});

module.exports = { quoteSchema, authorSchema };
