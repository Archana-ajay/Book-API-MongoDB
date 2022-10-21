const Joi = require('joi');

const bookSchema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    imageUrl: Joi.string(),
    author: Joi.string().min(3).max(25),
    pages: Joi.number().min(50),
    price: Joi.number().min(100),
});

module.exports = bookSchema;
