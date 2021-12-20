import { Router } from "express";
import authorization from "./authorization";

const api = Router();

api.use('/authorization', authorization);

export default api;
