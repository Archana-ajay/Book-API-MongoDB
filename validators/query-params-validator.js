const Joi = require('joi');

const querySchema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(5),
    page: Joi.number().integer().min(1).default(1),
});

module.exports = querySchema;
