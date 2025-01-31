const { successResponse, errorResponse } = require("../helper/response");
const todoModel = require("../model/todoModel");
const userModel = require("../model/userModel");

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

const allTask = async (req, res) => {
    try {
        let task = await todoModel.find().populate("userId","name").sort({ createdAt: -1 });
        if (task.length === 0) {
            return errorResponse(res, 404, 'No tasks found', null);
        }
        return successResponse(res, 200, "Tasks retrieved successfully", task);
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const taskByUser = async (req, res) => {
    try {
        const id = req.headers.id;
        const filter = {
            userId: id,
        };
        const tasks = await todoModel.find(filter).sort({ createdAt: -1 });
        if (tasks.length === 0) {
            return errorResponse(res, 404, 'No tasks found', null);
        }
        return successResponse(res, 200, "Tasks retrieved successfully", tasks);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = req.headers.id;
        const taskId = req.params.id;
        const filter = {
            _id: taskId,
            userId: id,
        };
        const task = await todoModel.findOne(filter);
        if (!task) {
            return errorResponse(res, 404, "Task not found", null);
        }
        return successResponse(res, 200, "Task retrieved successfully", task);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const updateTask = async (req, res) => {
    try {
        const id = req.headers.id;
        const taskId = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const updateData = {
            title,
            description,
        }
        const filter = {
            _id: taskId,
            userId: id,
        };
        const updatedTask = await todoModel.findOneAndUpdate(filter, updateData, { new: true });
        if (!updatedTask) {
            return errorResponse(res, 404, "Task not found", null);
        }
        return successResponse(res, 200, "Task updated successfully", updatedTask);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const taskStatusUpdate = async (req, res) => {
    try {
        const taskId = req.params.id;
        const id = req.headers.id;
        const filter = {
            _id: taskId,
            userId: id,
        };
        const updateData = {
            status: req.body.status,
        };
        const updatedTask = await todoModel.findOneAndUpdate(filter, updateData, { new: true });
        if (!updatedTask) {
            return errorResponse(res, 404, "Task not found", null);
        }
        return successResponse(res, 200, "Task status updated successfully", updatedTask);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.headers.id;
        const taskId = req.params.id;
        const filter = {
            _id: taskId,
            userId: id,
        };
        const deletedTask = await todoModel.findByIdAndDelete(filter);
        if (!deletedTask) {
            return errorResponse(res, 404, "Task not found", null);
        }
        return successResponse(res, 200, "Task deleted successfully", deletedTask);
    } catch (error) {

    }
};



module.exports = { createTask, taskByUser, updateTask, deleteTask, getTaskById, taskStatusUpdate, allTask };
