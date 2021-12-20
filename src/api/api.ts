import { Router } from "express";
import users from "./users/api"
import groups from "./groups/api";
import authorization from "./authorization/api";

const api = Router();

api.use('/', [users, groups, authorization]);

export default api;
