import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError";

export const authorizationMiddleware: RequestHandler = (req, res, next) => {
    try {
        const { headers } = req;
        const { authorization } = headers;

        if (!authorization) {
            next(ApiError.unauthorizedError());
            return;
        }

        if (!process.env.JWT_SECRET_KEY) {
            next(ApiError.internalServerError());
            return;
        }

        jwt.verify(authorization, process.env.JWT_SECRET_KEY, { maxAge: process.env.JWT_MAX_AGE || '1d' });

        next();
    } catch (error) {
        next(ApiError.forbiddenError());
    }
};
