import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR, UNKNOWN_ERROR } from "../constants/errorConstants";
import { winstonLoggerMiddleware } from "./loggers";

export const unhandledErrorsMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
        winstonLoggerMiddleware.error({
            message: err.message || UNKNOWN_ERROR,
            method: req.method,
            arguments: {
                body: req.body,
                params: req.params,
            },
        });
        res.status(err.statusCode || 500).send(err.message || INTERNAL_SERVER_ERROR);

        return;
    }

    next();
}
