import { Router } from "express";
import groups from "../groups/groups";
import subscribe from "./subscribe/api";
import { authorizationMiddleware } from "../../middlewares/authorization";

const api = Router();

api.use('/groups', [authorizationMiddleware, groups, subscribe]);

export default api;
