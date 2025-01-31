const { errorResponse, successResponse } = require("../helper/response");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.SECRET_KEY

const registration = async (req, res) => {
    try {
        let reqBody = req.body;
        const email = req.body.email;
        const user = await userModel.findOne({ email: email });
        if (user) return errorResponse(res, 400, "User email already exists", null);
        const data = await userModel.create(reqBody);
        return successResponse(res, 201, "User created successfully", data);
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await userModel.findOne({ email: email, password: password });
        if (!user) return errorResponse(res, 404, "Invalid email or password", null);
        const token = jwt.sign({ id: user._id, email: user.email }, key, { expiresIn: "7days" });
        return successResponse(res, 200, "User logged in successfully", { token: token });
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error);
    }
};


const userProfile = async (req, res) => {
    try {
        let email = req.headers.email;
        cosnt 
    } catch (error) {
        
    }
};


module.exports = { registration, login };