const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(6).required(),
});

module.exports = registerSchema;
