import { DATA_IS_NOT_ANY_MATCH, ERROR_DATA_NOT_FOUND, INTERNAL_SERVER_ERROR } from "../constants/errorConstants";

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
}
