import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import { JWT_MAX_AGE, JWT_SECRET_KEY } from "../data-acess/secret";

export const authorizationMiddleware: RequestHandler = (req, res, next) => {
    try {
        const { headers } = req;
        const { authorization } = headers;

        if (!authorization) {
            next(ApiError.unauthorizedError());
            return;
        }

        jwt.verify(authorization, JWT_SECRET_KEY, { maxAge: JWT_MAX_AGE });

        next();
    } catch (error) {
        next(ApiError.forbiddenError());
    }
};
