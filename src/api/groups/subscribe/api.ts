import { Router } from "express";
import subscribe from "./subscribe";

const api = Router();

api.use('/subscribe', subscribe);

export default api;
