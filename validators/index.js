const login = require('./login-validator');
const register = require('./register-validator');
const book = require('./book-validator');
const query = require('./query-params-validator');

module.exports = {
    login,
    register,
    book,
    query,
};
