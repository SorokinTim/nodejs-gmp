import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR, UNKNOWN_ERROR } from "../constants/errorConstants";
import { winstonLoggerMiddleware } from "./loggers";
import ApiError from "../errors/ApiError";

export const unhandledErrorsMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
        const message = err.message || INTERNAL_SERVER_ERROR;

        winstonLoggerMiddleware.error(message)
        res.status(err.statusCode || 500).send(message);

        return;
    }

    next();
}

export const unknownErrorLoggerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    winstonLoggerMiddleware.warn({
        message: err.message || UNKNOWN_ERROR,
        method: req.method,
        arguments: {
            body: req.body,
            params: req.params,
        },
    });

    next(ApiError.internalServerError());
}
