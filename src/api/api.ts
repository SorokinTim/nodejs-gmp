import { Router } from "express";
import users from './users/api'

const api = Router();

api.use('/', users);

export default api;
