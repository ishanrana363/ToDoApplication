const { successResponse, errorResponse } = require("../helper/response");
const todoModel = require("../model/todoModel");

const createTask = async (req, res) => {
    try {
        const { id } = req.headers;
        const { title, description } = req.body;

        

        const newTask = new todoModel({ userId: id, title, description });
        const savedTask = await newTask.save();

        return successResponse(res, 201, "Task created successfully", savedTask);
    } catch (error) {
        return errorResponse(res, 500, error.message || "Something went wrong", error);
    }
};

module.exports = { createTask };
