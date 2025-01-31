const { errorResponse, successResponse } = require("../helper/response");
const userModel = require("../model/userModel");

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




module.exports = { registration };