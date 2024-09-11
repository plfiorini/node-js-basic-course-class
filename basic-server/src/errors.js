class ApiError extends Error {
    statusCode = 500;

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}

class NotFoundError extends ApiError {
    constructor(message) {
        super(404, message);
        this.name = "Not Found";
    }
}

module.exports = {
    ApiError,
    NotFoundError,
};
