class ApiError extends Error {
    statusCode = 500;

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}

class AuthenticationError extends ApiError {
    constructor(message) {
        super(401, message);
        this.name = "Authentication Error";
    }
}

class ForbiddenError extends ApiError {
    constructor(message) {
        super(403, message);
        this.name = "Forbidden Error";
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
    AuthenticationError,
    ForbiddenError,
    NotFoundError,
};
