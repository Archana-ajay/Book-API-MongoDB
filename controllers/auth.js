const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

//signup
const signUp = async (req, res) => {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        message: 'signup successful',
    });
};

//login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
        //check email
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        //compare password
        throw new UnauthenticatedError('Invalid password');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { name: user.name },
        message: 'login successful',
        token,
    });
};

module.exports = {
    signUp,
    login,
};
