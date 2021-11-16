import { Router } from "express";
import users from "./users/api"
import groups from "./groups/api";

const api = Router();

api.use('/', users);
api.use('/', groups);

export default api;
