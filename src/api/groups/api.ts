import { Router } from "express";
import groups from "../groups/groups";

const api = Router();

api.use('/groups', groups);

export default api;
