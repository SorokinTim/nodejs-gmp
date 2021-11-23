import { Router } from "express";
import groups from "../groups/groups";
import subscribe from "./subscribe/api";

const api = Router();

api.use('/groups', [groups, subscribe]);

export default api;
