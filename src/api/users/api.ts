import { Router } from "express";
import users from "./users";
import { authorizationMiddleware } from "../../middlewares/authorization";

const api = Router();

api.use('/users', [authorizationMiddleware, users]);

export default api;
