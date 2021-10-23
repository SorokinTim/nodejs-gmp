import { Router } from "express";
import users from './users/router'

const router = Router();

router.use('/', users);

export default router;
