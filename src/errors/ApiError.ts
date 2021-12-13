import {
    DATA_IS_NOT_ANY_MATCH,
    ENTERED_DATA_IS_INCORRECT,
    ERROR_DATA_NOT_FOUND,
    FORBIDDEN_ERROR,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED_ERROR,
} from "../constants/errorConstants";

export default class ApiError extends Error {
    constructor(
        public message = INTERNAL_SERVER_ERROR,
        public statusCode: number = 500,
    ) {
        super(message);
    }

    static nonExistentData(fieldName: string, paramName: string) {
        return new ApiError(`${fieldName} with given ${paramName} doesn't exist into database`, 404);
    }

    static dataIsNotAnyMatch () {
        return new ApiError(DATA_IS_NOT_ANY_MATCH, 404);
    }

    static dataNotFound() {
        return new ApiError(ERROR_DATA_NOT_FOUND, 404);
    }

    static internalServerError() {
        return new ApiError(INTERNAL_SERVER_ERROR, 500);
    }

    static wrongAuthorizationCredentials() {
        return new ApiError(ENTERED_DATA_IS_INCORRECT, 401);
    }

    static unauthorizedError() {
        return new ApiError(UNAUTHORIZED_ERROR, 401);
    }

    static forbiddenError() {
        return new ApiError(FORBIDDEN_ERROR, 403);
    }
}
