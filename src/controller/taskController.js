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

const taskByUser = async (req,res)=>{
    try {
        const id = req.headers.id;
        const filter = {
            userId :id,
        };
        const tasks = await todoModel.find(filter).sort({createdAt:-1});
        if(tasks.length===0){
            return errorResponse(res, 404,'No tasks found',null);
        }
        return successResponse(res, 200, "Tasks retrieved successfully", tasks);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error);
    }
}

module.exports = { createTask,taskByUser };
