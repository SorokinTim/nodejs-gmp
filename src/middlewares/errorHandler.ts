import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/errorConstants";
import { winstonLoggerMiddleware } from "./loggers";

export const unhandledErrorsMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
        const message = err.message || INTERNAL_SERVER_ERROR;

        winstonLoggerMiddleware.error(message)
        res.status(err.statusCode || 500).send(message);

        return;
    }

    next();
}
