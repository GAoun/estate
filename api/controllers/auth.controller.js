import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({message: "User was created successfully."});
    } catch (error) {
        next(error);
    }

};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorHandler(404, 'User not found.'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, 'Wrong Credentials.'));

        const token = jwt.sign( { id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc; //remove password from response so we can pass it to user without pass attribute.
        res
        .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1) })
        .status(200)
        .json(rest); //maxAge=1 day

    } catch (error) {
        next(error);
    }
};
