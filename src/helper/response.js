const successResponse = (res, statusCode, msg, data) => {
    res.status(statusCode).json({
        status: "success",
        message: msg,
        data: data
    });
};



const errorResponse = (res, statusCode, msg, error = {}) => {
    res.status(statusCode).json({
        status: "fail",
        message: msg,
        error: error
    });
};


module.exports = { successResponse: successResponse, errorResponse: errorResponse }