class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // 운영 가능한 에러 표시
        Error.captureStackTrace(this, this.constructor);
    }
}

  // 에러 목록 정의
const ERRORS = {
    VALIDATION_ERROR: new AppError("Validation failed", 400),
    NOT_FOUND: new AppError("Resource not found", 404),
    UNAUTHORIZED: new AppError("Unauthorized access", 401),
    FORBIDDEN: new AppError("Forbidden access", 403),
    INTERNAL_SERVER_ERROR: new AppError("Something went wrong", 500),
};

module.exports = { AppError, ERRORS };
