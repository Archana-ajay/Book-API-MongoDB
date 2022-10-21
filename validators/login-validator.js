const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(6).required(),
});

module.exports = loginSchema;
